import React, { useEffect, useState } from "react";
import { auth, db } from "./config/firebase";
import { doc, getDoc } from "firebase/firestore";
import "./Profile.css";
import hi from "./assets/profile.png"
import leo from "./assets/Leo.svg"
import ReactLoading from 'react-loading';
import { Link } from 'react-router-dom';

function Profile() {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
			if (authUser) {
				const email = authUser.email;

				const userDocRef = doc(db, "Users", authUser.uid);

				try {
					const docSnapshot = await getDoc(userDocRef);

					if (docSnapshot.exists()) {
						const userData = docSnapshot.data();
						setUser({
							id: authUser.uid,
							email: email,
							userName: userData.UserName,
							location: userData.Location,
							telephoneNumber: userData.TelephoneNumber,
						});
					}
				} catch (error) {
					console.error("Error fetching user document:", error);
				}
			} else {
				setUser(null);
			}
		});

		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<div className="ProfileWrapper">
			<div className="ProfileBox">
				<img src={hi} className="ProfileImg" alt="" />

				<div className="ProfileBoxWrap">

					{user ? (
						<>
							<div>
								<img src={leo} className="ProfilePic" alt="Leo" />
							</div>
							<div>
								<h2 style={{
									color: "#d0aef3", fontWeight: "700", marginBottom: "20px"
								}}>Hi {user.userName}</h2>
								<p style={{ color: "#fff" }}>
									Email: <span style={{ fontWeight: 'bold', color: '#fff' }}>{user.email}</span>
								</p>
								<p style={{ color: "#fff" }}>
									User Name: <span style={{ fontWeight: 'bold', color: '#fff' }}>{user.userName}</span>
								</p>
								<p style={{ color: "#fff" }}>
									Location: <span style={{ fontWeight: 'bold', color: '#fff' }}>{user.location}</span>
								</p>
								<p style={{ color: "#fff" }}>
									Telephone Number: <span style={{ fontWeight: 'bold', color: '#fff' }}>{user.telephoneNumber}</span>
								</p>

							</div>
						</>
					) : (

						<div className="loadingwrapper">
							<ReactLoading
								type="spinningBubbles" // Use it as a string
								color="#DF6BA8"
								height={'15%'}
								width={'15%'}
							/>
							<Link to="/login" className="lognbtnfromprofile">Login First</Link>
						</div>
					)}
				</div>
			</div>
		</div >
	);
}

export default Profile;
