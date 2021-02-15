import {React, useState, useEffect} from "react";
import { Container, Navbar, Button} from "react-bootstrap";
import api from '../axios/axios';
import swal from "sweetalert2";
//import { saveToLocal } from "../functions/localStorage";

const InicioSeccion = () => {
    const [userData, setUserData] = useState({});
    useEffect(() => {});

    function insertUser(e) {
        let name = e.target.id;
        let value = e.target.value;
        setUserData((state) => ({
          ...userData,
          [name]: value,
        }));
        console.log(userData);
      }

      const sendInfo = () => {
        console.log(userData)
        const data = {
            correo: userData.email,
            contrasena: userData.password
        }
        api.post("/login", data).then((res, err)=>{
            console.log(res.status)
            console.log(res.state)
            if(res.status === 500){
                swal.fire({
                    icon: "error",
                    title: "Error en el servidor",
                    text: "Intente iniciar sección de nuevo o vuelta más tarde",
                    confirmButtonText: "Entendido",
                    confirmButtonColor: "#f96332",
                  });
                  console.log(res.status)
            }if(res.status === 200){
                console.log(res.status);
                //const id = res.message;
                //console.log(id);
                //window.location.href = "/listaTareas"
            }if(res.status === 400){               
                  console.log(res.status)
            }
        })
      }

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
                        id="email"
                        className="form-control mb-3"
                        placeholder="Correo electrónico"
                        name="correo"
                        onChange={insertUser}
                    />

                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        placeholder="Contraseña"
                        name="contrasena"
                        onChange={insertUser}
                    />
                    <a  className="Boton1 mt-5">
                    <input  type="button" value="Iniciar Sección" className="Boton1" onClick={sendInfo}/>
                    </a>
            
                    <br></br>
                    <a href="/Registro" className="Boton1">
                    <input type="button" value="Registrarse" className="Boton1"/>
          </a>
         
                    <p className="mb-3 py-5 text-muted"> @ Gestor de tareas 2021</p>
                </form>
            </Container>
        </div>
    );
}

export default InicioSeccion;
//<!---->