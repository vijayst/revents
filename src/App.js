import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';

class App extends Component {
    render() {
        return (
            <div className="app">
                Hello world
                <Icon style={{ color: 'red' }} className="arrow alternate circle right" />
            </div>
        );
    }
}

export default App;
