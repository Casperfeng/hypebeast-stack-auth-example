import React, { useEffect, useState } from 'react';
import Routes from './navigation/Routes';

const App: React.FC = () => {
  const [loading, setLoading] =  useState(true);

  useEffect(() => {
   fetch('http://localhost:4000/refresh_token', {
     method: 'POST',
     credentials: "include"
   }).then(async x => {
     const data = await x.json();
     console.log(data);
     setLoading(false);
   })
  },[])

  if (loading){
    return <div>loading...</div>;
  }

  return (
    <Routes />
  );
}

export default App;
