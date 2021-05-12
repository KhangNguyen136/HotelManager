import { openDatabase } from 'expo-sqlite';
const db = openDatabase('userDatabase.db');

export default function () {
    db.transaction(tx => {
        // tx.executeSql('drop table if exists roomTable')
        tx.executeSql(
            'create table if not exists roomTable(ID integer primary key autoincrement, roomName text unique, kind text,note text, price real, stateRoom text);'
        )
    }, (error) => {
        console.log(error.message);
    }, () => {
        console.log('Init database successfully!')
    })
}