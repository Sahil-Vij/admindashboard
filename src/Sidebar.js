import React from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';

const Sidebar = ({ handleLogout }) => {
  const location = useLocation();

  const isActiveRoute = (route) => {
    return location.pathname === route;
  };

  const logout = () => {
    handleLogout();
    return <Navigate to="/" />;
  };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <Link to="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            Dashboard
          </Link>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <Link to="/bookings" className="sidebar-menu-item" style={{ textDecoration: 'none' }}>
              <CDBSidebarMenuItem icon="table">
                <span className={isActiveRoute('/bookings') ? 'active-menu-text' : 'menu-text'}>Bookings</span>
              </CDBSidebarMenuItem>
            </Link>
            <Link to="/add-event" className="sidebar-menu-item" style={{ textDecoration: 'none' }}>
              <CDBSidebarMenuItem icon="user">
                <span className={isActiveRoute('/add-event') ? 'active-menu-text' : 'menu-text'}>Add Event</span>
              </CDBSidebarMenuItem>
            </Link>
            <Link to="/events" className="sidebar-menu-item" style={{ textDecoration: 'none' }}>
              <CDBSidebarMenuItem icon="table">
                <span className={isActiveRoute('/events') ? 'active-menu-text' : 'menu-text'}>Events</span>
              </CDBSidebarMenuItem>
            </Link>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div style={{ padding: '20px 5px' }}>
            <button className="btn btn-danger" onClick={logout}>
              Logout
            </button>
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
