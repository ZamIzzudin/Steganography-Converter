import React from "react";

import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const Layout = ({ children }) => {

  const removeOverlay = () => {
    document.querySelector(".sidebar-overlay").classList.remove("opened");
    document.querySelector(".sidebar").classList.remove("active");  
  }

  return (
    <div className="app_layout">
      <Header />
      <Sidebar />
      <main>{children}</main>
      <Footer />
      <div className="sidebar-overlay" onClick={removeOverlay}></div>
    </div>
  );
};

export default Layout;