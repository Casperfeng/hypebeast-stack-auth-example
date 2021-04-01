import React from 'react';
import { Link } from 'react-router-dom';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';

interface NavbarProps {

}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const { data, loading } = useMeQuery();
  const [logout, { client }] = useLogoutMutation();
    return <ul>
      <li><Link to="/">home</Link></li>
      <li><Link to="/login">login</Link></li>
      <li><Link to="/register">register</Link></li>
      {!loading && data && data.me && (<li><button onClick={async () => {
        await logout();
        await client!.resetStore();
      }}>logout</button></li>)}
    </ul>
}
