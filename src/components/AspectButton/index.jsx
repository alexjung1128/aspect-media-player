import { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './style.css';

const AspectButton = ({ label, aspect, icon, onChangeAspect, currentSelected }) => {

	const [previewWidth, setPreviewWidth] = useState(0);
	const [previewHeight, setPreviewHeight] = useState(0);
	const previeWrapRef = useRef(null);
	const previewRef = useRef(null);

	const handleClick = () => {
		onChangeAspect(aspect, label)
	}

	useEffect(() => {
		// Generate a small preview of video-panel preview
		const maxLen = previeWrapRef.current.offsetWidth - 20;
		let tempWidth = maxLen;
		let tempHeight = maxLen;
		if (aspect > 1) {
			tempWidth = maxLen;
			tempHeight = tempWidth / aspect;
		}
		if (aspect < 1) {
			tempHeight = maxLen;
			tempWidth = tempHeight * aspect;
		}
		if (aspect == 0) {
			tempWidth = maxLen;
			tempHeight = maxLen;
		}
		setPreviewWidth(tempWidth);
		setPreviewHeight(tempHeight);
	}, [aspect])

	return (
		<>
			<div className={"aspect_button gap-4 " + (currentSelected == label ? 'active' : '')} onClick={handleClick}>
				<div className="flex flex-col items-center justify-end flex-grow" ref={previeWrapRef}>
					<div className={'block bg-gray-400 border-[1px] border-gray-500 ' + (label == 'Original' ? 'border-dashed' : 'border-solid')} ref={previewRef} style={{ width: previewWidth, height: previewHeight }} />
				</div>
				<div className="flex items-center justify-center gap-1 font-bold text-black">
					{icon}
					{label}
				</div>
			</div>
		</>
	)
}

AspectButton.propTypes = {
	label: PropTypes.string,
	aspect: PropTypes.number,
	icon: PropTypes.element,
	onChangeAspect: PropTypes.func,
	currentSelected: PropTypes.string
}

export default AspectButton;