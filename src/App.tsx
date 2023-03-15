import React, {useEffect, useState} from 'react';
import './App.css';
import { Outlet, useMatches } from "react-router-dom";
import Header from './components/Header';
import HomeScreen from './views/HomeScreen';


const App = () => {

  const matches = useMatches();

	const [isPodcastDetailRoute, setIsPodcastDetailRoute] = useState(false);

	useEffect(() => {
		setIsPodcastDetailRoute(matches.length > 1);
	},[matches]);

  return (
    <div className="App">

      <header className="App-header">
				<Header />
      </header>

			<div className="App-content">
				{!isPodcastDetailRoute && <HomeScreen />}
				{isPodcastDetailRoute && <Outlet />}
			</div>
    </div>
  );
}

export default App;
