import React, {useCallback, useEffect, useState} from 'react';
import { Outlet, useMatches, useNavigate, useParams } from "react-router-dom";
import Episodes from '../components/Episodes';
import {fetchPodcastDetail} from '../services/data.services';
import {PodcastDetail} from '../domain/PodcastTypes';
import {useDispatch} from 'react-redux';
import {hideLoader, showLoader} from '../store/loaderSlice';
import './PodcastDetailScreen.css';


const PodcastDetailScreen = () => {
  const matches = useMatches();
	const dispatch = useDispatch();
	const navigate = useNavigate();
  let { podcastId } = useParams();

	const [isEpisodeDetailRoute, setIsEpisodeDetailRoute] = useState(false);

	const [podcastData , setPodcastData] = useState<PodcastDetail | null>(null);

	const handleClick = useCallback(()=> {
		navigate(`/podcast/${podcastId}`);
	},[]);

	useEffect(() => {
		setIsEpisodeDetailRoute(matches.length > 2);

		if(podcastId) {
			dispatch(showLoader());

			fetchPodcastDetail(podcastId).then(
				response => {
					setPodcastData(response);
				}, 
				error => {
					console.log('Error fetching podcast detail data', error);
				}
			).finally(() => dispatch(hideLoader()));
		}

	},[dispatch, matches, podcastId]);

	return (
		<div className="PodcastDetail">
				<div className="PodCastDetail-left">
					<div className="PodcastLargeCard" onClick={handleClick}>
							<img className="PodcastLargeCardImage" src={podcastData?.artworkUrl600} alt="" width="200"/>

							<div className="PodcastLargeCardCenter">
								<p className="PodcastLargeCardName">{podcastData?.collectionName}</p>
								<p className="PodcastLargeCardAuthor">by {podcastData?.artistName}</p>
							</div>

							{podcastData?.description 
								&& 
								<div className="PodcastLargeCardDescription">
									<h5 className="PodcastLargeCardDescriptionHeader">Description:</h5>
									<div className="PodcastLargeCardAuthor" dangerouslySetInnerHTML={{ __html: podcastData?.description }}></div>
								</div>
							}
					</div>
				</div>
				<div className="PodCastDetail-right">
					{!isEpisodeDetailRoute && <Episodes data={podcastData?.episodes}/>}
					{isEpisodeDetailRoute && <Outlet />}
				</div>
		</div>
	);
}

export default PodcastDetailScreen;