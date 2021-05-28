import React from 'react';
import {Link} from 'react-router-dom';

//Footer used in each page of the website
function Footer(){
	return(
	<footer>
		<ul>
		   <li><Link to="" > LinkedIn</Link> </li>
		    <li><Link to="" >GitHub</Link> </li>
		</ul>
		<p>&copy; ReactMasters, {new Date().getFullYear()}</p>
	</footer>
	);
}

export default Footer;