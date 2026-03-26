import { createContext, useState } from "react"

export const myMessageContecxt = createContext([]);
const MessageContext = ({ children }) => {
    const [message, setMessage] = useState([]);
    console.log(message)
    return (
        <myMessageContecxt.Provider value={{ message, setMessage }}>
            {children}
        </myMessageContecxt.Provider>
    )
}

export default MessageContext