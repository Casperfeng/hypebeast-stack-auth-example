import React from 'react';
import { useHelloQuery } from './generated/graphql';

const App: React.FC = () => {
  const { data, loading } = useHelloQuery()

  if (loading || !data) {
    return <>loading...</>
  }
  return (
    <>
    {data.hello}
    </>
  );
}

export default App;
