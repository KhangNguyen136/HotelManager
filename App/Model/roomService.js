import { openDatabase } from 'expo-sqlite';
const db = openDatabase('userDatabase.db');

export function addNewRoom(values, success, fail) {
    console.log("add values:", values)
    values.price = getPrice(values.kind)
    db.transaction(tx => {
        tx.executeSql(
            'insert into roomTable(roomName, kind, note, price, addDate,stateRoom) values (?,?,?,?,?,?)',
            [values.roomName, values.kind, values.note, values.price, values.addDate.toString(), 'empty'],
            // (tx, results) => {
            //     console.log(results)
            // }
        )
    }
        , (error) => {
            console.log(error.message)
            fail(error.message)
        }, success)
}

export function updateRoom(ID, values, success, fail) {
    console.log(values)
    db.transaction(tx => {
        tx.executeSql(
            'update roomTable set roomName = ?, kind =?, price = ?, note = ?, addDate =?, stateRoom =?  where ID = ? ',
            [values.roomName, values.kind, getPrice(values.kind), values.note, values.addDate.toString(), 'empty', ID],
            (tx, results) => {
                console.log(results.rowsAffected)
            }
        )
    }, (error) => fail(error.message),
        success)
}

export function deleteRoom(ID, success, fail) {
    db.transaction(tx => {
        tx.executeSql(
            'delete from roomTable where ID = ? ',
            [ID],
            // (tx, results) => {
            //     console.log(results.rowsAffected)
            // }
        )
    }, (error) => fail(error.message),
        success)
}

function getPrice(kind) {
    switch (kind) {
        case 'A':
            return 150000
        case 'B':
            return 170000
    }
    return 200000
}