import React from 'react';
import { useMeQuery } from '../generated/graphql';
import { Navbar } from './Navbar';

interface HeaderProps {

}

export const Header: React.FC<HeaderProps> = ({}) => {
  const {data, loading } = useMeQuery({ fetchPolicy: 'network-only' });

  let body: any = null;

  if (loading) {
    body = null;
  } else if (data && data.me) {
    body = <div>you are logged in as: {data.me.email}</div>
  }


    return <header>
      {body}
      <Navbar />
    </header>
}

