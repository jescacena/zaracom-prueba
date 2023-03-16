import React, {useCallback} from 'react';
import './Episodes.css';
import {EpisodeType} from '../domain/EpisodeTypes';
import {useNavigate, useParams} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {setEpisodeSelected} from '../store/episodeSelectedSlice';

const Episodes = ({data}: {data:EpisodeType[] | undefined}) => {

  const navigate = useNavigate();
	const dispatch = useDispatch();

  let { podcastId } = useParams();

	const handleClick = useCallback((item: EpisodeType)=>{
			dispatch(setEpisodeSelected(item));
			navigate(`/podcast/${podcastId}/episode/${item.id}`);
	}, [dispatch, navigate, podcastId]);

	if(!data) {
		return <div>Loading</div>;
	}
	return (
		<div className="Episodes">
				{data && <h3>Episodes: {data.length}</h3>}
				<ul>
				{data.map((item,index) => {
					return (
						<li key={index} onClick={() => handleClick(item)}>
							{item.id} - {item.title} - {item.pubDate} - {item.duration}
						</li>
					);

				})}
				</ul>
		</div>
	);

};

export default Episodes;