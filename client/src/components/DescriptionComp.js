import { React, Component } from 'react';
import { Row, Col } from 'antd';
import lockLogo from "../assets/images/lock.png";
import keyLogo from "../assets/images/key.png";


export default class DescriptionComp extends Component {

    render() {
        const nodelink = "https://nodejs.org/es/";
        const reactlink = "https://es.reactjs.org/";
        const antlink = "https://ant.design/";
        return (
            <div className="description">
                <Row style={{ marginBottom: "50px" }}>
                    <Col className="col-logo" span={6}>
                        <img className="description-logo" src={lockLogo}></img>
                    </Col>

                    <Col className="description-text" span={16} style={{ textAlign: "justify", marginLeft: "20px", fontSize: "1.2em" }}>
                        <h1>Crypto msg</h1>
                        <p>
                            Crypto-msg es una aplicación con la que subir mensajes encriptados de manera anónima. Para leer el mensaje deberás compartir
                            la clave secreta y el identificador del mensaje con el remitente. El identificador del mensaje te será notificado una vez
                            sea subido.
                            Tanto la clave como el mensaje son guardados encriptados.
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col className="col-logo" span={6}>
                        <img id="keylogo" className="description-logo" src={keyLogo}></img>
                    </Col>
                    <Col className="description-text" span={16} style={{ textAlign: "justify", marginLeft: "20px", fontSize: "1.2em" }}>
                        <h1>Tecnologías utilizadas</h1>
                        <p>
                            La aplicación está desarrollada en <a href={nodelink}>Nodejs</a> como backend y <a href={reactlink}>Reactjs</a> para frontend utilizando para el diseño
                            de la interfaz la libreria UI de <a href={antlink}>Ant-Design</a>.
                        </p>
                    </Col>
                </Row>
            </div>
        );

    }
}