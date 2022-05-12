import { useUserContext } from "../../context/userContext";
import React, { useRef } from "react";

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

    return (
        <div>
            <h2>Авторизация</h2>
            <form onSubmit={onSubmit}>
                <input placeholder="Email" type="email" ref={emailRef}></input>
                <input placeholder="Пароль" type="password" ref={psdRef}></input>
                <button type="submit">Войти</button>
                <p onClick={forgotPasswordHandler}>Забыли пароль?</p>
            </form>
        </div>
    );
}

export default SignIn;