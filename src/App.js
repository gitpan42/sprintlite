
import './App.css';
import {Auth} from "./components/Auth";
import { useEffect, useState } from 'react';
import {db} from "./config/firebase";
import { getDocs, collection, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { Tasks } from "./components/Tasks";
import { Sprints } from "./components/Sprints";
import { Home } from "./components/Home";
import { SinglePageApp } from "./components/SingePageApp";
import { Task } from "./components/Task";
import { Sprint } from "./components/Sprint";

import { Logout } from "./components/Logout";

import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {

  
  return (


      <BrowserRouter>
      <Routes>
      <Route path="/" element={(<SinglePageApp />)}>
        <Route index  element={(<Home />)}></Route>
        <Route path="/login" element={(<Auth />)}></Route>
        <Route path="/logout" element={(<Logout />)}></Route>
        <Route path="/tasks" element={(<Tasks />)}></Route>
        <Route path="/tasks/:task_id" element={(<Task />)}></Route>
        <Route path="/sprints" element={(<Sprints />)}></Route>
        <Route path="/sprints/:sprint_name" element={(<Sprint />)}></Route>
      </Route>
      </Routes>
      </BrowserRouter>
  
  );
}

export default App;
