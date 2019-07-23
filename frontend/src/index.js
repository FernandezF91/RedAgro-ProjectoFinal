import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LoginForm from './Login';
import RegistroForm from './Registro';
import HomePage from './Home';
import NotFound from './NotFound';
import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';


ReactDOM.render(
    <BrowserRouter>
    <Switch>
	<Route path="/home" component={HomePage}/>
    <Route path="/login" component={LoginForm}/>
	<Route path="/registro" component={RegistroForm}/>
	<Route path="*" component={NotFound}/>
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