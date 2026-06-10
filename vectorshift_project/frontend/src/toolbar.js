import { DraggableNode } from './draggableNode';

const NODE_DEFS = [
  { type: 'customInput',  label: 'Input',     icon: '📥', gradient: 'linear-gradient(135deg,#10b981,#059669)' },
  { type: 'customOutput', label: 'Output',    icon: '📤', gradient: 'linear-gradient(135deg,#f59e0b,#d97706)' },
  { type: 'llm',          label: 'LLM',       icon: '🤖', gradient: 'linear-gradient(135deg,#8b5cf6,#6d28d9)' },
  { type: 'text',         label: 'Text',      icon: '📝', gradient: 'linear-gradient(135deg,#3b82f6,#1d4ed8)' },
  { type: 'api',          label: 'API',       icon: '🌐', gradient: 'linear-gradient(135deg,#06b6d4,#0891b2)' },
  { type: 'filter',       label: 'Filter',    icon: '🔍', gradient: 'linear-gradient(135deg,#f43f5e,#e11d48)' },
  { type: 'transform',    label: 'Transform', icon: '⚡', gradient: 'linear-gradient(135deg,#fb923c,#ea580c)' },
  { type: 'merge',        label: 'Merge',     icon: '🔀', gradient: 'linear-gradient(135deg,#14b8a6,#0d9488)' },
  { type: 'note',         label: 'Note',      icon: '💬', gradient: 'linear-gradient(135deg,#a855f7,#9333ea)' },
];

export const PipelineToolbar = () => (
  <div className="toolbar">
    <div className="toolbar-brand">
      <div className="toolbar-logo-wrap">⚡</div>
      <div>
        <div className="toolbar-title">VectorShift</div>
        <div className="toolbar-subtitle">PIPELINE BUILDER</div>
      </div>
    </div>
    <div className="toolbar-nodes">
      {NODE_DEFS.map((n) => (
        <DraggableNode
          key={n.type}
          type={n.type}
          label={n.label}
          icon={n.icon}
          gradient={n.gradient}
        />
      ))}
    </div>
  </div>
);
