import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import "./styles.css";
import Registro from "./components/registro";
import IniciarSesion from "./components/iniciarSeccion";
import ListaTareas from "./components/listaTareas"





const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={IniciarSesion} />
        <Route path="/Registro" component={Registro} />
        <Route path="/listaTareas" component={ListaTareas} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;