import { useRef, useState } from 'react';

import { Music2, Youtube, Instagram } from 'lucide-react'
import Preview from '../components/Preview';
import AspectButton from '../components/AspectButton'
import Header from '../section/Header'

const Home = () => {

	const [source, setSource] = useState('');
	const [aspect, setAspect] = useState(0);
	const [selectedButton, setSelectedButton] = useState('Original'); // To show which button is clicked

	const sourceInputRef = useRef(null);
	const originAspect = useRef(0); // original video's aspect

	const aspectButtons = [
		{
			label: 'Original',
			aspect: originAspect.current
		},
		{
			label: '9:16',
			aspect: 9 / 16,
			icon: <Music2 size={15} />
		},
		{
			label: '16:9',
			aspect: 16 / 9,
			icon: <Youtube size={15} />
		},
		{
			label: '1:1',
			aspect: 1,
			icon: <Instagram size={15} />
		}
	];

	const handleFileChange = (event) => {
		const file = event.target.files[0];
		const url = URL.createObjectURL(file);
		//render video
		const videoEl = document.createElement('video');
		videoEl.src = url;
		videoEl.onloadedmetadata = () => {
			const videoOriginWidth = videoEl.videoWidth;
			const videoOriginHeight = videoEl.videoHeight;
			const aspect = videoOriginWidth / videoOriginHeight;
			originAspect.current = aspect; // store original aspect
			setAspect(aspect); // set original aspect as default
			setSource(url); // set source
		}
	};

	const handleChoose = () => {
		sourceInputRef.current.click();
	};

	const handleClickAspectButton = (aspect, selectedAspect) => {
		setAspect(aspect); // set aspect
		setSelectedButton(selectedAspect); // set selected aspect button
	}

	return (
		<>
			<div className='flex flex-col h-[100vh] mx-auto p-[120px] flex-grow'>
				<Header title={'Change Aspect Ratio'} />
				{
					source == "" && <div className="flex flex-col justify-center flex-grow w-full">
						<div className='flex flex-row justify-center w-full'>
							<div className='flex flex-row items-center justify-center w-[50%] h-[400px] bg-slate-300'>
								<input
									ref={sourceInputRef}
									className="hidden VideoInput_input"
									type="file"
									onChange={handleFileChange}
									accept=".mov,.mp4"
								/>
								<button className="inline-block p-2 text-lg rounded-lg bg-sky-500" onClick={handleChoose}>Select One Video From Computer</button>
							</div>
						</div>
					</div>
				}
				{
					source && <div className='flex flex-col flex-grow w-full mt-10'>
						<div className='grid grid-cols-2 gap-[120px] h-full'>
							<div className='flex flex-row w-full'>
								<Preview source={source} aspect={aspect} />
							</div>
							<div className='flex flex-row w-full'>
								<div className="flex flex-col w-full gap-10">
									<div className="text-[24px] text-black font-bold">
										Select One Aspect Ratio
									</div>
									<div className='flex flex-row w-full'>
										<div className='grid grid-cols-4 gap-3'>
											{
												aspectButtons.map((item, key) => (
													<AspectButton
														key={key}
														label={item.label}
														icon={item.icon}
														aspect={item.aspect}
														currentSelected={selectedButton}
														onChangeAspect={handleClickAspectButton}
													/>
												))
											}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				}
			</div>
		</>
	)
}

export default Home;