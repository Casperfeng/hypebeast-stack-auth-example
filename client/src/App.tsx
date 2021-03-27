import React from 'react';
import { Link } from 'react-router-dom';

function App() {
  return (
    <>
      <h1>Velkommen til JrC React-TS Baseline!</h1>
      <ul>
        <li>Les README for informasjon om bruk</li>
      </ul>
      <Link to="/example">Til eksempelside</Link>
    </>
  );
}

export default App;
