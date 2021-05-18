import { openDatabase } from 'expo-sqlite';
const db = openDatabase('userDatabase.db');

export function addForm(values, success, fail) {
    // console.log('add form: ', values)
    db.transaction(tx => {
        tx.executeSql(
            'insert into formTable(roomID, roomName ,date, note, isPaid) values (?,?,?,?,?)',
            [values.roomID, values.roomName, values.startDate.toString(), values.note, 0],
            (tx, results) => {
                const formID = results.insertId
                console.log(formID)
                const listGuest = values.listGuest
                for (let i = 1; i < listGuest.length; i++) {
                    const item = listGuest[i]
                    tx.executeSql(
                        'insert into guestTable(formID, name, type, IC, address) values (?,?,?,?,?)',
                        [formID, item.name, item.type, item.IC, item.address],
                        (tx, results) => {
                            console.log(results)
                        }
                    )
                }
            }
        )

    }, (error) => {
        console.log(error)
        fail(error.message)
    }, () => {
        success()
        db.transaction(tx => {
            tx.executeSql(
                'update roomTable set stateRoom = ? where ID = ?', ['occupied', values.roomID]
            )
        })
    }
    )
}

// function 

function findByID(list, ID) {
    for (let i = 0; i < list.length; i++)
        if (list[i].ID == ID)
            return i
    return -1
}

function updateListGuest(newList, oldList, formID) {
    // console.log('list: ', newList, oldList)
    var i
    db.transaction(tx => {
        if (newList.length == oldList.length) {
            // console.log('case 1')
            for (i in newList) {
                tx.executeSql(
                    'update guestTable set name = ?, type = ?, IC = ?, address = ? where ID = ?',
                    [newList[i].name, newList[i].type, newList[i].IC, newList[i].address, newList[i].ID]
                )
            }
        }
        else if (newList.length < oldList.length) {
            // console.log('Case 2')
            for (i in oldList) {
                var id = findByID(newList, oldList[i].ID)
                if (id != -1)
                    tx.executeSql(
                        'update guestTable set name = ?, type = ?, IC = ?, address = ? where ID = ?', [newList[id].name, newList[id].type, newList[id].IC, newList[id].address, newList[id].ID]
                    )
                else
                    tx.executeSql(
                        'delete from guestTable where ID = ?', [oldList[i].ID]
                    )
            }
        }
        else
            for (i in newList) {
                var id = findByID(oldList, newList[i].ID)
                // console.log('case 3')
                if (id != -1)
                    tx.executeSql(
                        'update guestTable set name = ?, type = ?, IC = ?, address = ? where ID = ?', [newList[i].name, newList[i].type, newList[i].IC, newList[i].address, newList[i].ID]
                    )
                else
                    tx.executeSql(
                        'insert into guestTable(formID, name, type, IC, address) values (?,?,?,?,?)', [formID, newList[i].name, newList[i].type, newList[i].IC, newList[i].address]
                    )
            }
    }, (error) => console.log(error.message),
        () => console.log('Update list guest successfully'))
}

export function deleteForm(values, success, fail) {
    console.log('Values :', values)
    db.transaction(tx => {
        tx.executeSql(
            'delete from formTable where ID = ?', [values.ID],
        )
        if (values.isPaid == 0)
            tx.executeSql(
                'update roomTable set stateRoom =  ? where ID = ? ', ['empty', values.roomID]
            )
        tx.executeSql(
            'delete from guestTable where formID = ?', [values.ID]
        )
    }, (error) => {
        fail(error.message)
    }, success)
}

export function updateForm(values, listGuest, oldListGuest, success, fail) {
    // console.log('update form: ', values)
    db.transaction(tx => {
        tx.executeSql(
            'update formTable set roomID = ?, roomName = ?, date = ?, note = ? where ID = ? ',
            [values.roomID, values.roomName, values.date.toString(), values.note, values.ID],
            (tx, results) => {
                console.log(results.rowsAffected)
            }
        )
        if (values.roomID != values.oldRoomID) {
            tx.executeSql(
                'update roomTable set stateRoom = ? where ID = ?', ['empty', values.oldRoomID]
            )
            tx.executeSql(
                'update roomTable set stateRoom = ? where ID = ?', ['occupied', values.roomID]
            )
        }
        updateListGuest(listGuest, oldListGuest, values.ID)
    }, (error) => {
        console.log(error)
        fail(error.message)
    }, success)
}