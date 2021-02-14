import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import "./styles.css";
import Registro from "./components/registro";
import IniciarSesion from "./components/iniciarSeccion";
import ListaTareas from "./components/listaTareas"
import NuevaTarea from "./components/nuevaTarea"





const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={IniciarSesion} />
        <Route path="/Registro" component={Registro} />
        <Route path="/listaTareas" component={ListaTareas} />
        <Route path="/nuevaTarea" component={NuevaTarea} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;