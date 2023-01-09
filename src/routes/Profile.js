import { authService, dbService } from "fbase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

const Profile = ({ refreshUser, userObj }) => {
	const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
	const history = useHistory();
	const onLogOutClick = () => {
		authService.signOut();
		history.push("/");
	};
	const getMyNweets = async () => {
		const q = query(collection(dbService, "nweets"), where("createId", "==", userObj.uid), orderBy("createAt"));
		const querySnapshot = await getDocs(q);
		// querySnapshot.forEach((doc) => {
		//   console.log(doc.id, "=>", doc.data());
		// });
	};
	const onChange = (event) => {
		const {
			target: { value },
		} = event;
		setNewDisplayName(value);
	};
	const onSubmit = async (event) => {
		event.preventDefault();
		if (userObj.displayName !== newDisplayName) {
			await userObj.updateProfile({
				displayName: newDisplayName,
			});
			refreshUser();
		}
	};
	useEffect(() => {
		getMyNweets();
	}, []);
	return (
		<div className="container">
			<form onSubmit={onSubmit} className="profileForm">
				<input type="text" autoFocus placeholder="Display name" onChange={onChange} className="formInput" />
				<input
					type="submit"
					value="Update Profile"
					className="formBtn"
					style={{
						marginTop: 10,
					}}
				/>
			</form>
			<span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
				Log Out
			</span>
		</div>
	);
};
export default Profile;
