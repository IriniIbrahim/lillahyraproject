import React, { useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

export const Auth = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loggedIn, setLoggedIn] = useState(false);


	const signIn = async () => {
		try {
			await createUserWithEmailAndPassword(auth, email, password);
			setLoggedIn(true);
		} catch (err) {
			setError(err.message);
			console.error(err);
		}
	};
	const signInWithGoogle = async () => {
		try {
			await signInWithPopup(auth, googleProvider);
			setLoggedIn(true);
		} catch (err) {
			setError(err.message);
			console.error(err);
		}
	}
	const logOut = async () => {
		try {
			await signOut(auth);
			setLoggedIn(false);
		} catch (err) {
			setError(err.message);
			console.error(err);
		}
	}
	onAuthStateChanged(auth, (user) => {
		setLoggedIn(!!user);
	});
	const signOutUser = async () => {
		try {
			await signOut(auth);
			setLoggedIn(false);
		} catch (err) {
			setError(err.message);
			console.error(err);
		}
	};
	return (
		<div>
			{loggedIn ? (
				<div>
					<p>You are signed in.</p>
					<button onClick={signOutUser}>Sign Out</button>
				</div>
			) : (
				<div>
					<input placeholder="Email..." onChange={(e) => setEmail(e.target.value)} />
					<input
						placeholder="Password..."
						type="password"
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button onClick={signIn}>Sign In</button>
					<button onClick={signInWithGoogle}>Sign in with GOOGLE </button>
					<button onclick={logOut}>Log Out</button>
				</div>
			)}
			{error && <p style={{ color: "red" }}>{error}</p>}
		</div>

	);
};
