import * as React from 'react';
import logo from './assets/logo.svg';
import { Image, Title } from './components';
import * as styles from './styles/index.css';

export default () => {
	return (
		<div className={styles.App}>
			<Image src={logo} alt='React logo' />
			<Title>Hello Parcel x React</Title>
		</div>
	);
};
