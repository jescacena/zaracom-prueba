import React from 'react';
import {useSelector} from 'react-redux';


const Header = () => {

  const loader = useSelector((state) => (state as any).loader.value)

	return (
			<div className="Header">
					<h1>Podcaster (Cabecera)</h1>
					{loader && <h3>Loading please wait ...</h3>}
					<ul>
						<li>
							<a href={`/`}>Home</a>
						</li>
						<li>
							<a href={`/podcast/1`}>Podcast detail</a>
						</li>
						<li>
							<a href={`/podcast/1/episode/2`}>Episode detail</a>
						</li>
					</ul>
			</div>
	);

};

export default Header;