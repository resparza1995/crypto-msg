import axios from 'axios';
import { React, Component } from 'react';
import { Form, Input, Button, Card } from 'antd';
import * as Utils from '../lib/Utils';

const { TextArea } = Input;


export default class WriteComp extends Component {

    constructor (props) {
        super(props);
        this.state = {
            content: "",
            secret: "",
            alias: ""
        }
        this.submitHandler = this.submitHandler.bind(this);
    }

    onChangeContent = (event) => {
        this.state.content = event.target.value;
    }

    onChangeSecret = (event) => {
        this.state.secret = event.target.value;
    }

    onChangeAlias = (event) => {
        this.state.alias = event.target.value;
    }

    submitHandler = (values) => {

        if (this.state.content && this.state.secret) {
            let json = {content: this.state.content, secret: this.state.secret, alias: this.state.alias};
            let headers = {
                'Content-Type': 'application/json',
            };
            axios.post(`http://localhost:4000/api/message/send`, json, {headers: headers} )
            .then(res => {
                Utils.showInfoModal("Guarda el código", "Guarda el código para poder acceder al mensaje\n"+res.data);
                this.props.history.push('/search');
            })
            .catch(err => {
                console.log(err.stack);
                Utils.showErrorModal("General Error", "Es posible que haya un error con el servidor");
            });
        }

    };
 
    render() {

        return (
            <div className="card" ref={this.wrapper}>
                <Card
                    title="Escribe tu mensaje y súbelo encriptado"
                    style={{ minWidth: "100px", minHeight: "100px", textAlign:"center" }}
                >
                    <Form
                        id="getForm"
                        name="get-form"
                        layout="vertical"
                        onSubmitCapture={this.submitHandler}
                    >
                        <Form.Item label="Contenido" name="content" rules={[{required: true, message:""}]}>
                            <TextArea rows={7} style={{resize: "none"}} onChange={this.onChangeContent}/>
                        </Form.Item>

                        <Form.Item label="Clave" name="clave" rules={[{required: true, message:""}]}>
                            <Input.Password onChange={this.onChangeSecret}/>
                        </Form.Item>

                        <Form.Item label="Alias"name="alias">
                            <Input onChange={this.onChangeAlias}/>
                        </Form.Item>

                        <Form.Item >
                            <Button type="primary" htmlType="submit" style={{ float: "right", width:"100%", minHeight:"35px" }}>Subir</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        );
    }
}