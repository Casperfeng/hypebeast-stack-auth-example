import React, { createContext, useState, useMemo } from 'react';

interface ExampleContextProps {
  exampleProvider: ExampleValue;
}

interface ExampleValue {
  example: any | null;
  setExample: (val: any) => void;
}

export const ExampleContext = createContext<ExampleContextProps | null>(null);

const ExampleProvider: React.FC = ({ children }) => {
  const [example, setExample] = useState<any | null>(null);

  const exampleProvider = useMemo(() => ({ example, setExample }), [example]);

  return (
    <ExampleContext.Provider
      value={{
        exampleProvider,
      }}
    >
      {children}
    </ExampleContext.Provider>
  );
};

export default ExampleProvider;
