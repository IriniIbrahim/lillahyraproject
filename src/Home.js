
import React from 'react';
import Carousel from './components/Carousel';
import Testmonials from './components/Testmonials';
import Awards from './components/Awards';
import Subscribe from './components/Subscribe';

function Home() {
	return (
		<>
			<Carousel />
			<Testmonials />
			<Awards />
			<Subscribe />
		</>
	);
}

export default Home;
