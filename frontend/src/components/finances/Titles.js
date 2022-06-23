import React from "react";
import { Button, ButtonGroup } from "shards-react";

const Finances = (props) => {

    const { changePage } = props;

    return (
        <ButtonGroup className='btn-group-finance'>
            <Button outline theme='primary' className='mnw200 btn-menu-finance' onClick={() => changePage("accounting")}>Учёт</Button>
            <Button outline theme='info' className='mnw200 btn-menu-finance' onClick={() => changePage("info")}>Информация</Button>
            <Button outline theme='success' className='mnw200 btn-menu-finance' onClick={() => changePage("calendar")}>Календарь</Button>
        </ButtonGroup>
    )
};

export default Finances;
