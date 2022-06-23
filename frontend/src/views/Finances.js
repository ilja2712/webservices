import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "shards-react";
import PageTitle from "../components/common/PageTitle";
import Accounting from "../components/finances/Accounting";
import Calendar from "../components/finances/Calendar";
import Info from "../components/finances/Info";
import Titles from "../components/finances/Titles.js";

const Finances = () => {

    const [page, setPage] = useState("accounting");

    const changePage = (value) => {
        console.log(value);
        setPage(value);
    }

    return (
        <Container fluid className="main-content-container px-4">
              {/* Заглавие страницы */}
                <Row noGutters className="page-header py-4">
                    <PageTitle title="Финансы" subtitle="finances" className="text-sm-left mb-3" />
                </Row>
                <Row>
                    <Col md="12" lg="10">
                        <Row>
                            <Titles changePage={changePage}/>
                        </Row>
                        <Row>
                            { page == "accounting" ? <Accounting /> 
                            : page == "info" ? <Info /> 
                            : page == "calendar" ? <Calendar /> 
                            : null
                            }
                        </Row>
                    </Col>
                    <Col md="12" lg="2">
                        <div>Vidgets</div>
                    </Col>
                </Row>

        </Container>
    )
};

export default Finances;
