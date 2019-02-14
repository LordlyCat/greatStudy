import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {
    HashRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

import Home from './indexPage/home.js';
import Choose from './choose/choose.js';

ReactDOM.render(<Router basename="">
        <Switch>
            <Route exact path="/choose" component={Choose} />
            <Route path="/" component={Home} />
        </Switch>
    </Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();