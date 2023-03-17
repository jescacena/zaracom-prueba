import React from 'react';
import {useSelector} from 'react-redux';
import {EpisodeType} from '../domain/EpisodeTypes';

import './EpisodeDetailScreen.css';

const EpisodeDetailScreen = () => {

  const episodeSelected: EpisodeType = useSelector((state) => (state as any).episodeSelected.value)

	return (
		<div className="EpisodeDetail">
				<h3 className="EpisodeDetailTitle">{episodeSelected.title}</h3>
				{episodeSelected?.description 
					&& 
				<div className="EpisodeDetailDescription" dangerouslySetInnerHTML={{ __html: episodeSelected?.description }}></div>}
				<audio
						className="EpisodeDetailPlayer" 
						controls
						src={episodeSelected.audioUrl}>
								<a href={episodeSelected.audioUrl}>
										Download audio
								</a>
				</audio>
		</div>
	);
}

export default EpisodeDetailScreen;