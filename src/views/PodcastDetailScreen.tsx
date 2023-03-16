import React, {useEffect, useState} from 'react';
import { Outlet, useMatches, useParams } from "react-router-dom";
import Episodes from '../components/Episodes';
import {fetchPodcastDetail} from '../services/data.services';
import {PodcastDetail} from '../domain/PodcastTypes';


const PodcastDetailScreen = () => {
  const matches = useMatches();
  let { podcastId } = useParams();

	const [isEpisodeDetailRoute, setIsEpisodeDetailRoute] = useState(false);

const [podcastData , setPodcastData] = useState<PodcastDetail | null>(null);

	useEffect(() => {
		setIsEpisodeDetailRoute(matches.length > 2);

		podcastId && fetchPodcastDetail(podcastId).then(response => {
			setPodcastData(response);
		}, error => {
		console.log('Error fetching podcast detail data', error);
		});

	},[matches, podcastId]);

	return (
		<div className="PodcastDetail">
			<h1>Podcast Detail</h1>
				<div className="PodCastDetail-left">
					<img src={podcastData?.artworkUrl600} alt="" width="200"/>
					<p>Name: {podcastData?.collectionName}</p>
					<p>by {podcastData?.artistName}</p>
					{podcastData?.description && <>
						<h6>Description:</h6>
						<div dangerouslySetInnerHTML={{ __html: podcastData?.description }}></div>
					</>
					}
				</div>
				<div className="PodCastDetail-right">
					{!isEpisodeDetailRoute && <Episodes data={podcastData?.episodes}/>}
					{isEpisodeDetailRoute && <Outlet />}
				</div>
		</div>
	);
}

export default PodcastDetailScreen;