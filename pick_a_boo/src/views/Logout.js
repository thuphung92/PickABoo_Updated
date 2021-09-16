import React, { useEffect } from 'react'
import UserContext from '../context/UserContext';

function Logout() {
    const {user, setUser} = UserContext(UserContext)

    useEffect(() => {
        console.log(user)
        setUser({})
    },[])

    return (
        <div>      
            Thanks for your visit! See you soon!
            /*<Redirect to={{pathname: '/'}}/> */     
        </div>
    )
}

export default Logout