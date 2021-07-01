import { openDatabase } from 'expo-sqlite';
const db = openDatabase('userDatabase.db');

export function AddBill(values, fail, success) {
    db.transaction(
        tx => {
            tx.executeSql(
                'insert into billTable(formID,paidTime, nday, surchargeThird,surchargeForeign,totalAmount, note) Values(?,?,?,?,?,?,?)',
                [values.formID, values.paidTime.toString(), values.nday, values.surchargeThird, values.surchargeForeign, values.totalAmount, values.note]

            )
            tx.executeSql(
                "update roomTable set stateRoom = ? where roomID = ? ",
                ['cleaning', values.roomID]
            )
            tx.executeSql(
                'update formTable set isPaid = ? where formID = ?', [1, values.formID]
            )
        }, (error) => fail(error.message)
        , success
    )
}

export function UpdateBill(values, fail, success) {
    db.transaction(
        tx => {
            tx.executeSql(
                'update billTable set paidTime = ?, nday = ?,  note = ?, totalAmount = ? where ID = ?',
                [values.paidTime.toString(), values.nday, values.note, values.total, values.ID]
            )
        }, (error) => fail(error.message)
        , success
    )
}

export function deleteBill(ID, fail, success) {
    db.transaction(
        tx => {
            tx.executeSql(
                'delete from billTable where ID = ?', [ID]
            )
        }, (error) => fail(error.message)
        , success
    )
}