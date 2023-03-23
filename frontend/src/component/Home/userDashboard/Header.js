import React from "react";
import { Link } from "react-router-dom";

import Logo from '../../../assets/img/logo.svg'
const Header = () => {
  return (
    <header className="py-6 mb-12 borber-b">
      <div className="container mx-auto flex  justify-between items-center">
        <Link to="/">
          <img src={Logo} alt="Logo"></img>
        </Link>

        {/* buttons */}
        <div className="flex items-center gap-6">
          <Link to="/login"className="hover:bg-violet-800 transition"> Log In</Link>
          <Link to="/register" className="bg-violet-800 hover:bg-violet-800 text-white px-4 py-3 rounded-lg transition"> Sign Up</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
