import React from 'react';
import {useSelector} from 'react-redux';


const Header = () => {

  const loader = useSelector((state) => (state as any).loader.value)

	return (
			<div className="Header">
					<h1>Podcaster (Cabecera)</h1>
					{loader && <h3>Loading please wait ...</h3>}
			</div>
	);

};

export default Header;