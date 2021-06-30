import { openDatabase } from 'expo-sqlite';
const db = openDatabase('userDatabase.db');

export function addForm(values, success, fail) {
    // console.log('add form: ', values)
    db.transaction(tx => {
        tx.executeSql(
            'insert into formTable(roomID ,date, note, isPaid) values (?,?,?,?)',
            [values.roomID, values.startDate.toString(), values.note, 0],
            (tx, results) => {
                const formID = results.insertId
                console.log(formID)
                const listGuest = values.listGuest
                for (let i = 0; i < listGuest.length; i++) {
                    const item = listGuest[i]
                    tx.executeSql(
                        'insert into guestTable(formID, name, type, IC, address) values (?,?,?,?,?)',
                        [formID, item.name, item.type, item.IC, item.address],
                        // (tx, results) => {
                        //     console.log(results)
                        // }
                    )
                }
            }
        )
        tx.executeSql(
            'update roomTable set stateRoom = ? where roomID = ?', ['occupied', values.roomID]
        )
    }, (error) => {
        console.log(error)
        fail(error.message)
    }, () => {
        success()
    }
    )
}

function updateListGuest(newList, oldList, formID, success) {
    // console.log('list: ', newList, oldList)
    db.transaction(tx => {
        for (let i in newList) {
            tx.executeSql(
                'insert into guestTable(formID, name, type, IC, address) values (?,?,?,?,?)',
                [formID, newList[i].name, newList[i].type, newList[i].IC, newList[i].address]
            )
        }
        for (let j = 0; j < oldList.length; j++) {
            tx.executeSql(
                'delete from guestTable where guestID = ?', [oldList[j].guestID]
            )
        }

    }, (error) => console.log(error.message),
        success)
}

export function deleteForm(values, success, fail) {
    // console.log('Values :', values)
    db.transaction(tx => {
        tx.executeSql(
            'delete from formTable where formID = ?', [values.formID],
        )
        if (values.isPaid == 0)
            tx.executeSql(
                'update roomTable set stateRoom =  ? where roomID = ? ', ['available', values.roomID]
            )
        tx.executeSql(
            'delete from guestTable where formID = ?', [values.formID]
        )
    }, (error) => {
        fail(error.message)
    }, success)
}

export function updateForm(values, listGuest, oldListGuest, success, fail) {
    // console.log({ values, listGuest, oldListGuest })
    db.transaction(tx => {
        tx.executeSql(
            'update formTable set roomID = ?, date = ?, note = ? where formID = ? ',
            [values.roomID, values.date.toString(), values.note, values.formID],
            // (tx, results) => {
            //     console.log(results.rowsAffected)
            // }
        )
        if (values.roomID != values.oldRoomID) {
            tx.executeSql(
                'update roomTable set stateRoom = ? where roomID = ?', ['available', values.oldRoomID]
            )
            tx.executeSql(
                'update roomTable set stateRoom = ? where roomID = ?', ['occupied', values.roomID]
            )
        }
        updateListGuest(listGuest, oldListGuest, values.formID, success)
    }, (error) => {
        console.log(error)
        fail(error.message)
    })
}