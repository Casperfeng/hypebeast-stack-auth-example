import React from 'react';
import ExampleComponent from '../components/ExampleComponent';

interface ExamplePageProps {}

const ExamplePage: React.FC<ExamplePageProps> = () => {
  return (
    <div>
      <h1>Velkommen til en eksempelside</h1>
      <ExampleComponent />
    </div>
  );
};

export default ExamplePage;
