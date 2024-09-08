import { ContactTypes } from 'expo-contacts';
import { Try } from 'expo-router/build/views/Try';
import * as SQLite from 'expo-sqlite';
import { createContext, useContext, useEffect } from 'react';
import { SocketContext } from '../../context/SocketContext';
var globalDB = {};
var DBContext = createContext();

const SQLProvider = ({ children }) => {
    const { socket } = useContext(SocketContext);
    const openDatabase = async () => {
        globalDB = await SQLite.openDatabaseAsync('abc.db');
    }
    const createTables = async () => {
        const Users = `CREATE TABLE IF NOT EXISTS Users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        mobile INTEGER,
        profile TEXT,
        server_id TEXT
    )`;

        const Contact = `CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        mobile INTEGER,
        profile TEXT,
        about TEXT,
        server_id TEXT
    )`;

        const ChatMessages = `CREATE TABLE IF NOT EXISTS chatmessages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        mobile INTEGER,
        message TEXT,
        isReceived INTEGER,
        isDelivered INTEGER,
        time TIME,
        date DATE
    )`;
        try {
            await globalDB.execAsync(Users);
            await globalDB.execAsync(ChatMessages);
            await globalDB.execAsync(Contact);
        } catch (error) {
            console.error(error);
            throw Error(`Failed to create tables`);
        }
    }
    const getUser = async () => {
        const users = `select * from users`;
        try {
            var user = await globalDB.getAllAsync(users);
            return user;
        } catch (error) {
            console.error(error);
            throw Error(`Failed to create tables`);
        }
    }

    const runQuery = async (query, param, cb) => {
        try {
            const res = await globalDB.runAsync(query, param);
            cb(res);

        } catch (error) {
            console.log(error);
        }
    }
    const addUser = async (user) => {
        const addUsers = `INSERT INTO Users (name,mobile,profile,server_id) VALUES(${user.name},${user.mobile},${user.profile},${user.id})`;
        await db.execAsync(addUsers);
    }

    const getContacts = async () => {
        try {
            const contact = 'SELECT * from contacts';
            var data = await globalDB.getAllAsync(contact);
            return data;
        } catch (error) {
            console.log(error);
        }

    }

    const getMessages = async (user) => {
        try {
            const contact = `SELECT * from chatmessages where mobile=${user}`;
            var data = await globalDB.getAllAsync(contact);
            return data;
        } catch (error) {
            console.log(error);
        }

    }

    const saveMessage = async (msg) => {
        var today = new Date;
        var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
        var time = today.getHours() + ":" + (today.getMinutes() < 9 ? '0' + today.getMinutes() : today.getMinutes());
        const addMessage = `INSERT INTO chatmessages (mobile,message,isReceived, time, date)
                    values (?, ?, ?, ?, ?)`;
        const params = [msg.user, msg.message, msg.isReceived, time, date];
        runQuery(addMessage, params, (res) => {
            console.log("Message Saved");
        })
    }

    const notifyUser = () => {

    }


    const syncContact = async (contacts) => {
        console.log("Contact Syncing");
        try {
            const deleteContact = "delete from contacts where id>0";
            runQuery(deleteContact, [], (res) => {
            })
            try {
                contacts.forEach(async (contact, index) => {
                    const addContact = `INSERT INTO contacts (name, mobile, profile, about, server_id) 
                    values (?, ?, ?, ?, ?)`;
                    const params = [contact.name, contact.mobile, contact.profile, contact.about, ''];
                    runQuery(addContact, params, (res) => {
                    })
                })
            } catch (error) {
                console.log(error)
            }
        } catch (error) {
            console.log(error)
        }




    }
    useEffect(() => {
        const init = async () => {
            try {
                await openDatabase();
                await createTables();
                console.log("DB and Tables succeswfully done");
            } catch (error) {
                console.log("Failed SQL Initialisation :", error)
            }
        }
        init();
    }, [])

    useEffect(() => {
        socket.on('save_message', data => {
            console.log(" Save area");
            saveMessage({
                user: data.sender,
                message: data.message,
                isReceived: true,
            })
        })
        socket.on('notify', data => {
            console.log("Notify to user");
        })
    }, [socket])

    return (
        <DBContext.Provider value={
            {
                getUser,
                addUser,
                getContacts,
                syncContact,
                saveMessage,
                getMessages,
            }
        }>
            {children}
        </DBContext.Provider>
    )

}

export { SQLProvider, DBContext };