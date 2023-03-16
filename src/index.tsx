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
import {Provider} from 'react-redux';
import store from './store/store';

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
		<Provider store={store}>
			<RouterProvider router={router} />  
		</Provider>
	</React.StrictMode>
);
