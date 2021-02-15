import { React, useState } from "react";
import { Container, Navbar, Button, Card, Modal, Form, Col } from "react-bootstrap";

//import api from '../axios/axios';
//import swal from "sweetalert2";
//import { saveToLocal } from "../functions/localStorage";

const ListaTareas = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div>
            <div className="menu3">
                <Navbar expand="lg" variant="dark" bg="">
                    <Container>
                        <Navbar.Brand href="/">Gestionar tareas</Navbar.Brand>
                    </Container>
                </Navbar>
            </div>
            <Button variant="link" onClick={handleShow} className="botonimagen btn" />
            <Container className="text-center">
                <Card style={{ width: '18rem' }} className="mt-5" >
                    <Card.Img variant="top" src="" alt="img" />
                    <Card.Body>
                        <Card.Title>Nombre de la tarjeta</Card.Title>
                        <Card.Text>
                            descipción
                            </Card.Text>
                        <Button className="ml-1" style={{ background: "#b34180" }}>Editar</Button>
                        <Button className="ml-1" style={{ background: "green" }}>Eliminar</Button>
                    </Card.Body>
                </Card>
            </Container>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton style={{ background: 'rgba(179, 65, 128,0.2)' }}>
                    <Modal.Title >Crear nueva tarea</Modal.Title>
                </Modal.Header>

                <Modal.Body style={{ background: 'rgba(179, 65, 128,0.2)' }}>
                    <Form.Group controlId="formGridAddress1">
                        <Form.Label>Nombre de la tarea</Form.Label>
                        <Form.Control />
                    </Form.Group>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Prioridad</Form.Label>
                            <Form.Control as="select">

                                <option>1</option>
                                <option>2</option>
                                <option>3</option>

                            </Form.Control>

                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Fecha de vencimiento</Form.Label>
                            <Form.Control type="date" />

                        </Form.Group>
                    </Form.Row>
                    <Form.Group controlId="exampleForm.ControlSelect1">

                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Control as="textarea" rows={4} placeholder="Descripción" />
                    </Form.Group>

                    <Form>
                        <div className="mb-3">
                            <Form.File id="formcheck-api-custom" custom >
                                <Form.File.Input />
                                <Form.File.Label data-browse="Button text" style={{ border: '2px solid rgba(179, 65, 128)' }}>Cargar Imágen</Form.File.Label>
                            </Form.File>
                        </div>

                    </Form>
                </Modal.Body>


                <Modal.Footer style={{ background: 'rgba(179, 65, 128,0.2)' }}>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
          </Button>
                    <Button onClick={handleClose} style={{ background: "#b34180" }}>
                        Guardar
          </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ListaTareas;
