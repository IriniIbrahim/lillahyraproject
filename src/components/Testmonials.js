import React, { } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Carousel } from "react-bootstrap";
import Ornament from "../assets/Ornament.svg"
import sara from "../assets/sara.svg"
import emily from "../assets/emily.png"
import leo from "../assets/Leo.svg"

import "./Testmonials.css";
const cardData = [
	{
		photo: sara,
		name: 'Sara M.',
		description: 'Mom, Traveler',
		paragraph: 'Renting baby items from this platform made my travel experience with my little one stress-free. The stroller and car seat were in perfect condition, and the rental process was so smooth. Highly recommended!'
	},
	{
		photo: leo,
		name: 'Leo R.',
		description: 'First-Time Dad',
		paragraph: 'As a new parent, I was hesitant about spending a fortune on baby gear that my child would quickly outgrow. This platform allowed me to rent high-quality items at a fraction of the cost. It is a game- changer for budget - conscious parents!'
	},
	{
		photo: emily,
		name: 'Emily R.',
		description: 'Mother of two kids',
		paragraph: 'Listing my baby items for rent on this platform was incredibly easy. The user-friendly interface made it a breeze to create appealing listings, set pricing, and manage reservations. Plus, the support team was always responsive to my questions.'
	}
];
function Testmonials() {
	return (
		<>
			<div className='TestmonialWrapper'>
				<h1 style={{ color: "#5C2E89" }}>Our Happy Customers</h1>

				<Carousel interval={900} fade className='CarouselTest'>
					{cardData.map((card, index) => (
						<Carousel.Item className='CarouselItemTest' key={index}>
							<div className='Tcard'>
								<img src={Ornament} alt="Ornament" className='Ornamentpos1' />
								<img src={Ornament} alt="Ornament" className='Ornamentpos2' />
								<img src={card.photo} alt={card.name} className='CardPhoto' />
								<div className='CardText'>
									<h3 className='CardName'>{card.name}</h3>
									<h5 className='CardDescription'>{card.description}</h5>
									<p className='CardParagraph'>{card.paragraph}</p>
								</div>
							</div>
						</Carousel.Item>
					))}
				</Carousel >
			</div>
		</>
	);
}

export default Testmonials;