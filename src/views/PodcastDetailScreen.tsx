import React, {useEffect, useState} from 'react';
import { Outlet, useMatches } from "react-router-dom";
import Episodes from '../components/Episodes';


const PodcastDetailScreen = () => {
  const matches = useMatches();

	const [isEpisodeDetailRoute, setIsEpisodeDetailRoute] = useState(false);

	useEffect(() => {
		setIsEpisodeDetailRoute(matches.length > 2);
	},[matches]);

	return (
		<div className="PodcastDetail">
			<h1>Podcast Detail</h1>
				<div className="PodCastDetail-left">
					Podcast card (TODO)
				</div>
				<div className="PodCastDetail-right">

				{!isEpisodeDetailRoute && <Episodes />}
				{isEpisodeDetailRoute && <Outlet />}

				</div>
		</div>
	);
}

export default PodcastDetailScreen;