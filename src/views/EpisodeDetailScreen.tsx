import React from 'react';
import {useSelector} from 'react-redux';
import {EpisodeType} from '../domain/EpisodeTypes';

import './EpisodeDetailScreen';

const EpisodeDetailScreen = () => {

  const episodeSelected: EpisodeType = useSelector((state) => (state as any).episodeSelected.value)

	return (
		<div className="EpisodeDetailScreen">
				<h3>{episodeSelected.title}</h3>
				{episodeSelected?.description && <div dangerouslySetInnerHTML={{ __html: episodeSelected?.description }}></div>}
				<audio
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