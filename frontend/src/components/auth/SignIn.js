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

const SignIn = () => {
    const emailRef = useRef();
    const psdRef = useRef();

    const { signInUser, forgotPassword } = useUserContext();

    const onSubmit = (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = psdRef.current.value;
        if(email, password) signInUser(email, password);
    };

    const forgotPasswordHandler = () => {
        const email = emailRef.current.value;
        if(email) forgotPassword(email).then(() => (emailRef.current.value = ""));
    };

    return (<div>
                {/* Card Header */}
                <CardHeader className="border-bottom">
                <h6 className="m-0">Авторизация</h6>
                </CardHeader>

                <CardBody className="d-flex flex-column">
                    <form onSubmit={onSubmit}>
                        <FormInput id="feEmailAddress" className="mb-2" placeholder="Email" type="email" innerRef={emailRef}></FormInput>
                        <FormInput id="fePassword" className="mb-4" placeholder="Пароль" type="password" innerRef={psdRef}></FormInput>
                        <Button outline theme="success" type="submit" className="mb-2 mr-2">
                            Войти
                        </Button>
                        <Button onClick={forgotPasswordHandler} outline theme="danger" className="mb-2">
                            Забыли пароль?
                        </Button>
                    </form>
                </CardBody>
            </div>
    );
}

export default SignIn;