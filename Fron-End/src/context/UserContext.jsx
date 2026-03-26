import { createContext, useState } from "react"

export const ContextUser = createContext();
const UserContext = ({ children }) => {
    const [user, setUser] = useState([]);
    const logout = () => {
        setUser(null);
        localStorage.removeItem('token'); // If you use localStorage as backup
    };
    return (
        <ContextUser.Provider value={{ user, setUser, logout }}>
            {children}
        </ContextUser.Provider>
    )
}

export default UserContext