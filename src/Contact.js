import React from 'react';
import bird from "./assets/bird.png"
import "./Contact.css";
function Contact() {
	return (
		<>
			<div className="ContactUsWrapper">
				<img src={bird} className='ContactUsImg' alt='Bird' />
				<div className='ContactUsbox'>
					<h2 style={{
						color: "#d0aef3", fontWeight: "700", marginBottom: "50px"
					}}>Contact Us</h2>
					<input
						placeholder="Your Email..." className="ConactUsinputfield" />
					<input
						placeholder="Subject..." className="ConactUsinputfield"
					/>
					<textarea
						placeholder="Message..." className="ConactUsinputfield"
					/>
					<button className="ContactUsbtn">SUbmit</button>
				</div>
			</div>
		</>
	);
}

export default Contact;
