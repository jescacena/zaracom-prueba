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
		return <div></div>;
	}
	return (
		<div className="Episodes">
				{data && <h3 className="EpisodesHeader">Episodes: {data.length}</h3>}
				<ul className="EpisodesList">
						<li className="EpisodesListHeader">
							<span>Title</span><span>Date</span><span className="EpisodesListItemDuration">Duration</span>
						</li>
					{data.map((item,index) => {
						return (
							<li className="EpisodesListItem" key={index} onClick={() => handleClick(item)}>
								<span className="EpisodesListItemTitle">{item.title}</span><span>{item.pubDate}</span><span className="EpisodesListItemDuration">{item.duration}</span>
							</li>
						);

					})}
				</ul>
		</div>
	);

};

export default Episodes;