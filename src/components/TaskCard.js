import {db, globalAuth} from "../config/firebase";
import { useNavigate } from 'react-router-dom';
import { getDocs, collection, addDoc,setDoc, deleteDoc, doc, getDoc } from 'firebase/firestore';



export const TaskCard = (props) => {

    const navigate = useNavigate();
    const handleDragOver= (e) => {
        e.preventDefault();
    }
    const handleDrag = (e, status, taskId, sprintName, taskName, owner) => {
        console.log("Dragging started for task "+ taskId +"in "+status);
        e.dataTransfer.setData("taskId", taskId);
        e.dataTransfer.setData("sprintName", sprintName);
        e.dataTransfer.setData("status", status);
        e.dataTransfer.setData("taskName", taskName);
        e.dataTransfer.setData("taskOwner", owner);
    }

    const handleDrop = async (e, statusDropped) => {
        try {
            let taskId = e.dataTransfer.getData("taskId");
            let taskName = e.dataTransfer.getData("taskName");
            let owner = e.dataTransfer.getData("taskOwner");
            let sprintName= e.dataTransfer.getData("sprintName");
            console.log("Just dropped "+ taskId + " on " +statusDropped);
            const task_doc_ref = await doc(db, "tasks", taskId);
            const updated_task = {
                task_name: taskName,
                task_state: statusDropped,
                owner: owner,
                sprint_name: sprintName
            }
            await setDoc(task_doc_ref, updated_task);
            props.callBackToRefresh.call();
        } catch(ex) {
            console.error("An error occurred during drag and drop of task and/or its update "+ex);
        }
    }
    

    const taskLink = `/tasks/${props.taskId}`;
    
    return (<div className="display:block, border-x-2 border-x-black border-y-2 border-y-black px-3 py-3 m-3" draggable="true" onDragStart={(e)=>handleDrag(e, props.status, props.taskId, props.sprintName, props.taskName, props.userFirstName)} onDrop={(e)=>handleDrop(e, props.status)} onDragOver={(e)=>handleDragOver(e, props.status)}><a href={taskLink}>{props.taskName} - {props.userFirstName}</a></div>);
}