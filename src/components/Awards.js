import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Sustainability from "../assets/planet-earth.png"
import piggybank from "../assets/piggy-bank.png"
import care from "../assets/support.png"
import "./Awards.css";

function Awards() {
	return (
		<>
			<div className='AwardsContainer'>
				<div className='AwardsContainerItem'>
					<img src={Sustainability} style={{ width: "100px" }} alt="Sustainability"></img>
					<div className='AwardsText'>
						<h4>Eco-Friendly</h4>
						<p>Choose sustainability with Lilla Hira Rentals – reducing waste and embracing reusable baby essentials.</p>
					</div>
				</div>
				<div className='AwardsContainerItem'>
					<img src={piggybank} style={{ width: "100px" }} alt="Piggy Bank"></img>
					<div className='AwardsText'>
						<h4>Smart Savings for Parents</h4>
						<p>Watch your budget grow while offering the best for your baby through affordable rentals on Lilla Hira.</p>
					</div>
				</div>
				<div className='AwardsContainerItem'>
					<img src={care} style={{ width: "100px" }} alt="Care"></img>
					<div className='AwardsText'>
						<h4>Building a Caring Community</h4>
						<p>Join hands with fellow parents, forming a supportive network of caregivers through sharing on Lilla Hira Rentals.</p>
					</div>
				</div>
			</div>
		</>
	);
}

export default Awards;
