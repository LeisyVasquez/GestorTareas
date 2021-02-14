import React from "react";
import { Container, Navbar, Button, Card } from "react-bootstrap";
//import api from '../axios/axios';
//import swal from "sweetalert2";
//import { saveToLocal } from "../functions/localStorage";

const ListaTareas = () => {
    return (
        <div>
            <div className="menu3">
                <Navbar expand="lg" variant="dark" bg="">
                    <Container>
                        <Navbar.Brand href="/">Gestionar tareas</Navbar.Brand>
                    </Container>
                </Navbar>
            </div>
            <button className="botonimagen btn"></button>
            <Container className="text-center">
                <Card style={{ width: '18rem'}} className="mt-5" >
                    <Card.Img variant="top" src="" alt="img" />
                    <Card.Body>
                        <Card.Title>Nombre de la tarjeta</Card.Title>
                        <Card.Text>
                            descipción
                            </Card.Text>
                        <Button className="ml-1" style={{ background: "#b34180"}}>Editar</Button>
                        <Button className="ml-1" style={{ background: "green" }}>Eliminar</Button>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}

export default ListaTareas;
