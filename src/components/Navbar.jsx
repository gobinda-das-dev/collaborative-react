import React from "react";
import "../index.css";

const Navbar = () => {
  return (
    <nav className="w-full fixed top-0 left-0 z-50 px-[5vw] py-[2vw] flex justify-between items-center">
      <h1 className="logo text-2xl font-sans">CUSP</h1>
      <a href="">MENU</a>
    </nav>
  );
};


export default Navbar;