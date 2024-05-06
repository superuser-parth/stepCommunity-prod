import React, { useState, useEffect } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";

import { removeToken } from "../../lib/AuthContext";



function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  // Logout function
const handleLogout = () => {
  removeToken();
  window.location.href = "/adminlogin";
};

// Function to handle collapse state on smaller screens
const handleScreenResize = () => {
  if (window.innerWidth <= 768) {
    setCollapsed(true);
  } else {
    setCollapsed(false);
  }
};

useEffect(() => {
  handleScreenResize(); // Initial check on component mount
  window.addEventListener("resize", handleScreenResize); // Add event listener for resize
  return () => {
    window.removeEventListener("resize", handleScreenResize); // Cleanup on component unmount
  };
}, []); // Empty dependency array ensures effect only runs on mount and unmount

  return (
    <Card
      className={collapsed?`h-[calc(100vh-2rem)]   max-w-[5rem] p-4 shadow-xl shadow-blue-gray-900/5 fixed `:`h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 fixed`}
    >
      
      <List>
        <ListItem>
          <ListItemPrefix>
            <PresentationChartBarIcon className="h-10 w-5" />
          </ListItemPrefix>
          <span className={collapsed ? "hidden" : ""}>Dashboard</span>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <ShoppingBagIcon className="h-10 w-5" />
          </ListItemPrefix>
          <span className={collapsed ? "hidden" : ""}>
            <a href="/adminbrowse">E-Commerce</a>
          </span>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <InboxIcon className="h-10 w-5" />
          </ListItemPrefix>
          <span className={collapsed ? "hidden" : ""}>Inbox</span>
          <ListItemSuffix>
            <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
          </ListItemSuffix>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <UserCircleIcon className="h-10 w-5" />
          </ListItemPrefix>
          <span className={collapsed ? "hidden" : ""}>Profile</span>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-10 w-5" />
          </ListItemPrefix>
          <span className={collapsed ? "hidden" : ""}>Settings</span>
        </ListItem>
        <ListItem onClick={handleLogout}>
          <ListItemPrefix>
            <PowerIcon className="h-10 w-5" />
          </ListItemPrefix>
          <span className={collapsed ? "hidden" : ""}>Log Out</span>
        </ListItem>
      </List>
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <button
          className="w-full bg-blue-gray-100 hover:bg-blue-gray-200 text-blue-gray-800 font-semibold py-2 px-4 rounded"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? "Expand" : "Collapse"}
        </button>
      </div>
    </Card>
  );
}

export default AdminSidebar;
