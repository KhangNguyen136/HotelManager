import { openDatabase } from "expo-sqlite";
import initDatabase, { initData } from './initDatabase';
import { insertRule, insertRoomType, insertUserInfor } from "./dataServices";
import { insertRoom } from './roomService';
import { insertForm, insertGuest } from './formServices';
import { insertBill } from './billServices';
import { CheckInputFailed } from "../Components/AlertMsg/messageAlert";
import { Error, Success } from "../Components/AlertMsg/messageAlert";
import firebaseApp from '../firebaseConfig';
const db = openDatabase('userDatabase.db');

export function DeleteAll(success) {
    db.transaction(tx => {
        tx.executeSql('drop table if exists roomTypeTable')
        tx.executeSql('drop table if exists ruleTable')
        tx.executeSql('drop table if exists roomTable')
        tx.executeSql('drop table if exists formTable')
        tx.executeSql('drop table if exists guestTable')
        tx.executeSql('drop table if exists billTable')
        tx.executeSql('drop table if exists userInforTable')
    }, (error) => CheckInputFailed(error.message),
        success
    )
}

export function DeleteData(success) {
    db.transaction(
        tx => {
            tx.executeSql(
                'delete from userInforTable'
            )
            tx.executeSql(
                'delete from billTable'
            )
            tx.executeSql(
                'delete from guestTable'
            )
            tx.executeSql(
                'delete from formTable'
            )
            tx.executeSql(
                'delete from roomTable'
            )
            tx.executeSql(
                'delete from roomTypeTable'
            )
            tx.executeSql(
                'delete from ruleTable'
            )
        }, (error) => {
            Error('Action failed', error.message)
        },
        success
    )
}


export async function syncData(userID, success) {
    const today = new Date()
    const todayStr = today.toString().substring(0, 21)
    const userRef = firebaseApp.database().ref(userID)
    // reset data
    try {
        await userRef.set(null)
        db.transaction(
            tx => {
                tx.executeSql(
                    'select * from userInforTable', [],
                    (tx, result) => {
                        var item = result.rows.item(0)

                        item = { ...item, lastSync: todayStr }
                        userRef.child('userInfor').set(item)
                    }
                )
                tx.executeSql(
                    'select * from roomTypeTable', [],
                    (tx, result) => {
                        const n = result.rows.length
                        for (let i = 0; i < n; i++) {
                            const item = result.rows.item(i)
                            userRef.child('roomType').child(item.typeID).set(item)
                        }
                    }
                )
                tx.executeSql(
                    'select * from ruleTable', [],
                    (tx, result) => {
                        const n = result.rows.length
                        for (let i = 0; i < n; i++) {
                            const item = result.rows.item(i)
                            userRef.child('rule').child(item.ruleID).set(item)
                        }
                    }
                )
                tx.executeSql(
                    'select * from ruleTable', [],
                    (tx, result) => {
                        const n = result.rows.length
                        for (let i = 0; i < n; i++) {
                            const item = result.rows.item(i)
                            userRef.child('rule').child(item.ruleID).set(item)
                        }
                    }
                )
                tx.executeSql(
                    'select * from roomTable', [],
                    (tx, result) => {
                        const n = result.rows.length
                        for (let i = 0; i < n; i++) {
                            const item = result.rows.item(i)
                            userRef.child('room').child(item.roomID).set(item)
                        }
                    }
                )
                tx.executeSql(
                    'select * from formTable', [],
                    (tx, result) => {
                        const n = result.rows.length
                        for (let i = 0; i < n; i++) {
                            const item = result.rows.item(i)
                            userRef.child('form').child(item.formID).set(item)
                        }
                    }
                )
                tx.executeSql(
                    'select * from guestTable', [],
                    (tx, result) => {
                        const n = result.rows.length
                        for (let i = 0; i < n; i++) {
                            const item = result.rows.item(i)
                            userRef.child('guest').child(item.guestID).set(item)
                        }
                    }
                )
                tx.executeSql(
                    'select * from billTable', [],
                    (tx, result) => {
                        const n = result.rows.length
                        for (let i = 0; i < n; i++) {
                            const item = result.rows.item(i)
                            userRef.child('bill').child(item.ID).set(item)
                        }
                    }
                )
                tx.executeSql(
                    'update userInforTable set lastSync = ?', [todayStr]
                )
            }, (error) => Error('Action failed', error.message),
            () => {
                success()
                Success('Synced data')
            }
        )
    } catch (error) {
        CheckInputFailed('Action failed', error.message)
        success()
    }
}

export async function reloadData(userID, success) {
    try {
        console.log('Begin reload')
        const userRef = firebaseApp.database().ref(userID)
        await userRef.child('userInfor').get().then((snapshot) => {
            if (snapshot.exists()) {
                const userInfor = snapshot.val()
                // console.log(userInfor.userID, userInfor.lastSync)
                insertUserInfor(userInfor)
            }
            else {
                initData(userID, success)
            }
        })
        await userRef.child('roomType').get().then((snapshot) => {
            if (snapshot.exists())
                snapshot.forEach(child => {
                    const item = child.val()
                    insertRoomType(item)
                })

        })
        await userRef.child('rule').get().then((snapshot) => {
            if (snapshot.exists())
                snapshot.forEach(child => {
                    // console.log(child.ruleName, child.value)
                    insertRule(child.val())
                })
        })
        await userRef.child('room').get().then((snapshot) => {
            if (snapshot.exists())
                snapshot.forEach(child => {
                    // console.log(child)
                    insertRoom(child.val())
                })
        })
        await userRef.child('form').get().then((snapshot) => {
            if (snapshot.exists())
                snapshot.forEach(child => {
                    // console.log(child)
                    insertForm(child.val())
                })

        })
        await userRef.child('guest').get().then((snapshot) => {
            if (snapshot.exists())
                snapshot.forEach(child => {
                    // console.log(child)
                    insertGuest(child.val())
                })

        })
        await userRef.child('bill').get().then((snapshot) => {
            if (snapshot.exists())
                snapshot.forEach(child => {
                    // console.log(child)
                    insertBill(child.val())
                })
        })
        success()
        Success('Reload data successful')
    }
    catch (error) {
        CheckInputFailed('Reload failed', error.message)
        success()
    }
}

export function resetData(userID, success) {
    const userRef = firebaseApp.database().ref(userID).set(null).then(
        DeleteAll(() => initDatabase(userID, success))
    ).catch(error => CheckInputFailed('Action failed', error.message))
}

const emptyFunc = () => {

}