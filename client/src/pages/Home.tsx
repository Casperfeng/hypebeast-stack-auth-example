import React from 'react';
import { useUsersQuery } from '../generated/graphql';

interface HomeProps {

}

export const Home: React.FC<HomeProps> = ({}) => {
  const { data, } = useUsersQuery({ fetchPolicy: 'network-only'});

  if (!data) {
    return <div>loading...</div>
  }

  return <div>
      <div>users: </div>
      <ul>
        {data.users.map(x => {
          return <li key={x.email}>{x.email}</li>
        })}
      </ul>
    </div>
}

export default Home;
