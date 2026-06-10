import { useState, useEffect, useRef } from 'react';
import { Handle, Position } from 'reactflow';

// Extract {{ varName }} patterns — valid JS identifiers only
const extractVariables = (text) => {
  const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
  const vars = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (!vars.includes(match[1])) vars.push(match[1]);
  }
  return vars;
};

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const textareaRef = useRef(null);
  const variables = extractVariables(currText);

  // Auto-resize height
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = ta.scrollHeight + 'px';
  }, [currText]);

  // Dynamic width based on longest line
  const lines = currText.split('\n');
  const longestLine = Math.max(...lines.map((l) => l.length), 10);
  const dynWidth = Math.max(220, Math.min(longestLine * 8 + 48, 520));

  return (
    <div
      className="base-node"
      style={{ minWidth: dynWidth }}
      data-nodetype="text"
    >
      {/* Variable handles — left side */}
      {variables.map((v, i) => (
        <Handle
          key={v}
          type="target"
          position={Position.Left}
          id={`${id}-${v}`}
          style={{ top: `${((i + 1) / (variables.length + 1)) * 100}%` }}
          title={v}
        />
      ))}

      {/* Header */}
      <div
        className="base-node-header"
        style={{ background: 'linear-gradient(135deg,#3b82f6,#1d4ed8)' }}
      >
        <span className="base-node-icon">📝</span>
        <span className="base-node-title">Text</span>
      </div>

      {/* Body */}
      <div className="base-node-body">
        {variables.length > 0 && (
          <div className="text-node-vars">
            {variables.map((v) => (
              <span key={v} className="var-badge">
                {`{{${v}}}`}
              </span>
            ))}
          </div>
        )}
        <label className="node-label">Content</label>
        <textarea
          ref={textareaRef}
          className="node-textarea"
          value={currText}
          onChange={(e) => setCurrText(e.target.value)}
          rows={1}
          placeholder="Enter text or use {{variable}} syntax..."
        />
      </div>

      {/* Output handle — right */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
      />
    </div>
  );
};
