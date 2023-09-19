import React from 'react';
import { Auth } from "./components/auth";
import { useNavigate } from "react-router-dom";


import "./components/auth.css"
function Login() {
	const navigate = useNavigate();

	return (
		<>

			<div className='AuthWrapper'>

				<div className='AuthBox'>
					<h2 style={{
						color: "#d0aef3", fontWeight: "700", marginBottom: "90px"
					}}>Login</h2>
					<Auth isRegister={false} />
					<button
						className="Autbtn1"
						onClick={() =>
							navigate("/register")
						}
					>
						Don't have an account?
						Register here.
					</button>
				</div>

			</div >

		</>
	);
}

export default Login;
