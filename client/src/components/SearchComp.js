import { React, Component } from 'react';
import { Form, Input, Button, Card } from 'antd';
import { DeleteOutlined, CalendarOutlined, SendOutlined } from '@ant-design/icons'
import axios from 'axios';

export default class SearchComp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            idmsg: "",
            secret: "",
            message: {
                alias: "",
                content: "",
                date: "",
            }
        };
        this.submitHandler = this.submitHandler.bind(this);
    }

    onChangeID = (event) => {
        this.state.idmsg = event.target.value;
    }

    onChangeSecret = (event) => {
        this.state.secret = event.target.value;
    }

    submitHandler = (event) => {
        event.preventDefault();
        
        let json = { id: this.state.idmsg, secret: this.state.secret };
        let headers = {
            'Content-Type': 'application/json',
        };

        axios.post(`http://localhost:4000/api/message`, json, {headers: headers} )
            .then(res => {
                this.setState({
                    message: {
                        alias: res.data.alias,
                        content: res.data.content,
                        date: res.data.date,
                    }
                });
                // Change to message card
                document.getElementById("getForm").style.display = "none";
                document.getElementById("message-card").style.display = "";
            })
            .catch(err => { // TODO: CAMBIAR POR MODAL
                let is404 = String(err).includes("404");
                if(is404) alert("El mensaje que buscas no ha sido encontrado");
                else alert("Es posible que haya un error con el servidor");
                
            })


    };

    deleteMessage = (event) => {
        event.preventDefault();
        let json = {id: this.state.idmsg, secret: this.state.secret};

        let headers = {
            'Content-Type': 'application/json',
        };
        axios.post(`http://localhost:4000/api/message/delete`, json, {headers: headers} );
        alert("Mensaje eliminado con éxito.");
        this.resetView();
    }

    resetView = () => {
        this.state = {
            idmsg: "",
            secret: "",
            message: {
                alias: "",
                content: "",
                date: "",
            }
        };
        document.getElementById("getForm").style.display = "";
        document.getElementById("message-card").style.display = "none";
    };

    render() {
        return (
            <div className="card">
                <Card
                    id="search-card"
                    title="Busca tu mensaje"
                    style={{ minWidth: "100px", textAlign: "center" }}
                >
                    <Form
                        id="getForm"
                        name="get-form"
                        layout="vertical"
                        onSubmitCapture={this.submitHandler}
                    >
                        <Form.Item
                            label="Identificador del mensaje"
                            name="idmsg"
                        >
                            <Input id="tesst" className="antd-input" value={this.state.idmsg} onChange={this.onChangeID} placeholder="Ej: 00000000-0000-0000-0000-000000000000" />
                        </Form.Item>

                        <Form.Item
                            label="Clave"
                            name="secretmsg"
                        >
                            <Input.Password className="antd-input" value={this.state.secret} onChange={this.onChangeSecret} />
                        </Form.Item>

                        <Form.Item >
                            <Button type="primary" htmlType="submit" style={{ float: "center", width: "100%", minHeight: "35px" }}>Buscar</Button>
                        </Form.Item>
                    </Form>

                    <Card id="message-card" type="inner" title={this.state.idmsg} extra={<a href="#" onClick={this.resetView}>Buscar otro</a>} style={{ display: "none", textAlign: "justify" }}>
                    
                        <span><SendOutlined style={{ fontSize: "20px", marginRight: "10px", marginBottom:"10px"}}/> {this.state.message.alias}</span>
                        <br/>
                        <span><CalendarOutlined style={{ fontSize: "20px", marginRight: "10px", marginBottom:"10px"}}/> {this.state.message.date}</span>
                        <hr/>
                        <span></span><p>{this.state.message.content}</p>
                        <Button type="ghost" onClick={this.deleteMessage} icon={<DeleteOutlined />} style={{ float: "right"}}>Eliminar</Button>
                    </Card>
                </Card>
            </div>
        );

    }


}