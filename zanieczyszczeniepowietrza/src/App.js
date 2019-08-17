import React from 'react';
import MenuBar from './MenuBar.js';

function App() {
  const [mode, setMode] = React.useState(0);

  return (
    <>
      <MenuBar
        mode={mode}
        setMode={setMode}
      />
    </>
  );
}

export default App;
