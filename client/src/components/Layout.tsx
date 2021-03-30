import React from 'react';
import { Navbar } from './Navbar';

interface LayoutProps {

}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return <>
      <Navbar />
      {children}
    </>;
}
