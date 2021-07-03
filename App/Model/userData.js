import { openDatabase } from "expo-sqlite";
import { CheckInputFailed } from "../Components/AlertMsg/messageAlert";
const db = openDatabase('userDatabase.db');

export function InserUserID(userID, success) {
    db.transaction(tx => {
        tx.executeSql(
            'insert into userInforTable where ID=? ', [1]
        )
    }, (error) => CheckInputFailed(error.message),
        success)
}

export function DeleteAll(success) {
    db.transaction(tx => {
        tx.executeSql(
            'delete from roomTypeTable'
        )
        tx.executeSql(
            'delete from ruleTable'
        )
        tx.executeSql(
            'delete from roomTable'
        )
        tx.executeSql(
            'delete from formTable'
        )
        tx.executeSql(
            'delete from guestTable'
        )
        tx.executeSql(
            'delete from billTable'
        )
        tx.executeSql(
            'delete from userInforTable'
        )
    }, (error) => CheckInputFailed(error.message),
        success
    )
}