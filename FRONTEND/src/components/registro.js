import React from "react";
import {Container, Navbar} from "react-bootstrap";
//import api from '../axios/axios';
//import swal from "sweetalert2";
//import { saveToLocal } from "../functions/localStorage";

const Registro = () =>{
    return (
        <div className="Registro1 ">
          <div className="menu3">
            <Navbar expand="lg" variant="dark">
              <Container>
                <Navbar.Brand href="/">Registrate</Navbar.Brand>
              </Container>
            </Navbar>
          </div>
          <Container className="text-center mt-2 mx-auto my-5 p-5" style={{ width: "40rem" }}>
            <form className="form-signin mt-4 py-1">
              <input
                id="inputName"
                className="form-control mb-3"
                placeholder="Nombre"
              />
              <input
                id="lastName"
                className="form-control mb-3"
                placeholder="Apellidos"
              />
              <input
                type="email"
                id="email"
                className="form-control mb-3"
                placeholder="Correo electrónico"
              />
               <input
                type="password"
                id="contraseña"
                className="form-control mb-3"
                placeholder="Contraseña"
              />
              <div className="checkbox mb-5"></div>
              <button
                className="btn btn-lg Boton1 btn-block mt-4 mb-3"
                type="submit"
              >
                Registrarse
              </button>
              <p className="mb-3 text-muted py-5"> @ Gestor de tareas 2021</p>
            </form>
          </Container>
        </div>
      );
}

export default Registro;
