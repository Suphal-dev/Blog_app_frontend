import React, { useState } from "react";
import "../../App.css";
import { Link, Outlet } from "react-router-dom";

const ResponsiveSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };



    
  return (

   
      <div className="app">
      
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        
        <nav>
          <ul>
               <li className=""  id='panel_link'><span>📈</span><Link to="/admin-dashboard"> Panel</Link> </li>
               <li className=""><span>👥</span><Link to="/users">Users</Link></li>
               {/* <li className=""><span>🏷️</span>Categories</li> */}
               <li className=""><span>📝</span><Link to="/all-posts">All Blogs</Link></li>
               {/* <li className=""><span>✍️</span><Link to="/user-dashboard">Go to My Blogs</Link></li>        */}
               <li className=""><span>⚙️</span><Link to="/admin-edit">Setting</Link></li>
               <li className=""><span>🏠</span><Link to="/"> Home</Link> </li>
          </ul>
        </nav>
      </div>
  
      {/* Main Content */}

      <div className="main-content ">
        <header>
          <h1>eBlog</h1>
          <button  className=".mmenu-btn" onClick={toggleSidebar}>
            ☰
          </button>
          
        </header>
  
        <main>
            <Outlet/>
         
        </main>
  
      </div>
    </div>
   
  )
}

export default ResponsiveSidebar
