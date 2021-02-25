import { React, Component } from 'react';
import { Input, Card, Row, Col } from 'antd';
const { TextArea } = Input;


export default class MessageCard extends Component {

    handleSubmit = (values) => {
        console.log('Success:', values);
    };

    render() {
        let uuid = "00000000-0000-0000-0000-000000000000";
        let msgtitle = "Mensaje - " + uuid;
        let from = "From - " + "unknown";

        return (
                <Card
                    id="message-card"
                    title={msgtitle}
                    style={{ minWidth: "500px", minHeight: "500px", width: "600px", display:"none" }}
                >
                    <Card type="inner" title={from} extra={<a href="#">Buscar otro</a>}>
                        <b>Subido en:</b>{Date.now()}
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                            It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
                            It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </p>
                    </Card>
                </Card>
        );

    }
}