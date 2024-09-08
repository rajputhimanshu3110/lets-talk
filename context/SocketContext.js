import React, { createContext } from "react";
import { io } from 'socket.io-client';

const SocketContext = createContext();

const socket = io(`http://${window.location.hostname}:3000`);

const ContextProvider = ({ children }) => {
    return (
        <SocketContext.Provider value={{
            socket,
        }}>
            {children}
        </SocketContext.Provider>
    )
}

export { ContextProvider, SocketContext };