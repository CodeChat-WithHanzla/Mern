import { createContext, useState } from 'react'
export const UserDataContext = createContext()
function UserContext({ children }) {
    const [userData, setUserData] = useState({
        fullName: {
            firstName: '',
            lastName: ''
        }
        , email: '',
        password: '',

    })

    return (
        <UserDataContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserDataContext.Provider>
    )
}

export default UserContext