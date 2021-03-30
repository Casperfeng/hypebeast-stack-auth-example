import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import React from 'react';

const App: React.FC = () => {
  const { data, loading } = useQuery(gql`
  {
    hello
  }

  `);

  if (loading) {
    return <>loading...</>
  }
  return (
    <>
    {JSON.stringify(data)}
    </>
  );
}

export default App;
