import React from 'react';

export default function Modal({ show, onClose, title, body, onConfirm ,buttonText}) {
    if (!show) return null; // Don't render if not visible

    return (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{title}</h5>
                        
                    </div>
                    <div className="modal-body">
                        {body}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={onConfirm} aria-label="Close">{buttonText}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
