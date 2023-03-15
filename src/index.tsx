import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import App from './App';
import PodcastDetailScreen from './views/PodcastDetailScreen';
import EpisodeDetailScreen from './views/EpisodeDetailScreen';

const router = createBrowserRouter([
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
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
		<RouterProvider router={router} />  
	</React.StrictMode>
);
