import React from 'react';
import App from './App';
import EpisodeDetailScreen from './views/EpisodeDetailScreen';
import PodcastDetailScreen from './views/PodcastDetailScreen';

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "podcast/:podcastId",
        element: <PodcastDetailScreen />,
				children: [
					{
						path: "episode/:episodeId",
        		element: <EpisodeDetailScreen />,
					}
				]
      },
    ],
  },
];

export default routes;