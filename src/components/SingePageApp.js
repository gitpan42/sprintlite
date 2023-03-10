import { Outlet } from "react-router-dom"
import { Navbar } from "./Navbar"
import { Sidebar } from "./Sidebar";

export const SinglePageApp = () => {

    return (<div className="flex flex-col p-20 flex-nowrap justify-evenly">

                <Sidebar/>
                <Outlet />

            </div>);

}