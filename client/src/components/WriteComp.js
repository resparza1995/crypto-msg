import { React, Component } from 'react';
import { Form, Input, Button, Card } from 'antd';
const { TextArea } = Input;


export default class WriteComp extends Component {

    handleSubmit = (values) => {
        console.log('Success:', values);
    };

    render() {
        return (
            <div className="card">
                <Card
                    title="Escribe tu mensaje y súbelo encriptado"
                    style={{ minWidth: "100px", minHeight: "100px", textAlign:"center" }}
                >
                    <Form
                        id="getForm"
                        name="get-form"
                        layout="vertical"
                        onSubmit={this.handleSubmit}
                    >
                        <Form.Item
                            label="Identificador del mensaje"
                            name="idmsg"
                        >
                            <TextArea rows={7} style={{resize: "none"}}/>
                        </Form.Item>

                        <Form.Item
                            label="Clave"
                            name="secretmsg"
                        >
                            <Input.Password />
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