import { openDatabase } from 'expo-sqlite';
import { deleteForm } from './formServices';
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

export function insertBill(values) {
    db.transaction(tx => {
        tx.executeSql(
            'insert into billTable(ID, formID,paidTime, nday, surchargeThird,surchargeForeign,totalAmount, note) Values(?,?,?,?,?,?,?,?)',
            [values.ID, values.formID, values.paidTime, values.nday, values.surchargeThird, values.surchargeForeign, values.totalAmount, values.note]
        )
    })
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

export function deleteBill(ID, formID, fail, success) {
    db.transaction(
        tx => {
            tx.executeSql(
                'delete from billTable where ID = ?', [ID]
            )
            tx.executeSql(
                'delete from guestTable where formID = ?', [formID]
            )
            tx.executeSql(
                'delete from formTable where formID = ?', [formID],
            )

        }, (error) => fail(error.message)
        , success
    )
}