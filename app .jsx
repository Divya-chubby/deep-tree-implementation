// App.js

import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [treeData, setTreeData] = useState(null);

  useEffect(() => {
    fetch('/api/tree')
      .then(res => res.json())
      .then(data => setTreeData(data))
      .catch(err => console.error('Error fetching tree data:', err));
  }, []);

  const renderTree = (node) => (
    <ul key={node.name}>
      <li>{node.name}</li>
      {node.children && node.children.map(child => renderTree(child))}
    </ul>
  );

  return (
    <div className="App">
      <h1>Deep Tree Example</h1>
      {treeData ? renderTree(treeData) : <p>Loading tree data...</p>}
    </div>
  );
}

export default App;
