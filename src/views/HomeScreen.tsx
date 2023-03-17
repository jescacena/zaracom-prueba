import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {Entry} from '../domain/FeedTypes';
import {fetchTopPodcasts} from '../services/data.services';
import {hideLoader, showLoader} from '../store/loaderSlice';

import './HomeScreen.css';

let initialPodcastList: Entry[] = [];

const HomeScreen = () => {

  const navigate = useNavigate();
	const dispatch = useDispatch();

	const [podcastList, setPodcastList] = useState<Entry[]>([]);

	const [filter, setFilter] = useState<string>();

	const handleFilterChange = useCallback((event: any) => {
			const newFilter = event.target.value;
			setFilter(newFilter);
			if (newFilter) {
				const filteredResult = initialPodcastList.filter(item => {
					return item.viewData.title.indexOf(newFilter) >= 0 || item.viewData.author.indexOf(newFilter) >= 0
				});
				setPodcastList([...filteredResult])
			} else {
				setPodcastList([...initialPodcastList])
			}
	}, []);

	const handleClick = useCallback((podcast:Entry) => {
		navigate(`/podcast/${podcast.viewData.id}`);
	}, [navigate])

	useEffect(() => {
			dispatch(showLoader());
			fetchTopPodcasts().then(
				response => {
					setPodcastList(response);
					initialPodcastList = [...response];
				},
				error => {
					console.log('Error fetching Top popular podcast data', error);
				}).finally(() => dispatch(hideLoader()))
	}, [dispatch]);

	return (
		<div className="Home">
			<div className="ListHeader">
						<div className="Filter">
									<h3 className="Count">{podcastList.length}</h3>
									<input
											className="FilterInput"
											type="text"
											value={filter || ''}
											onChange={handleFilterChange}
											placeholder="Filter podcast..."/>
						</div>	
			</div>
			<div id="podcast-list" className="PodcastList">
				{podcastList && podcastList.map(podcast => {
				return (
					<div key={podcast.viewData.id} className="PodcastSmallCard" onClick={() => {handleClick(podcast)}}>
						<img className="image" src={podcast.viewData.image} alt="" />
						<p className="title">{podcast.viewData.title}</p>
						<p className="author">Author: {podcast.viewData.author}</p>
					</div>
				);
				})}
			</div>		
		</div>
	);
}

export default HomeScreen;
