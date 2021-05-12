import { openDatabase } from 'expo-sqlite';
const db = openDatabase('userDatabase.db');

export function addNewRoom(values, success, fail) {
    values.price = getPrice(values.kind)
    db.transaction(tx => {
        tx.executeSql(
            'insert into roomTable(roomName, kind, note, price) values (?,?,?,?)',
            [values.roomName, values.kind, values.note, values.price],
            (tx, results) => {
                console.log(results.rowsAffected)
            }
        )
    }
        , (error) => {
            console.log(error.message)
            fail(error.message)
        }, success)
}

export function updateRoom(ID, values, success, fail) {
    db.transaction(tx => {
        tx.executeSql(
            'update roomTable set roomName = ?, kind =?, price = ?, note = ? where ID = ? ',
            [values.roomName, values.kind, getPrice(values.kind), values.note, ID],
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
            (tx, results) => {
                console.log(results.rowsAffected)
            }
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