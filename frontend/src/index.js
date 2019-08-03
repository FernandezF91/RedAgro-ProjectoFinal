import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LoginForm from './Login';
import RegistroForm from './RegistroUsuarios';
import HomePage from './Home';
import NotFound from './NotFound';
import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Recuperaremail from './Recuperaremail';
import RegistroProductor from './RegistroProductor';


ReactDOM.render(
    <BrowserRouter>
    <Switch>
	<Route exact path="/" component={HomePage}/>
    <Route path="/login" component={LoginForm}/>
	<Route path="/registroUsuario" component={RegistroForm}/>
	<Route path="/recupero_email" component={Recuperaremail}/>
	<Route path="/registroProductor" component={RegistroProductor}/>
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