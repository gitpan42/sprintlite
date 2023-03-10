import {Link, Outlet, useNavigate} from 'react-router-dom';
import { Navbar } from './Navbar';
import { useEffect } from 'react';
import {globalAuth } from '../config/firebase';


export const Home = () => {
    const navigate = useNavigate();
    console.log(globalAuth.currentUser?.email);
    
    useEffect(()=> {
        globalAuth.onAuthStateChanged(user => {
            if (!user) {
              navigate("/login");
            }
        });
     }, []);
    return (
        <div className="flex py-7 ">
            Welcome to SprintLite! Check how your <a className="px-1 font-bold text-blue-800 " href="/sprints">Sprints</a> are doing!
        </div>
    )
}