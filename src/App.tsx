import React from "react";
import "./App.css";
import { Button } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
function App(): JSX.Element {
    return (
        <div className="App">
            <header className="App-header">
                UD CISC275 with React Hooks and TypeScript Name:Hexuan Jiang
            </header>
            <h2>SC2 Zerg Image</h2>
            <img
                src="https://static2.srcdn.com/wordpress/wp-content/uploads/2019/09/SC2-Zerg-Image.jpg?q=50&fit=crop&w=960&h=500&dpr=1.5"
                alt="A picture of Zerg"
            />
            <Button onClick={() => console.log("Hello World!")}>
                Log Hello World
            </Button>
            <Container>
                <Row>
                    <div
                        style={{
                            border: "1px solid red",
                            background: "red",
                            height: "80px",
                            width: "650px"
                        }}
                    >
                        <Col xs="auto">
                            <ol>
                                <li>Maru</li>
                                <li>Rogue</li>
                                <li>Zest</li>
                            </ol>
                        </Col>
                    </div>
                    <div
                        style={{
                            border: "1px solid red",
                            background: "red",
                            height: "80px",
                            width: "650px"
                        }}
                    >
                        <Col xs="auto">
                            On the left side are 3 SC2 pro gammer.
                        </Col>
                    </div>
                </Row>
            </Container>
            <p>
                Edit <code>src/App.tsx</code> and save. This page will
                automatically reload. Hello World
            </p>
        </div>
    );
}

export default App;
