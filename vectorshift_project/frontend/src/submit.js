import { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({ nodes: state.nodes, edges: state.edges });

/* ── Result Modal ── */
const ResultModal = ({ result, error, onClose }) => {
  if (!result && !error) return null;
  return (
    <div className="vs-modal-overlay" onClick={onClose}>
      <div className="vs-modal" onClick={(e) => e.stopPropagation()}>
        {/* Top gradient line via ::before in CSS */}

        <div className="vs-modal-header">
          <div className={`vs-modal-icon ${error ? 'error' : 'success'}`}>
            {error ? '⚠️' : '✅'}
          </div>
          <div>
            <div className="vs-modal-title">
              {error ? 'Connection Error' : 'Pipeline Analysis'}
            </div>
            <div className="vs-modal-subtitle">
              {error ? 'Could not reach backend' : 'VectorShift · Pipeline Inspector'}
            </div>
          </div>
        </div>

        {error ? (
          <div className="vs-modal-error-msg">{error}</div>
        ) : (
          <div className="vs-modal-stats">
            <div className="vs-stat-row">
              <div className="vs-stat-label">
                <div className="vs-stat-label-icon">📦</div>
                Total Nodes
              </div>
              <div className="vs-stat-value">{result.num_nodes}</div>
            </div>
            <div className="vs-stat-row">
              <div className="vs-stat-label">
                <div className="vs-stat-label-icon">🔗</div>
                Total Edges
              </div>
              <div className="vs-stat-value">{result.num_edges}</div>
            </div>
            <div className="vs-stat-row">
              <div className="vs-stat-label">
                <div className="vs-stat-label-icon">🔄</div>
                Directed Acyclic Graph
              </div>
              <div
                className={`vs-dag-badge ${result.is_dag ? 'yes' : 'no'}`}
              >
                {result.is_dag ? 'YES — Valid DAG' : 'NO — Has Cycles'}
              </div>
            </div>
          </div>
        )}

        <button className="vs-modal-close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

/* ── Submit Button ── */
export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);
  const [loading, setLoading] = useState(false);
  const [result, setResult]   = useState(null);
  const [error, setError]     = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const res = await fetch('http://127.0.0.1:8000/pipelines/parse', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ nodes, edges }),
      });
      if (!res.ok) throw new Error(`Server responded with status ${res.status}`);
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(
        `${err.message}\n\nMake sure the backend is running:\n  uvicorn main:app --reload`
      );
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => { setResult(null); setError(null); };

  return (
    <>
      <div className="submit-bar">
        <div className="pipeline-stats">
          <div className="pipeline-stat">
            <div className="pipeline-stat-dot" style={{ background: '#10b981' }} />
            {nodes.length} node{nodes.length !== 1 ? 's' : ''}
          </div>
          <div className="pipeline-stat">
            <div className="pipeline-stat-dot" style={{ background: '#6366f1' }} />
            {edges.length} edge{edges.length !== 1 ? 's' : ''}
          </div>
        </div>
        <button
          className="submit-btn"
          onClick={handleSubmit}
          disabled={loading}
          style={{ opacity: loading ? 0.7 : 1 }}
        >
          {loading ? '⏳ Analyzing...' : '🚀 Analyze Pipeline'}
        </button>
      </div>
      <ResultModal result={result} error={error} onClose={closeModal} />
    </>
  );
};
