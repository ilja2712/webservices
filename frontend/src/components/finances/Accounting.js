import React from "react";
import { Col, Row } from "shards-react";
import Forms from "./Forms";
import TableOperations from "./TableOperations";

const Accounting = () => {
    return (
        <div className="accounting-head">
            <Row>
                <Col md="20" lg="5">
                    <Forms />
                </Col>
                <Col md="10" lg="15">
                    <TableOperations />
                </Col>
            </Row>

        </div>
    )
};

export default Accounting;