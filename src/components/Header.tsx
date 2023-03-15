import React from 'react';


const Header = () => {

	return (
			<div className="Header">
					<h1>Podcaster (Cabecera)</h1>
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