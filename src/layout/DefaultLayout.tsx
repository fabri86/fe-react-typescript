import * as React from 'react';
import * as styles from './DefaultLayout.scss';

const DefaultLayout: React.FC = ({ children }) => {
	return <div className={styles.layout}>{children}</div>;
};

export default DefaultLayout;
