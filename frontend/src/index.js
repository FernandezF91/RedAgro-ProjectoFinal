import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LoginForm from './pantallas/Login';
import RegistroConsumidor from './pantallas/RegistroConsumidor';
import HomePage from './pantallas/Home';
import NotFound from './pantallas/NotFound';
import Recuperaremail from './pantallas/Recuperaremail';
import RegistroProductor from './pantallas/RegistroProductor';
import PantallaPrincipalProductores from './pantallas/PantallaPrincipalProductores';
import PantallaPrincipalConsumidores from './pantallas/PantallaPrincipalConsumidores';
import SeleccionUsuario from './pantallas/SeleccionUsuario';
import ModificarContraseña from './pantallas/ModificarContraseña';

import './diseños/index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/login" component={LoginForm} />
            <Route path="/registroConsumidor" component={RegistroConsumidor} />
            <Route path="/recupero_email" component={Recuperaremail} />
            <Route path="/registroProductor" component={RegistroProductor} />
            <Route path="/principalProductores" component={PantallaPrincipalProductores} />
            <Route path="/principalConsumidores" component={PantallaPrincipalConsumidores} />
            <Route path="/seleccionUsuario" component={SeleccionUsuario} />
            <Route path="*" component={NotFound} />
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