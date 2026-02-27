export default function Modal({ title, onClose, children, className = '' }) {
  return (
    <div className="modal-overlay">
      <div className={`modal ${className}`.trim()}>
        <div className="modal-header">
          <span className="modal-title">{title}</span>
          <button onClick={onClose} className="modal-close">✕</button>
        </div>
        <div className="modal-body ps">{children}</div>
      </div>
    </div>
  );
}
