export const Sidebar = () =>{
    
    return (
        <div className="flex flex-row flex-wrap w-screen items-start fixed top-0 left-0 h-16 m-1 p-1 bg-blue-800 text-white">
                <div className="order-1 h-12 px-5"><a href="/">Home </a></div>
                <div className="order-2 h-12 px-5"><a href="/sprints">Sprints</a></div>
                <div className="order-3 h-12 px-5"><a href="/tasks">Tasks</a></div>
                <div className="order-3 h-12 px-5 flex-auto"></div>
        </div>
    )
}