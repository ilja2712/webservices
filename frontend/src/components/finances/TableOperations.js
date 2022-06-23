import React from "react";
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";

const TableOperations = () => {

    return (
            <Card small className="mb-4">
                <CardHeader className="border-bottom">
                    <h6 className="m-0">Операции</h6>
                </CardHeader>
                <CardBody className="p-0 pb-3">
                    <table className="table mb-0">
                        <thead className="bg-light">
                            <tr>
                            <th scope="col" className="border-0">
                                #
                            </th>
                            <th scope="col" className="border-0">
                                Операция
                            </th>
                            <th scope="col" className="border-0">
                                Сумма
                            </th>
                            <th scope="col" className="border-0">
                                Дата
                            </th>
                            <th scope="col" className="border-0">
                                Категория
                            </th>
                            <th scope="col" className="border-0">
                                Описание
                            </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>1</td>
                            <td>Пополнение</td>
                            <td>+10 000</td>
                            <td>25.06.2022</td>
                            <td>Зарплата</td>
                            <td>Получен аванец</td>
                            </tr>
                        </tbody>
                    </table>
                </CardBody>
            </Card>
    )

}

export default TableOperations;