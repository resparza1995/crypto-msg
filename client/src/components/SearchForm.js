import React from "react";
import { Form, Input, Button } from 'antd';

export default class NameForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            idmsg: "",
            secret: ""
        };
        this.submitHandler = this.submitHandler.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value,
        });
    }

    submitHandler(event) {
        event.preventDefault();
        this.props.onSubmitHandler(this.state);
    }

    render() {
        return (
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
                    <Input name="idmsg" value={this.state.idmsg} onChange={this.handleInputChange} placeholder="Ej: 00000000-0000-0000-0000-000000000000" />
                </Form.Item>

                <Form.Item
                    label="Clave"
                    name="secretmsg"
                >
                    <Input.Password name="secret" value={this.state.secret} onChange={this.handleInputChange} />
                </Form.Item>

                <Form.Item >
                    <Button type="primary" htmlType="submit" style={{ float: "center", width: "100%", minHeight: "35px" }}>Buscar</Button>
                </Form.Item>
            </Form>
        );
    }
}