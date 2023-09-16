import React from "react";
import { Link } from "react-router-dom";
import { faSquareFacebook, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './Footer.css';
import logo from "../assets/Logo2.png"; // Import your logo

function Footer() {
	return (
		<section>
			<footer className="top">
				<div className="links">
					<div className="links-column">
						<h2>Get Started</h2>
						<Link to="/" className="links-link"> Contact Us </Link>
						<Link to="/" className="links-link"> How it Works </Link>
						<Link to="/" className="links-link"> FAQs </Link>
					</div>
					<div className="links-column">
						<h2>Resources</h2>
						<p>API</p>
						<p>Visibility</p>
						<p>Accessibility</p>
						<p>Community</p>
						<p>Marketplace</p>
					</div>
					<div className="links-column socials-column">
						<h2>Social Media</h2>
						<p>
							Follow us on social media to find out the latest updates on our
							progress.
						</p>
						<div className="socials">
							<a href="/" ><FontAwesomeIcon icon={faSquareFacebook} flip className="fb" /></a>
							<a href="/" ><FontAwesomeIcon icon={faInstagram} flip className="ins" /></a>
							<a href="/" ><FontAwesomeIcon icon={faLinkedin} flip className="linkd" /></a>
						</div>
					</div>
					<div className="links-column">
						<Link to="/" className="links-link"><img src={logo} alt="Logo" style={{ width: "100px" }} /></Link>
					</div>
				</div>
			</footer>
			<footer className="bottom">
				<p className="copyright">© 2023 All rights reserved</p>
				<div className="legal">
					<p> License </p>
					<p> Terms </p>
					<p> Privacy </p>
				</div>
			</footer>
		</section>
	);
}

export default Footer;
