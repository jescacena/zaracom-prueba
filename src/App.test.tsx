import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import {createMemoryRouter, RouterProvider} from 'react-router';
import PodcastDetailScreen from './views/PodcastDetailScreen';
import EpisodeDetailScreen from './views/EpisodeDetailScreen';

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

test('renders learn react link', () => {

  const router = createMemoryRouter(routes, {
    initialEntries: ["/"],
    initialIndex: 1,
  });

  render(<RouterProvider router={router} />);
  
	const h1Element = screen.getByText(/Podcaster/i);
  expect(h1Element).toBeInTheDocument();
});
