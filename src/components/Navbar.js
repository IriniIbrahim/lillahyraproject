import logo from "../assets/Logo.svg";
import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { BurgerClose } from "react-burger-icons";
import './Navbar.css';

function Navbar() {
	const [click, setClick] = useState(false);

	const handleClick = () => setClick(!click);
	const [isClosed, setIsClosed] = useState(false);

	return (
		<>
			<nav className="navbar">
				<div className="nav-container">

					<NavLink to="/" className="nav-logo">
						<img src={logo} alt="Lilla Hyra"></img>
					</NavLink>
					<ul className={click ? "nav-menu active" : "nav-menu"}>
						<li className="nav-item">
							<NavLink to="/" className="nav-links" onClick={handleClick}> Home </NavLink>
						</li>
						<li className="nav-item">
							<NavLink

								to="/products"
								className="nav-links"
								onClick={handleClick}
							>
								Products
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink

								to="/blog"
								className="nav-links"
								onClick={handleClick}
							>
								Blog
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink

								to="/contact"
								className="nav-links"
								onClick={handleClick}
							>
								Contact Us
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink

								to="/login"
								className="nav-links"
								onClick={handleClick}
							>
								login
							</NavLink>
						</li>
					</ul>
					<div className="nav-icon" onClick={handleClick}>
						<button
							onClick={() => setIsClosed(!isClosed)}
							className="nav-icon-button"
						>
							<BurgerClose isClosed={isClosed} />
						</button>
					</div>
				</div>
			</nav >
			<Outlet />

		</>
	);
}

export default Navbar;