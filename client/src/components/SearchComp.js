import { React, Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Card } from 'antd';

export default class SearchComp extends Component {

    handleSubmit = (values) => {
        console.log('Success:', values);
    };

    render() {

        return (
            <div className="card">
                <Card
                    title="Busca tu mensaje"
                    style={{ minWidth: "100px", textAlign:"center" }}
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
                            <Input placeholder="Ej: 00000000-0000-0000-0000-000000000000" />
                        </Form.Item>

                        <Form.Item
                            label="Clave"
                            name="secretmsg"
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item >
                            <Button type="primary" htmlType="submit" style={{ float: "center", width:"100%",  minHeight:"35px" }}>Buscar</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        );

    }
}