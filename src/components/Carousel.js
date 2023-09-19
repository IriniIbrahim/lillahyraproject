import React, { } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Carousel } from "react-bootstrap";
import img1 from "../assets/1.jpg";
import img2 from "../assets/2.jpg";
import img3 from "../assets/3.jpg";
import "./Carousel.css";
import { Link } from 'react-router-dom';

function CarouselComponent() {
	return (
		<>
			<div className='PageWrapper'>
				<Carousel interval={900} fade>
					<Carousel.Item>
						<img className="d-block w-100" src={img1} alt="First slide" />
						<Carousel.Caption className="CarouselCaption">
							<h3>Rent Out Your Baby Products</h3>
							<p>Turn your unused baby items into extra income by listing them on Lilla Hira Rentals, fostering a sustainable cycle of sharing among parents.</p>
							<div className='btnwrapper'>
								<Link to="/products" className="getstrtbtn">Search Products</Link>
								<Link to="/createproduct" className="getstrtbtn">Create Products</Link>
							</div>
						</Carousel.Caption>
					</Carousel.Item>
					<Carousel.Item>
						<img className="d-block w-100" src={img2} alt="Second slide" />
						<Carousel.Caption className="CarouselCaption">
							<h3>Travel without heavy bags</h3>
							<p>Have a stress-free holiday without lugging around lots of stuff. You can find the baby gear you need wherever and whenever you want.</p>
							<div className='btnwrapper'>
								<Link to="/products" className="getstrtbtn">Search Products</Link>
								<Link to="/createproduct" className="getstrtbtn">Create Products</Link>
							</div>
						</Carousel.Caption>
					</Carousel.Item>
					<Carousel.Item>
						<img className="d-block w-100" src={img3} alt="Third slide" />
						<Carousel.Caption className="CarouselCaption">
							<h3>Parent-to-parent sharing</h3>
							<p>Most of our providers are parents just like you, and the points you care about for your little one are also important for our providers.</p>
							<div className='btnwrapper'>
								<Link to="/products" className="getstrtbtn">Search Products</Link>
								<Link to="/createproduct" className="getstrtbtn">Create Products</Link>
							</div>
						</Carousel.Caption>
					</Carousel.Item>
				</Carousel>
			</div>
		</>
	);
}

export default CarouselComponent;
