import { useState } from 'react';
import { BaseNode, NodeField } from './BaseNode';

const OPERATIONS = [
  { value: 'uppercase',       label: 'UPPERCASE' },
  { value: 'lowercase',       label: 'lowercase' },
  { value: 'trim',            label: 'Trim Whitespace' },
  { value: 'reverse',         label: 'Reverse String' },
  { value: 'json_parse',      label: 'JSON → Object' },
  { value: 'json_stringify',  label: 'Object → JSON' },
  { value: 'base64_encode',   label: 'Base64 Encode' },
  { value: 'base64_decode',   label: 'Base64 Decode' },
  { value: 'url_encode',      label: 'URL Encode' },
  { value: 'url_decode',      label: 'URL Decode' },
];

export const TransformNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'uppercase');

  return (
    <BaseNode
      id={id}
      title="Transform"
      gradient="linear-gradient(135deg,#fb923c,#ea580c)"
      icon="⚡"
      nodeType="transform"
      inputs={[{ id: 'input', label: 'Input' }]}
      outputs={[{ id: 'output', label: 'Output' }]}
    >
      <NodeField label="Operation">
        <select
          className="node-select"
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
        >
          {OPERATIONS.map((op) => (
            <option key={op.value} value={op.value}>{op.label}</option>
          ))}
        </select>
      </NodeField>
      <div className="node-badge">{OPERATIONS.find(o => o.value === operation)?.label}</div>
    </BaseNode>
  );
};
