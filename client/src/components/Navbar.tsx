import React from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {

}

export const Navbar: React.FC<NavbarProps> = ({}) => {
    return <ul>
      <li><Link to="/">home</Link></li>
      <li><Link to="/login">login</Link></li>
      <li><Link to="/register">register</Link></li>
    </ul>
}
