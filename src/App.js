import React, { useState } from "react";
import { Menu, Home, Settings } from "lucide-react";
import { Button } from "./components/Button";
import SideNav from "./layouts/SideNav";
import Main from "./layouts/Main";
import SideBar from "./layouts/SideBar";

const TopNav = () => {
  return (
    <div className="w-full text-white p-2 flex justify-between items-center shadow-purple-glow z-10">
      <div className="w-1/4">
        <img src="/logo.png" alt="Responsive Image" className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 h-auto rounded-lg ml-2" />
      </div>
      <h2 className="text-lg font-semibold">My App</h2>
    </div>
  );
};

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(null); // Sidebar state

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <TopNav />
      <div className="flex flex-1 overflow-hidden">
        <SideNav />
        <div className="flex-1 overflow-y-auto bg-gray-100">
          <Main setOpen={setIsSidebarOpen} />
        </div>
        <SideBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      </div>
    </div>
  );
};

export default App;
