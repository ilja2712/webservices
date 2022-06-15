import React from "react";
import { Container, Row } from "shards-react";
import PageTitle from "../components/common/PageTitle";

const Finances = () => {
    return (
        <Container fluid className="main-content-container px-4">
              {/* Заглавие страницы */}
                <Row noGutters className="page-header py-4">
                    <PageTitle title="Финансы" subtitle="finances" className="text-sm-left mb-3" />
                </Row>

        </Container>
    )
};

export default Finances;
