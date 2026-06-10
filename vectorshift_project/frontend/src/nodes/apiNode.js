import { useState } from 'react';
import { BaseNode, NodeField } from './BaseNode';

export const ApiNode = ({ id, data }) => {
  const [url, setUrl] = useState(data?.url || 'https://api.example.com/v1');
  const [method, setMethod] = useState(data?.method || 'GET');

  const methodColors = { GET:'#10b981', POST:'#3b82f6', PUT:'#f59e0b', DELETE:'#ef4444' };

  return (
    <BaseNode
      id={id}
      title="API Request"
      gradient="linear-gradient(135deg,#06b6d4,#0891b2)"
      icon="🌐"
      nodeType="api"
      inputs={[{ id: 'body', label: 'Request Body' }]}
      outputs={[
        { id: 'response', label: 'Response' },
        { id: 'status', label: 'Status Code' },
      ]}
    >
      <NodeField label="Method">
        <select
          className="node-select"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          style={{ color: methodColors[method] || '#fff', fontWeight: 600 }}
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
          <option value="PATCH">PATCH</option>
        </select>
      </NodeField>
      <NodeField label="URL">
        <input
          className="node-input"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://..."
          style={{ fontFamily: 'var(--mono)', fontSize: 11 }}
        />
      </NodeField>
    </BaseNode>
  );
};
