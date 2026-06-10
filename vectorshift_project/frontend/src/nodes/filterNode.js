import { useState } from 'react';
import { BaseNode, NodeField } from './BaseNode';

export const FilterNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || 'contains');
  const [value, setValue] = useState(data?.value || '');

  return (
    <BaseNode
      id={id}
      title="Filter"
      gradient="linear-gradient(135deg,#f43f5e,#e11d48)"
      icon="🔍"
      nodeType="filter"
      inputs={[{ id: 'data', label: 'Data In' }]}
      outputs={[
        { id: 'pass', label: 'Pass ✓' },
        { id: 'fail', label: 'Fail ✗' },
      ]}
    >
      <NodeField label="Condition">
        <select
          className="node-select"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
        >
          <option value="contains">Contains</option>
          <option value="equals">Equals</option>
          <option value="startsWith">Starts With</option>
          <option value="endsWith">Ends With</option>
          <option value="greaterThan">Greater Than</option>
          <option value="lessThan">Less Than</option>
          <option value="regex">Regex Match</option>
        </select>
      </NodeField>
      <NodeField label="Value">
        <input
          className="node-input"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Filter value..."
        />
      </NodeField>
    </BaseNode>
  );
};
