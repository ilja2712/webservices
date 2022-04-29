import { useUserContext } from "../../context/userContext";
import React, { useRef } from "react";

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
            <h2>Регистрация нового пользователя</h2>
            <form onSubmit={onSubmit}>
                <input placeholder="Email" type="email" ref={emailRef}></input>
                <input placeholder="Name" type="name" ref={nameRef}></input>
                <input placeholder="Пароль" type="password" ref={psdRef}></input>
                <button type="submit">Зарегистрироватся</button>
            </form>
        </div>
    );
}

export default SignUp;