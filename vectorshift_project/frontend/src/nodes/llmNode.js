import { BaseNode, NodeField } from './BaseNode';
import { useState } from 'react';

export const LLMNode = ({ id, data }) => {
  const [model, setModel] = useState(data?.model || 'gpt-4o');

  return (
    <BaseNode
      id={id}
      title="LLM"
      gradient="linear-gradient(135deg,#8b5cf6,#6d28d9)"
      icon="🤖"
      nodeType="llm"
      inputs={[
        { id: 'system', label: 'System Prompt' },
        { id: 'prompt', label: 'User Prompt' },
      ]}
      outputs={[{ id: 'response', label: 'Response' }]}
    >
      <NodeField label="Model">
        <select
          className="node-select"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        >
          <option value="gpt-4o">GPT-4o</option>
          <option value="gpt-4-turbo">GPT-4 Turbo</option>
          <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
          <option value="claude-3-5-sonnet">Claude 3.5 Sonnet</option>
          <option value="claude-3-opus">Claude 3 Opus</option>
          <option value="gemini-pro">Gemini Pro</option>
        </select>
      </NodeField>
      <div className="llm-chips">
        <div className="llm-chip">System</div>
        <div className="llm-chip">Prompt</div>
        <div className="llm-chip">Response</div>
      </div>
    </BaseNode>
  );
};
