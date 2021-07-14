import { openDatabase } from 'expo-sqlite';
import { deleteForm } from './formServices'
const db = openDatabase('userDatabase.db');

export function addNewRoom(values, success, fail) {
    // console.log("add values:", values)
    db.transaction(tx => {
        tx.executeSql(
            'insert into roomTable(roomName, typeID, note, addDate,stateRoom) values (?,?,?,?,?)',
            [values.roomName, values.typeID, values.note, values.addDate.toString(), 'available'],
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

export function insertRoom(values) {
    db.transaction(tx => {
        tx.executeSql(
            'insert into roomTable(roomID,roomName, typeID, note, addDate,stateRoom) values (?,?,?,?,?,?)',
            [values.roomID, values.roomName, values.typeID, values.note, values.addDate, values.stateRoom]
        )
    })
}

export function updateRoom(ID, values, success, fail) {
    db.transaction(tx => {
        tx.executeSql(
            'update roomTable set roomName = ?, typeID =?, note = ?, addDate =?  where roomID = ? ',
            [values.roomName, values.typeID, values.note, values.addDate.toString(), ID],
            // (tx, results) => {
            //     console.log(results.rowsAffected)
            // }
        )
    }, (error) => fail(error.message),
        success
    )
}

export function deleteRoom(ID, success, fail) {
    db.transaction(tx => {
        tx.executeSql(
            'select formID from formTable where roomID = ?', [ID],
            (tx, result) => {
                const n = result.rows.length
                for (let i = 0; i < n; i++) {
                    const formID = result.rows.item(i).formID
                    tx.executeSql(
                        'delete from billTable where formID =?', [formID]
                    )
                    tx.executeSql(
                        'delete from guestTable where formID = ?', [formID]
                    )
                    tx.executeSql(
                        'delete from formTable where formID = ?', [formID],
                    )


                }
            }
        )
        tx.executeSql(
            'delete from roomTable where roomID = ? ',
            [ID],
            // (tx, results) => {
            //     console.log(results.rowsAffected)
            // }
        )

    }, (error) => fail(error.message),
        success)
}

export function changeStt(ID, stt, fail, success) {
    db.transaction(tx => {
        tx.executeSql(
            'update roomTable set stateRoom = ? where roomID = ?', [stt, ID]
        )
    }, (error) => {
        fail(error.message)
    }, success)
}
