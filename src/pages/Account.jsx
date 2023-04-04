import React from 'react';
import {UserAuth} from '../context/AuthContext'
import Profile from './Profile'

const Account = () => {
    const {logOut, user} = UserAuth();
 
    const handleSignOut = async() => {
        try {
          await logOut()
        } catch (error) {
          console.log(error)
        }
      }
    
    return (
        <div>
            <h1>Account</h1>
            <div>
                <p>Welcome, {user?.displayName}</p>
            </div>
            <button onClick={handleSignOut}>LogOut</button>
            {user && <Profile user={user}/>}
        </div>
    )
};

export default Account;