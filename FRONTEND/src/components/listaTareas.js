import { React, useState,useEffect } from "react";
import { Container, Navbar, Button, Card, Modal, Form, Col } from "react-bootstrap";
import { getFromLocal } from "../localStorage/localStorage";

import api from '../axios/axios';
import swal from "sweetalert2";

const ListaTareas = () => {
    const id_usuario = getFromLocal('id');

    //Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //Multer
    const [fileImg, setFileImg] = useState("");
    const [imgname, setImgname] = useState("Cargar Imagen");
    const [pathImg, setPathImg] = useState("");
    

    const onChangeImg = (e) => {
        setFileImg(e.target.files[0]);
        console.log(e.target.files[0]);
        setImgname(e.target.files[0].name);
        console.log(e.target.files[0].name);
    };

    const onSubmitImg = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("img", fileImg, imgname);
    try {
      const res = await api.post("/send-img", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.status === 0) {
        setFileImg("");
        setImgname("Cargue un archivo válido...");
        swal.fire({
            title: "Archivo invalido",
            icon: "error",
            confirmButtonText: "Entendido",
            confirmButtonColor: "#f96332",
          });
      } else {
        setPathImg(res.data.message.path);
        swal.fire({
          title: "¡Imagen subida!",
          text: "Puede continuar",
          icon: "success",
          confirmButtonText: "¡Entendido!",
          confirmButtonColor: "#54e346",
        });
      }
    } catch (err) {
      alert(err);
    }
  }; 

    //Insertar tarjeta
    const [targetData, setTargetData] = useState({});

    function datosTarjeta(e) {
        let name = e.target.id;
        let value = e.target.value;
        setTargetData((state) => ({
            ...targetData,
            [name]: value,
        }));
        console.log(targetData);
    }

    function sendInfo(e){
        e.preventDefault;
        const data = {
            id_usuario: id_usuario,
            //id_usuario: getFromLocal('id'), 
            nombre: targetData.nombre, 
            imagen: pathImg, 
            descripcion: targetData.descripcion, 
            prioridad: targetData.prioridad, 
            fecha_vencimiento: targetData.fecha_vencimiento
        }

        api.post('/tarjeta', data).then((res)=>{
            if(res.status === 201){
                console.log(res.status)
                swal.fire({
                    title: "Tarea creada éxitosamente",
                    text: "...",
                    icon: "success",
                    confirmButtonText: "Que maravilla",
                    confirmButtonColor: "#b34180",
                  });
                
                setTimeout(()=>{ 
                    window.location.href = "/listaTareas"
                 }, 2000);
               
            }else if(res.status === 221){
                swal.fire({
                    icon: "error",
                    title: "Digite todos los campos",
                    confirmButtonText: "Entendido",
                    confirmButtonColor: "#f96332",
                  });
                console.log(res.status)
            } else if(res.status === 210){
                console.log(res.data.error)
            }else{
                window.location.href = "/listaTareas"
                swal.fire({
                    icon: "error",
                    title: "Error inesperado",
                    text: "Intente de nuevo o regrese más tarde",
                    confirmButtonText: "Entendido",
                    confirmButtonColor: "#f96332",
                  });
            }
        })
        console.log(data)
    }


    //Mostrar tarjetas 
    const [showCard, setShowCard] = useState({});
    useEffect(() => {
        cardPerUser()
    }, []);
    
    const cardPerUser = () => {
    api.get(`/tarjeta/${id_usuario}`).then(
      (res) => {
        setShowCard(res.data)
        console.log(res.data)
      }
    );
    }
    
/*
 {showCard.map((item) =>
                            <option key={item.id}>{item.nombre}-{item.codigo}</option>
                        )};
*/
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
                        <Button className="ml-1" style={{ background: "#009900" }}>Eliminar</Button>
                    </Card.Body>
                </Card>
            </Container>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton style={{ background: 'rgba(179, 65, 128,0.2)' }}>
                    <Modal.Title>Crear nueva tarea</Modal.Title>
                </Modal.Header>

                <Modal.Body style={{ background: 'rgba(179, 65, 128,0.2)' }}>

                    <Form.Group>
                        <Form.Label>Nombre de la tarea</Form.Label>
                        <Form.Control id="nombre" onChange={datosTarjeta} />
                    </Form.Group>

                    <Form.Row>

                        <Form.Group as={Col}>
                            <Form.Label>Prioridad</Form.Label>
                            <Form.Control as="select" id="prioridad" onChange={datosTarjeta}>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Fecha de vencimiento</Form.Label>
                            <Form.Control type="date" id="fecha_vencimiento" onChange={datosTarjeta} />
                        </Form.Group>

                    </Form.Row>

                    <Form.Group>
                        <Form.Control as="textarea" rows={4} placeholder="Descripción" id="descripcion" onChange={datosTarjeta} />
                    </Form.Group>

                    <Form onSubmit={onSubmitImg}>
                        <div className="mb-3">
                            <Form.File id="formcheck-api-custom" custom >
                                <Form.File.Input id="imagen" onChange={onChangeImg}/>
                                <Form.File.Label data-browse="Button" style={{ border: '2px solid rgba(179, 65, 128)' }}>{imgname}</Form.File.Label>
                            </Form.File>
                        </div>
                        <input
                            type="submit"
                            value="Guardar imagen"
                            className="Boton2 mt-2"
                        />
                    </Form>
                </Modal.Body>


                <Modal.Footer style={{ background: 'rgba(179, 65, 128,0.2)' }}>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
          </Button>
                    <Button onClick={sendInfo} style={{ background: "#b34180" }}>
                        Guardar
          </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ListaTareas;


//<Button onClick={handleClose} style={{ background: "#b34180" }}> Guardar </Button>