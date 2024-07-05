// App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [treeData, setTreeData] = useState([]);

  useEffect(() => {
    // Fetch tree data from the backend when the component mounts
    axios.get('/api/tree')
      .then(response => {
        setTreeData(response.data);
      })
      .catch(error => {
        console.error('Error fetching tree data:', error);
      });
  }, []);

  return (
    <div className="App">
      <h1>Deep Tree Implementation</h1>
      <TreeViewer data={treeData} />
    </div>
  );
}

// TreeViewer.jsx
function TreeViewer({ data }) {
  return (
    <div className="tree-viewer">
      {data.map((node, index) => (
        <TreeNode key={index} node={node} />
      ))}
    </div>
  );
}

// TreeNode.jsx
function TreeNode({ node }) {
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="tree-node">
      <div>{node.name}</div>
      {hasChildren && (
        <div className="children-nodes">
          {node.children.map((child, index) => (
            <TreeNode key={index} node={child} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;