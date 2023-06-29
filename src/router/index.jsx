import { Route, Routes } from 'react-router';
import Home from '../pages/Home';

const AppRouter = () => {
	return (
		<>
			<Routes>
				<Route path='/' element={<Home />} />
			</Routes>
		</>
	)
}

export default AppRouter;