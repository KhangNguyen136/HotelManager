import { openDatabase } from 'expo-sqlite';
const db = openDatabase('userDatabase.db');
import * as Files from 'expo-file-system'
import { documentDirectory } from 'expo-file-system';

export default function () {
    db.transaction(tx => {
        // tx.executeSql('drop table if exists roomTable')
        // tx.executeSql('drop table if exists formTable')
        // tx.executeSql('drop table if exists guestTable')

        tx.executeSql(
            'create table if not exists roomTable(ID integer primary key autoincrement, roomName text unique, kind text,note text, price real, stateRoom text, addDate text);'
        )
        tx.executeSql(
            'create table if not exists formTable(ID integer primary key autoincrement, roomID integer not null,roomName text not null, date text, note text, isPaid real,foreign key (roomID) references roomTable(ID)); '
        )
        tx.executeSql(
            'create table if not exists guestTable(ID integer primary key autoincrement, formID integer not null, name text, type text, IC text, address text, foreign key(formID) references formTable(ID))'
        )
    }, (error) => {
        console.log(error.message);
    }, () => {
        console.log('Init database successfully!')
        Files.getInfoAsync(`${documentDirectory}SQLite/userDatabase.db`).then(result => console.log(result.uri))
    })
}