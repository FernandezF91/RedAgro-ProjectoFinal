import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import FormPage from './login';
import FormRegistro from './registro';
import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';


ReactDOM.render(
    <BrowserRouter>
    <Switch>
    <Route path="/login" component={FormPage}/>
    <Route path="/" component={FormRegistro}/>
    </Switch>
    </BrowserRouter>,
    document.getElementById('root')
);

/*
ReactDOM.render(<FormRegistro />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
*/