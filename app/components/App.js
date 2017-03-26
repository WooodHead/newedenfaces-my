import React from 'react';
import NavBar from './NavBar'

class App extends React.Component {
    render() {
        return (
            <div>
            <NavBar history={this.props.history}/>
			<h1>App</h1>
				{this.props.children}
			</div>
        )
    }
}

export default App;
