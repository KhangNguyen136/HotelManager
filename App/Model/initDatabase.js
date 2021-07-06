import { openDatabase } from 'expo-sqlite';
const db = openDatabase('userDatabase.db');
import * as Files from 'expo-file-system'
import { documentDirectory } from 'expo-file-system';

export default async function (uid, success) {
    db.transaction(tx => {
        // tx.executeSql('drop table if exists roomTable')
        // tx.executeSql('drop table if exists formTable')
        // tx.executeSql('drop table if exists guestTable')
        // tx.executeSql('drop table if exists billTable')

        // create roomType table
        tx.executeSql(
            'create table if not exists roomTypeTable(typeID integer primary key, type text, price real, imgURL text)'
        )
        // create rule table
        tx.executeSql(
            'create table if not exists ruleTable(ruleID integer primary key, ruleName text, value real)'
        )
        //create tables
        tx.executeSql(
            'create table if not exists roomTable(roomID integer primary key autoincrement, roomName text unique, typeID integer,note text, stateRoom text, addDate text, foreign key (typeID) references roomTypeTable(ID) );'
        )
        tx.executeSql(
            'create table if not exists formTable(formID integer primary key autoincrement, roomID integer not null, date text, note text, isPaid real,foreign key (roomID) references roomTable(ID)); '
        )
        tx.executeSql(
            'create table if not exists guestTable(guestID integer primary key autoincrement, formID integer not null, name text, type text, IC text, address text, foreign key(formID) references formTable(ID))'
        )
        tx.executeSql(
            'create table if not exists billTable(ID integer primary key autoincrement, formID integer not null, paidTime text,nday integer,surchargeThird real,surchargeForeign real, totalAmount real, note text, foreign key(formID) references formTable(ID))'
        )
        tx.executeSql(
            'create table if not exists userInforTable(ID integer primary key autoincrement,userID text, lastSync text)'
        )

    }, (error) => {
        console.log(error.message);
    }, () => {
        initData(uid, success)
    })
}

export function initData(uid, success) {
    db.transaction(
        tx => {
            //check roomType
            tx.executeSql(
                'select * from roomTypeTable', [],
                (tx, result) => {
                    if (result.rows.length == 0) {
                        //add init data for roomType table
                        tx.executeSql(
                            'insert into roomTypeTable(typeID,type,price) values (?,?,?)', [1, 'A', 150000]
                        )
                        tx.executeSql(
                            'insert into roomTypeTable(typeID,type,price) values (?,?,?)', [2, 'B', 170000]
                        )
                        tx.executeSql(
                            'insert into roomTypeTable(typeID,type,price) values (?,?,?)', [3, 'C', 200000]
                        )
                    }
                }
            )
            tx.executeSql(
                'select * from ruleTable', [],
                (tx, result) => {
                    if (result.rows.length == 0) {
                        //add init data for rule table
                        tx.executeSql(
                            'insert into ruleTable(ruleID,ruleName,value) values (?,?,?)', [1, 'surcharge', 1.25]
                        )
                        tx.executeSql(
                            'insert into ruleTable(ruleID,ruleName,value) values (?,?,?)', [2, 'foreign', 1.5]
                        )
                    }
                }
            )
            tx.executeSql(
                'select * from userInforTable', [],
                (tx, result) => {
                    if (result.rows.length == 0) {
                        tx.executeSql(
                            'insert into userInforTable(userID,lastSync) values (?,?)', [uid, 'not sync yet']
                        )
                    }
                }
            )
        }, (error) => {
            console.log("Init data failed: " + error.message);
        },
        () => {
            console.log('Init database successful')
            Files.getInfoAsync(`${documentDirectory}SQLite/userDatabase.db`).then(result => console.log(result.uri))
            success()
        }
    )
}