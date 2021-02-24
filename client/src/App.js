import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./assets/css/App.css";
import { Layout }      from "antd";
import MenuComp        from "./components/layout/MenuComp";
import myLogo          from "./assets/images/ff-logo.png";
import SearchComp      from "./components/SearchComp";
import WriteComp       from "./components/WriteComp";
import DescriptionComp from "./components/DescriptionComp";


const { Header, Footer, Content } = Layout;

function App() {
    return (
        <Router>
            <Layout>
                <Header className="header" style={{ background: "#1d1d1d" }}>
                    <Link to="/"><img src={myLogo} className="logo"></img></Link>
                    <MenuComp/>
                </Header>
                <Content className="site-layout">
                        <Switch>
                            <Route exact path={["/", "/search"]} component={SearchComp}></Route>

                            <Route path="/write" component={WriteComp}></Route>

                            <Route path="/description" component={DescriptionComp}></Route>
                        </Switch>
                </Content>

                <Footer className="footer">
                    Designed using @ant-design
            </Footer>
            </Layout>
        </Router>
    );
}

export default App;
