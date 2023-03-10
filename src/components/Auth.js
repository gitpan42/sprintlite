import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {globalAuth } from '../config/firebase';
export const Auth = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    const signIn = async () => {
        try {
            await signInWithEmailAndPassword(globalAuth, email, password);
            console.log("user signed in .. redirecting to home");
            navigate("/tasks");
        } catch(e) {
            console.error(e);
        }
    }
    return (<div>
        <input placeholder="email" onChange={(e)=>setEmail(e.target.value)}/>
        <input placeholder="password" type="password" onChange={(e)=>setPassword(e.target.value)} />
        <button onClick={signIn}>Sign in</button>
    </div>)
}