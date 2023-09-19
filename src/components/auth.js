import { googleProvider } from "../config/firebase";
import { auth } from '../config/firebase';
import { getFirestore, doc, setDoc } from "firebase/firestore"; // Updated imports
import svg from "../assets/7450-removebg-preview.png";

import 'firebase/database'
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
} from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./auth.css"
export const Auth = ({ isRegister }) => {
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [userName, setUserName] = useState("");
	const [location, setLocation] = useState("");
	const [telephoneNumber, setTelephoneNumber] = useState("");
	const [error, setError] = useState(null);

	const handleRegister = async () => {
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			const user = userCredential.user;

			const firestore = getFirestore();

			await setDoc(doc(firestore, "Users", user.uid), {
				UserName: userName,
				Location: location,
				TelephoneNumber: telephoneNumber,
				userId: auth?.currentUser?.uid,
				email: auth?.currentUser?.email,
			});

			navigate("/profile");
		} catch (err) {
			setError(err.message);
			console.error(err);
		}
	};

	const signIn = async () => {
		try {
			await signInWithEmailAndPassword(auth, email, password);
			navigate("/profile");
		} catch (err) {
			setError(err.message);
			console.error(err);
		}
	};

	const signInWithGoogle = async () => {
		try {
			await signInWithPopup(auth, googleProvider);
			navigate("/profile");
		} catch (err) {
			setError(err.message);
			console.error(err);
		}
	};

	const logout = async () => {
		try {
			await signOut(auth);
		} catch (err) {
			setError(err.message);
			console.error(err);
		}
	};

	return (
		<>
			<div className="Auth">
				<input
					placeholder="Email..."
					onChange={(e) => setEmail(e.target.value)} className="imputfield"
				/>
				<input
					placeholder="Password..."
					type="password"
					onChange={(e) => setPassword(e.target.value)} className="imputfield"
				/>

				{isRegister && (
					<>
						<input
							placeholder="User Name..."
							onChange={(e) => setUserName(e.target.value)} className="imputfield"
						/>
						<input
							placeholder="Location..."
							onChange={(e) => setLocation(e.target.value)} className="imputfield"
						/>
						<input
							placeholder="Telephone Number..."
							onChange={(e) => setTelephoneNumber(e.target.value)} className="imputfield"
						/>
					</>
				)}
				<div className="btnwrapper">
					<button onClick={isRegister ? handleRegister : signIn} className="Autbtn">
						{isRegister ? "Register" : "Sign In"}
					</button>
					{/* <button
				onClick={isRegister ? navigate("../register") : navigate("/login")}
				className="Autbtn"
			>
				{isRegister ? "Already have an account? Login here." : "Don't have an account? Register here."}
			</button> */}

					<button onClick={signInWithGoogle} className="Autbtn">Sign In With Google</button>
					<button onClick={logout} className="Autbtn">Logout</button>

					{error && <p style={{ color: "#B71C1C", fontWeight: "700", fontSize: "18px" }}>{error}</p>}
				</div>
			</div>
			<img src={svg} alt="family" className="Family" />
		</>
	);
};
