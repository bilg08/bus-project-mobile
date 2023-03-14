import React, {createContext, useContext, useState} from 'react';

type UserContextType = {
    user: any,
    setUser: React.Dispatch<React.SetStateAction<boolean>>,
    login: () => void
}
const UserContextDefault = {
    user: {},
    setUser: () => {},
    login: () => {},
}
const UserContext = createContext<UserContextType>(UserContextDefault);
export default function UserContextProvider({children} : {children: React.ReactNode}) {
    const [user, setUser] = useState({});
    const [isUser, setIsUser] = useState(false);
    function login(userInfo: any) {
        setUser(userInfo);
        setIsUser(true);
    }
  return (
    <UserContext.Provider value={{user,isUser, login}}>
        {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => useContext(UserContext);