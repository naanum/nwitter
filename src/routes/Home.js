import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";
import { authService, dbService } from "fbase";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
	const [nweets, setNweets] = useState([]);

	useEffect(() => {
		const unsubscribe = dbService.collection("nweets").onSnapshot((snapshot) => {
			const nweetArray = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			setNweets(nweetArray);
		});

		onAuthStateChanged(authService, (user) => {
			if (user == null) {
				unsubscribe();
			}
		});
	}, []);

	return (
		<div className="container">
			<NweetFactory userObj={userObj} />
			<div style={{ marginTop: 30 }}>
				{nweets.map((nweet) => (
					<Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.createId === userObj.uid} />
				))}
			</div>
		</div>
	);
};
export default Home;
