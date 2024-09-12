import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import NavCSS from './Navbar.module.css'; // Ensure this CSS file is set up

export const Navbar = () => {
  return (
    <nav className={NavCSS.navbar}>
      <ul className={NavCSS.navList}>
        {/* Profile Info Link */}
        <li className={NavCSS.navItem}>
          <Link to="/profile" className={NavCSS.navLink}>
            Profile Info
          </Link>
        </li>

        {/* Banking Details Link */}
        <li className={NavCSS.navItem}>
          <Link to="/banking" className={NavCSS.navLink}>
            Banking Details
          </Link>
        </li>

        {/* Qualification Link */}
        <li className={NavCSS.navItem}>
          <Link to="/qualification" className={NavCSS.navLink}>
            Qualification
          </Link>
        </li>

        {/* Job Title Link */}
        <li className={NavCSS.navItem}>
          <Link to="/jobtitle" className={NavCSS.navLink}>
            Job Title
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;