import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { action } from 'store';
import closeIcon from 'assets/images/close-icon.svg';

const Modal = (props) => {
    const dispatch = useDispatch();
    const { modalClosing } = useSelector(state => state.view.modal);

	const handleClose = (event) => {
        event.preventDefault();
        dispatch(action.view.closeModal());
    }

    return (
        <Fragment>
            <div className={`overlay ${modalClosing ? 'close-modal' : ''}`}></div>
            <div className={`modal ${modalClosing ? 'close-modal' : ''}`}>
                <a href="#" className="close" onClick={handleClose} ><img src={closeIcon} /></a>
                <h1>{props.children.props.title}</h1>
                <div className="content">
                    {props.children}
                </div>
            </div>
        </Fragment>
    );
}

export default Modal;