import React from 'react';

import logoImg from '../../../images/logoSizeM.webp';

import './footer.css';

function FootBar() {
	return (
		<div id="bottomBar">
			<img className="footerLogo" src={logoImg} alt="" />
			<div>© 2022-25 (V 1.0)</div>
			<div>Developed by Adarsh Suman</div>
		</div>
	);
}

export default FootBar;
