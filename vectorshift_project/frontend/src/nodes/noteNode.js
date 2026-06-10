import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const NoteNode = ({ id, data }) => {
  const [note, setNote] = useState(data?.note || '');

  return (
    <BaseNode
      id={id}
      title="Note"
      gradient="linear-gradient(135deg,#a855f7,#9333ea)"
      icon="💬"
      nodeType="note"
      width={200}
    >
      <textarea
        className="node-textarea"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={4}
        placeholder="Add a note or comment..."
        style={{ resize: 'vertical', minHeight: 80, overflow: 'auto' }}
      />
    </BaseNode>
  );
};
