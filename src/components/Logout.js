import {createUserWithEmailAndPassword, signOut} from 'firebase/auth';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import {globalAuth } from '../config/firebase';


export const Logout = () => {
    const navigate = useNavigate();

    const logout = async () => {
        try {
            await signOut(globalAuth);
            navigate("/");
        }
        catch(err) {
            console.error(err);
        }        
    }
    return (<button onClick={logout}>Logout</button>)
}