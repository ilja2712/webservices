import React, { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";


const Auth = () => {
    const [index, setIndex] = useState(false);
    const toggleIndex = () => {
        setIndex((prevState) => !prevState);
    };
    
    return (
        <div className="container">
            {!index ? <SignIn /> : <SignUp />}
            <p onClick={toggleIndex}>
                {!index ? "Новый пльзователь? Зарегистрируйтесь!" : "Уже есть аккаунт?"}
            </p>
        </div>
    );
}

export default Auth;