import React from 'react';
import { Header } from './Header';

interface LayoutProps {

}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return <>
      <Header />
      {children}
    </>;
}
