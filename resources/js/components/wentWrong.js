import React, {Component, Fragment} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import wentWrongImg from "../../images/error.png";

class WentWrong extends Component {
    render() {
        return (
            <Fragment>
                <Container>
                    <Row className="d-flex mt-5 mb-5 justify-content-center">
                        <Col className="text-center" lg={6} md={6} sm={12}>
                            <img className="w-50" src={wentWrongImg} alt=""/>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        );
    }
}

export default WentWrong;
