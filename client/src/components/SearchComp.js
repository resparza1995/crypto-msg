import axios from 'axios';
import { React, Component } from 'react';
import { Button, Card, Modal } from 'antd';
import { DeleteOutlined, CalendarOutlined, SendOutlined } from '@ant-design/icons'
import SearchForm from './SearchForm';
import * as Utils from '../lib/Utils';

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

    render() {
        return (
            <div className="card">
                <Card
                    id="search-card"
                    title="Busca tu mensaje"
                    style={{ minWidth: "100px", textAlign: "center" }}
                >
                    <SearchForm onSubmitHandler={this.submitHandler} />
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

    submitHandler = (data) => {
        
        let json = { id: data.idmsg, secret: data.secret };
        let headers = { 'Content-Type': 'application/json' };

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
                if(is404) Utils.showErrorModal("Error 404", "El mensaje que buscas no ha sido encontrado");
                else Utils.showErrorModal("General Error", "Es posible que haya un error con el servidor");
                
            })
    };

    deleteMessage = (event) => {
        event.preventDefault();
        let json = {id: this.state.idmsg, secret: this.state.secret};

        let headers = {
            'Content-Type': 'application/json',
        };
        axios.post(`http://localhost:4000/api/message/delete`, json, {headers: headers} );
        Utils.showSuccesModal("Mensaje eliminado con éxito.");
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

}