import React from 'react';
import { render } from 'react-dom';

import Menus from './components/Menus';

class App extends React.Component {
    
    render() {
        
        return (
          // <MenuList />
          <Menus />
        );
    }
}

render(<App />, document.getElementById('root'));
