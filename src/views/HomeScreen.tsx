import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {Entry} from '../domain/FeedTypes';
import {fetchTopPodcasts} from '../services/data.services';
import {hideLoader, showLoader} from '../store/loaderSlice';

import './HomeScreen';

const HomeScreen = () => {

  const navigate = useNavigate();
	const dispatch = useDispatch();

	const [podcastList, setPodcastList] = useState<Entry[]>([]);

	const handleClick = useCallback((podcast:Entry) => {
		navigate(`/podcast/${podcast.viewData.id}`);
	}, [navigate])

	useEffect(() => {
			dispatch(showLoader());
			fetchTopPodcasts().then(
				response => {
					setPodcastList(response);
				},
				error => {
					console.log('Error fetching Top popular podcast data', error);
				}).finally(() => dispatch(hideLoader()))
	}, []);

	return (
		<div className="Home">
			<h1>Most popular podcast list</h1>
			<div className="Filter">
						<h3>Cuenta {podcastList.length}</h3>
						<input type="text" placeholder="Filter podcast"/>
			</div>	
			<div className="PodcastList">
				{podcastList.map(podcast => {
				return (
					<div key={podcast.viewData.id} className="PodcastSmallCard" onClick={() => {handleClick(podcast)}}>
						<img src={podcast.viewData.image} alt="" />
						<h5>{podcast.viewData.title}</h5>
						<h5>Author: {podcast.viewData.author}</h5>
					</div>
				);
				})}
			</div>		
		</div>
	);
}

export default HomeScreen;
