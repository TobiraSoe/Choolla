import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class App extends React.Component {
    render() {
        return (
            <h1>app Component</h1>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'))
