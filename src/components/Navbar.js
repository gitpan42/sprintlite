import {Link } from 'react-router-dom';
import {Logout} from './Logout';

export const Navbar = () => {
    return (
        <header>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Fifth navbar example">
                <div class="container-fluid">
                <a class="navbar-brand" href="/">SprintLite</a>
                    <div class="collapse navbar-collapse">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link" href="/sprints">Sprints</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/tasks" >Tasks</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/tasks" >Tasks</a>
                        </li>
                        </ul>
                    </div>
                </div>
            </nav>
       </header>
        
    )
}


{/* <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">SprintLite</Link>
            <Link className="nav-item nav-link" to="/sprints">Sprints</Link>
            <Link className="nav-item nav-link" to="/tasks">Tasks</Link>
        </nav>
   */}