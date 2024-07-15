import { useState } from "react";

import UserContext from './userContext';

const UserState = (props)=>{
    const [loggedUser, setUser] = useState();
    return (
        <UserContext.Provider value={{loggedUser, setUser}}>
            {props.children}
        </UserContext.Provider>
    )
    
}

export default UserState;