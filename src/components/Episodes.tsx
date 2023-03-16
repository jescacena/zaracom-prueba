import React from 'react';
import './Episodes.css';
import {EpisodeType} from '../domain/EpisodeTypes';

const Episodes = ({data}: {data:EpisodeType[] | undefined}) => {

	if(!data) {
		return <div>Loading</div>;
	}
	return (
		<div className="Episodes">
				{data && <h3>Episodes: {data.length}</h3>}
				<ul>
				{data.map((item,index) => {

					return (
						<li key={index}>{item.title} - {item.pubDate} - {item.duration}</li>
					);

				})}
				</ul>
		</div>
	);

};

export default Episodes;