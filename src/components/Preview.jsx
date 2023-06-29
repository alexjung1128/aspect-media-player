import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const Preview = ({ source, aspect }) => {
	const videoPanelWrapRef = useRef(null);
	const [sourceWidth, setSourceWidth] = useState(0);
	const [sourceHeight, setSourceHeight] = useState(0);

	useEffect(() => {
		// Get initial width and heigh of video-panel Wrap
		const videoPanelWrap = videoPanelWrapRef.current;
		const maxWidth = videoPanelWrap.offsetWidth;
		const maxHeight = videoPanelWrap.offsetHeight;

		// Set video panel's width and height
		let tempSourceWidth = 0;
		let tempSourceHeight = 0;

		if (aspect > 1) {
			tempSourceWidth = maxWidth;
			tempSourceHeight = tempSourceWidth / aspect;
		}
		if (aspect < 1) {
			tempSourceHeight = maxHeight;
			tempSourceWidth = tempSourceHeight * aspect;
		}
		if (aspect == 0) {
			tempSourceHeight = 'auto';
			tempSourceWidth = 'auto';
		}
		if (aspect == 1) {
			tempSourceWidth = maxWidth > maxHeight ? maxHeight : maxWidth;
			tempSourceHeight = tempSourceWidth;
		}
		setSourceWidth(tempSourceWidth);
		setSourceHeight(tempSourceHeight);
	}, [aspect])

	return (
		<>
			<div className='flex flex-row justify-start w-full h-full' ref={videoPanelWrapRef}>
				<div className='flex flex-row items-center justify-center bg-gray-400' style={{ width: sourceWidth, height: sourceHeight }}>
					<video
						controls
						src={source}
						style={(aspect >= 1) ? { height: '100%' } : { width: '100%' }}
					/>
				</div>
			</div>
		</>
	)
}

Preview.propTypes = {
	source: PropTypes.string,
	aspect: PropTypes.number
}

export default Preview;