import { useState } from 'react';
import { BaseNode, NodeField } from './BaseNode';

export const MergeNode = ({ id, data }) => {
  const [separator, setSeparator] = useState(data?.separator || ' ');
  const [inputCount, setInputCount] = useState(data?.inputCount || 2);

  const inputs = Array.from({ length: inputCount }, (_, i) => ({
    id: `in${i + 1}`,
    label: `Input ${i + 1}`,
  }));

  return (
    <BaseNode
      id={id}
      title="Merge"
      gradient="linear-gradient(135deg,#14b8a6,#0d9488)"
      icon="🔀"
      nodeType="merge"
      inputs={inputs}
      outputs={[{ id: 'output', label: 'Merged Output' }]}
    >
      <NodeField label="Input Count">
        <select
          className="node-select"
          value={inputCount}
          onChange={(e) => setInputCount(Number(e.target.value))}
        >
          {[2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>{n} inputs</option>
          ))}
        </select>
      </NodeField>
      <NodeField label="Separator">
        <input
          className="node-input"
          type="text"
          value={separator}
          onChange={(e) => setSeparator(e.target.value)}
          placeholder='e.g. ", " or "\n"'
          style={{ fontFamily: 'var(--mono)', fontSize: 11 }}
        />
      </NodeField>
    </BaseNode>
  );
};
