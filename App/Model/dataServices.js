import { openDatabase } from "expo-sqlite";
const db = openDatabase('userDatabase.db');

export function insertUserInfor(data) {
    db.transaction(tx => {
        tx.executeSql(
            'insert into userInforTable(userID,lastSync) values (?,?)', [data.userID, data.lastSync]
        )
    }, (error) => console.log(error.message))
}

export function insertRoomType(data) {
    db.transaction(tx => {
        tx.executeSql(
            'insert into roomTypeTable(typeID,type,price) values (?,?,?)', [data.typeID, data.type, data.price]
        )
    }, (error) => console.log(error.message))
}

export function insertRule(data) {
    db.transaction(tx => {
        tx.executeSql(
            'insert into ruleTable(ruleID, ruleName, value) values (?,?,?)', [data.ruleID, data.ruleName, data.value]
        )
    }, (error) => console.log(error.message))
}

