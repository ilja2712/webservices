import React, { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { Card, Row, Col, Button } from "shards-react";


const Auth = () => {
    const [index, setIndex] = useState(false);
    const toggleIndex = () => {
        setIndex((prevState) => !prevState);
    };
    
    return (
        <Card small className="mxw500 mxh500 window-auth">
            <div className="container">
                {!index ? <SignIn /> : <SignUp />}
                <p onClick={toggleIndex}>
                    {!index ? 
                    <Button outline theme="warning" className="mb-2 ml-3">
                        Новый пльзователь? Зарегистрируйтесь!
                    </Button> : 
                    <Button outline theme="warning" className="mb-2 ml-3">
                        Уже есть аккаунт?
                    </Button>}
                </p>
            </div>
        </Card>
    );
}

export default Auth;