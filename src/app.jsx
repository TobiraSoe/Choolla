import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import Header from './components/header/header.jsx'

class App extends React.Component {
    render() {
        return (
            <div>
                <h1>app Component</h1>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'))
