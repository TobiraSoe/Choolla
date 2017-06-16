import React from 'react';
import ReactDOM from 'react-dom';

import styles from './Header.styl';

export default class Header extends React.Component {
    render() {
        return (
            <div>
                <header className={ styles.Header }>
                    <h1>Header Component</h1>
                    <button className={styles.Header__button} >lolo</button>
                </header>
            </div>
        )
    }
};
