import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import {Provider} from 'react-redux';
import store from './store/store';
import routes from './routes';

const router = createBrowserRouter(routes);

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
