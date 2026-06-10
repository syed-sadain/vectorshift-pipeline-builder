import { useState } from 'react';
import { BaseNode, NodeField } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace('customOutput-', 'output_')
  );
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Output"
      gradient="linear-gradient(135deg,#f59e0b,#d97706)"
      icon="📤"
      nodeType="customOutput"
      inputs={[{ id: 'value', label: 'Value' }]}
    >
      <NodeField label="Name">
        <input
          className="node-input"
          type="text"
          value={currName}
          onChange={(e) => setCurrName(e.target.value)}
          placeholder="output_name"
        />
      </NodeField>
      <NodeField label="Type">
        <select
          className="node-select"
          value={outputType}
          onChange={(e) => setOutputType(e.target.value)}
        >
          <option value="Text">Text</option>
          <option value="Image">Image</option>
          <option value="File">File</option>
        </select>
      </NodeField>
    </BaseNode>
  );
};
