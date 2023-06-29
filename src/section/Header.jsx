import PropTypes from 'prop-types';

const Header = ({ title }) => {
	return (
		<>
			<div className="flex text-black">
				<h1 className="text-[32px] font-bold">{title}</h1>
			</div>
		</>
	)
}

Header.propTypes = {
	title: PropTypes.string
}

export default Header;