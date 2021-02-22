import "./assets/css/App.css";
import { Layout, Menu, Card } from "antd";
import myLogo from "./assets/images/ff-logo.png";

const { Header, Footer, Content } = Layout;

function App() {
    return (
        <Layout>
            <Header className="header" style={{background: "#1d1d1d"}}>
                <img src={myLogo} className="logo"></img>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={["2"]}
                    style={{ textAlign: "right" }}
                >
                    <Menu.Item key="1">Buscar mensaje</Menu.Item>
                    <Menu.Item key="2">Subir mensaje</Menu.Item>
                    <Menu.Item key="3">Sobre la app</Menu.Item>
                </Menu>
            </Header>
            <Content className="site-layout">
                <div className="site-layout-background">
                    <Card className="main-card"
                        title="Default size card"
                        extra={<a href="#">More</a>}
                    >
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                </div>
            </Content>
            <Footer className="footer">
                Designed in 2021 using @ant-design
            </Footer>
        </Layout>
    );
}

export default App;
