import React from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import './Header.css';

const Header = () => {

  const loader = useSelector((state) => (state as any).loader.value);
	const navigate = useNavigate();

	return (
			<div className="Header">
					<h1 onClick={() => navigate("/")}>Podcaster</h1>
					{loader && <span className="loader"></span>}
			</div>
	);

};

export default Header;