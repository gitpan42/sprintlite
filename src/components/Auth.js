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
    return (<>
    <div className="flex flex-row">
        <div className=" flex flex-col justify-self-center bg-white border-red-900 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-80">
            <div className="mb-4 w-80">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Username 
                </label> 
                <input  className="border-x-2 border-y-2" onChange={(e)=>setEmail(e.target.value)} />
            </div>
            <div className="mb-4 w-80">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Password 
                </label> 
                <input type="password" className="border-x-2 border-y-2" onChange={(e)=>setPassword(e.target.value)} />
                
            </div>
            <div className="mb-4 w-80 justify-center">
            <button onClick={signIn}>Sign in</button>    
            </div>
            
        </div>
    <   div className=" flex-auto"></div>
    </div>
    </>)
   
}