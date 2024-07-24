import { useState, useEffect } from "react";

import axios from "axios";

import UserContext from './userContext';

const UserState = (props)=>{
    const [loggedUser, setUser] = useState();
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
            const response = await axios.get('http://localhost:8000/me', { withCredentials: true });
            console.log(response.data);
            if(response.data.isAuthenticated){
                setUser(response.data.name);
            }
            } catch (error) {
            console.error('Failed to fetch user info:', error);
            }
        };

        fetchUserInfo();
      }, []);
    
    return (
        <UserContext.Provider value={{loggedUser, setUser}}>
            {props.children}
        </UserContext.Provider>
    )
    
}

export default UserState;