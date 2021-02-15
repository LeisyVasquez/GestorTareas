import { React, useState, useEffect } from "react";
import { Container, Navbar } from "react-bootstrap";
import api from '../axios/axios';
import swal from "sweetalert2";
import { saveToLocal } from "../localStorage/localStorage";

const Registro = () => {
  const [userData, setUserData] = useState({});
  useEffect(() => { });

  function insertarUsuario(e) {
    let name = e.target.id;
    let value = e.target.value;
    setUserData((state) => ({
      ...userData,
      [name]: value,
    }));
    console.log(userData);
  }

  function sendInfo(e) {
    e.preventDefault();
    console.log(userData)
    if (userData.nombres !== "" && userData.apellidos !== "" && userData.correo !== "" && userData.contrasena !== "") {
      const data = {
        nombres: userData.nombres,
        apellidos: userData.apellidos,
        correo: userData.correo,
        contrasena: userData.contrasena
      }
      api.post("/usuario", data).then((res, err) => {
        if (res.status === 201) {
          console.log(res.status);
          const id = res.data.id;
          console.log(id);
          saveToLocal('id', id);
          window.location.href = "/listaTareas"
        } if (res.status === 221) {
          console.log(res.status)
          swal.fire({
            icon: "error",
            title: "Digite todos los campos",
            confirmButtonText: "Entendido",
            confirmButtonColor: "#f96332",
          });
        } if (res.status === 210) {
          swal.fire({
            icon: "error",
            title: "Error",
            text: `${res.data.message}`,
            confirmButtonText: "Entendido",
            confirmButtonColor: "#f96332",
          });
        }
      })
    } else {
      swal.fire({
        icon: "error",
        title: "Ingrese todos los campos requeridos",
        confirmButtonText: "Entendido",
        confirmButtonColor: "#f96332",
      });
    }
  }

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
            id="nombres"
            className="form-control mb-3"
            placeholder="Nombre"
            onChange={insertarUsuario}
          />
          <input
            id="apellidos"
            className="form-control mb-3"
            placeholder="Apellidos"
            onChange={insertarUsuario}
          />
          <input
            type="email"
            id="correo"
            className="form-control mb-3"
            placeholder="Correo electrónico"
            onChange={insertarUsuario}
          />
          <input
            type="password"
            id="contrasena"
            className="form-control mb-3"
            placeholder="contrasena"
            onChange={insertarUsuario}
          />
          <div className="checkbox mb-5"></div>
          <input type="button" value="Registrarse" className="Boton1" onClick={sendInfo} />
          <p className="mb-3 text-muted py-5"> @ Gestor de tareas 2021</p>
        </form>
      </Container>
    </div>
  );
}

export default Registro;
