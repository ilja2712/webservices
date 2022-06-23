import React from "react";
import {
  Row,
  Col,
  Form,
  FormInput,
  FormSelect,
  FormGroup,
  Card,
  CardHeader,
  DatePicker,
  FormTextarea,
  Button
} from "shards-react";

const Forms = () => (
    <Card small className="mxw200">
        {/* Card Header */}
        <CardHeader className="border-bottom">
            <h6 className="m-0">Новая операция</h6>
        </CardHeader>
        <Col sm="12" md="12">
            <Form className="form-new-operation">
            <FormGroup>
                <FormSelect>
                    <option>Пополнение</option>
                    <option>Трата</option>
                </FormSelect>
            </FormGroup>
            <FormGroup>
                <FormInput
                type="text"
                placeholder="Сумма"
                onChange={() => {}}
                />
            </FormGroup>
            <FormGroup>
                <FormSelect>
                    <option>Продукты</option>
                    <option>Бытовая техника</option>
                    <option>Автомобиль</option>
                </FormSelect>
            </FormGroup>
            <FormGroup>
                <DatePicker 
                size="lg"
                placeholderText="Дата операции"
                dropdownMode="select"
                className="text-center"
                />
            </FormGroup>
            <FormGroup>
                <FormTextarea 
                size="lg" 
                id="financeDescription" 
                rows="5" 
                name="description"
                />
            </FormGroup>
            <Button theme="info">Добавить</Button>
            </Form>
        </Col>
    </Card>
);

export default Forms;
