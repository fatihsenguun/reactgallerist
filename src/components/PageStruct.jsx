import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../css/compPageStruct.css"
import CarsBox from '../components/CarsBox';

function PageStruct({children}) {
    return (
        <div className='struct'>
            <Container>
                <Row className='row'>
                    <Col lg={2}>

                    </Col>
                    <Col lg={8}>
                        <div className='generalDiv'>

                            {children}

                        </div>
                    </Col>
                    <Col lg={2}>

                    </Col>
                </Row>
            </Container>


        </div>
    )
}

export default PageStruct