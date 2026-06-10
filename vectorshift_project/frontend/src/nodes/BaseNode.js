// BaseNode.js — Glass-morphism node abstraction

import { Handle, Position } from 'reactflow';

/**
 * BaseNode — shared wrapper for all pipeline nodes.
 *
 * Props:
 *   id        {string}    ReactFlow node id
 *   title     {string}    Header label
 *   gradient  {string}    CSS gradient string for the header background
 *   icon      {string}    Emoji / text icon shown in header
 *   inputs    {Array}     [{ id, label, style? }]  — target handles on left
 *   outputs   {Array}     [{ id, label, style? }]  — source handles on right
 *   children  {ReactNode} Body content
 *   width     {number}    Min-width in px (default 220)
 *   nodeType  {string}    data-nodetype attr for handle color theming
 */
export const BaseNode = ({
  id,
  title,
  gradient = 'linear-gradient(135deg,#7c3aed,#4f46e5)',
  icon = '⚙️',
  inputs = [],
  outputs = [],
  children,
  width = 220,
  nodeType = '',
}) => {
  return (
    <div
      className="base-node"
      style={{ minWidth: width }}
      data-nodetype={nodeType}
    >
      {/* ── Input handles (left) ── */}
      {inputs.map((inp, i) => (
        <Handle
          key={inp.id}
          type="target"
          position={Position.Left}
          id={`${id}-${inp.id}`}
          style={inp.style || {
            top: `${((i + 1) / (inputs.length + 1)) * 100}%`,
          }}
          title={inp.label}
        />
      ))}

      {/* ── Header ── */}
      <div className="base-node-header" style={{ background: gradient }}>
        <span className="base-node-icon">{icon}</span>
        <span className="base-node-title">{title}</span>
      </div>

      {/* ── Body ── */}
      <div className="base-node-body">{children}</div>

      {/* ── Output handles (right) ── */}
      {outputs.map((out, i) => (
        <Handle
          key={out.id}
          type="source"
          position={Position.Right}
          id={`${id}-${out.id}`}
          style={out.style || {
            top: `${((i + 1) / (outputs.length + 1)) * 100}%`,
          }}
          title={out.label}
        />
      ))}
    </div>
  );
};

/** Labeled form field row */
export const NodeField = ({ label, children }) => (
  <div className="node-field">
    {label && <label className="node-label">{label}</label>}
    {children}
  </div>
);
