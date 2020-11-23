import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { action } from 'store';

const SimpleMessage = (props) => {

    const dispatch = useDispatch();

    const handleCancel = () => {
        dispatch(action.view.closeModal());
    }
    return (
        <Fragment>
            <div>Are you sure you want to delete <strong>{props.firstName} {props.lastName}</strong></div>
            <div className="controls">
                <button onClick={props.confirm}>Confirm</button>
                <button onClick={handleCancel} className="secondary">Cancel</button>
            </div>
        </Fragment>
    )
}

export default SimpleMessage;