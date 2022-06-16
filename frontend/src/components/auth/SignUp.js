import { useUserContext } from "../../context/userContext";
import React, { useRef } from "react";
import {  
    Card,
    CardHeader,
    CardBody,
    Form,
    FormGroup,
    FormInput,
    FormTextarea,
    Button 
} from "shards-react";

const SignUp = () => {
    const emailRef = useRef();
    const nameRef = useRef();
    const psdRef = useRef();

    const { registerUser } = useUserContext();

    const onSubmit = (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const name = nameRef.current.value;
        const password = psdRef.current.value;
        if(email && name && password) registerUser(email, name, password)
    };

    return (
        <div>
            {/* Card Header */}
            <CardHeader className="border-bottom">
            <h6 className="m-0">Регистрация нового пользователя</h6>
            </CardHeader>

            <CardBody className="d-flex flex-column">
                <form onSubmit={onSubmit}>
                    <FormInput id="feEmailAddress" className="mb-2" placeholder="Email" type="email" innerRef={emailRef}></FormInput>
                    <FormInput id="feEmailAddress" className="mb-2" placeholder="Имя" type="text" innerRef={nameRef}></FormInput>
                    <FormInput id="fePassword" className="mb-4" placeholder="Пароль" type="password" innerRef={psdRef}></FormInput>
                    <Button outline theme="success" type="submit" className="mb-2 mr-2">
                        Зарегистрироватся
                    </Button>
                </form>
            </CardBody>
        </div>
    );
}

export default SignUp;