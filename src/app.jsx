import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/header/header.jsx'

class App extends React.Component {
    render() {
        return (
            <div>
                <h1>app Component</h1>

                <Header />
            </div>
        )
    }
};

ReactDOM.render(<App />, document.getElementById('root'));

console.log('as;dlkasldkfas');