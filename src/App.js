import React from 'react';
import { render } from 'react-dom';
import MenuList from './components/MenuList';

class App extends React.Component {
    render() {
        return (
            <MenuList />
            );
    }
}

render(<App />, document.getElementById('root'));
