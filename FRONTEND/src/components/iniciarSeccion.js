import React from "react";
import { Container, Navbar, Button} from "react-bootstrap";
//import api from '../axios/axios';
//import swal from "sweetalert2";
//import { saveToLocal } from "../functions/localStorage";

const InicioSeccion = () => {
    return (
        <div className="IniciarSesion">
            <div className="menu3">
                <Navbar expand="lg" variant="dark" bg="">
                    <Container>
                        <Navbar.Brand href="/">Iniciar sesión</Navbar.Brand>
                    </Container>
                </Navbar>
            </div>
            <Container className="text-center mt-2 mx-auto my-5 p-5" style={{ width: "40rem" }}>
                <form className="form-signin mt-5 py-4">
                    <input
                        type="email"
                        id="inputEmail"
                        className="form-control mb-3"
                        placeholder="Correo electrónico"
                        name="correo"
                    />

                    <input
                        type="password"
                        id="inputPassword"
                        className="form-control"
                        placeholder="Contraseña"
                        name="contrasena"
                    />
                    <div className="checkbox mb-3"></div>
                    <a href="/listaTareas" className="btn">
                    <input  type="button" value="Iniciar Sección" className="Boton1 btn "/>
                    </a>
            
                    <br></br>
                    <a href="/Registro" className="btn">
                    <input  type="button" value="Registrarse" className="Boton1 btn "/>
          </a>
                   
                    <p className="mb-3 py-5 text-muted"> @ Gestor de tareas 2021</p>
                </form>
            </Container>
        </div>
    );
}

export default InicioSeccion;
//<!---->