import React from 'react';
import ExampleComponent from '../components/ExampleComponent';

interface ExampleProps {}

export const Example: React.FC<ExampleProps> = () => {
  return (
    <div>
      <h1>Velkommen til en eksempelside</h1>
      <ExampleComponent />
    </div>
  );
};


