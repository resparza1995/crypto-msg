import { React, Component } from 'react';
import { Link } from "react-router-dom";
import { Menu } from "antd";

export default class MenuComp extends Component {

    render() {

        return (
            <Menu
            theme="dark"
            mode="horizontal"
            style={{ textAlign: "right" }}
        >
            <Menu.Item key="1">
                <Link to="/search">Buscar mensaje</Link>
            </Menu.Item>
            <Menu.Item key="2">
                <Link to="/write">Escribir mensaje</Link>
            </Menu.Item>
            <Menu.Item key="3">
                <Link to="/description">Sobre la app</Link>
            </Menu.Item>
        </Menu>
        );

    }
}