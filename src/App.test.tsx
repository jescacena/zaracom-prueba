import React from 'react';
import { render, screen, queryByAttribute } from '@testing-library/react';
import {createMemoryRouter, RouterProvider} from 'react-router';
import {Provider} from 'react-redux';
import store from './store/store';
import routes from './routes';

window.scrollTo = jest.fn();

const getById = queryByAttribute.bind(null, 'id');
const getByClass = queryByAttribute.bind(null, 'class');

let router:any = null;

let dom:any;

const myTestRender = () => {
  dom = render(
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>);
}

beforeEach(()=> {
  router = createMemoryRouter(routes, {
    initialEntries: ["/"],
    initialIndex: 1,
  });

});

test('renders logo', () => {
	myTestRender();
	const h1Element = screen.getByText(/Podcaster/i);
  expect(h1Element).toBeInTheDocument();
});

test('renders a non empty podcast list', () => {
	myTestRender();
	const firstResult = getByClass(dom.container, 'PodcastSmallCard');
  expect(firstResult).toBeDefined();
});
