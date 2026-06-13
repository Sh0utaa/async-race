import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/navbar.css';

export default function Navbar(): React.JSX.Element {
  const getLinkClass = ({ isActive }: { isActive: boolean }): string =>
    isActive ? 'nav-item active' : 'nav-item';

  return (
    <nav className="garage-nav-bar">
      <NavLink to="/" className={getLinkClass}>
        async race
      </NavLink>
      <NavLink to="/garage" className={getLinkClass}>
        garage
      </NavLink>
      <NavLink to="/winners" className={getLinkClass}>
        winners
      </NavLink>
    </nav>
  );
}
