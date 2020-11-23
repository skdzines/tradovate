import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'components/modal';
import { action } from 'store';

import 'sass/styles.scss';

const Page = (props) => {
	const dispatch = useDispatch();
	const modal = useSelector(state => state.view.modal);

	useEffect(() => {
		if(modal && modal.modalClosing) {
			let anim = document.querySelector('.modal');
			anim && anim.addEventListener('animationend', () => dispatch(action.view.removeModal()));
		}
	}, [modal])

	return (
		<article>
			{props.children}
			{modal ? <Modal>{modal}</Modal> : null}
		</article>
	);
}

export default Page;