import React from "react";
import { Auth } from "./components/auth";
import "./components/auth.css"
import { useNavigate } from "react-router-dom";

function Register() {
	const navigate = useNavigate();

	return (

		<div className='AuthWrapper'>
			<div className='AuthBox'>
				<h2 style={{
					color: "#d0aef3", fontWeight: "700", marginBottom: "90px"
				}}>Register</h2>
				<Auth isRegister={true} />
				<button
					className="Autbtn1"
					onClick={() =>
						navigate("/login")
					}
				>
					Already have an account? Login
					here.
				</button>
			</div>
		</div >
	);
}

export default Register;