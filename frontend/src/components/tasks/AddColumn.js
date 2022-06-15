import React, { useEffect, useState, useCallback } from 'react';
import styled from "styled-components";
import { FormInput, InputGroup, InputGroupAddon, Button } from "shards-react";
import { useUserContext } from '../../context/userContext';
import { createState, findStateByUserID } from '../../slices/states';
import { useDispatch } from "react-redux";
import { findTaskByUserID } from '../../slices/tasks';

const ColumnHeader = styled.div`
    text-transform: uppercase;
    margin-top: 15px;
    margin-bottom: 20px;
    margin-left: 15px;
    padding: 10px;
    border-radius: 6px;
    background: white;
    box-shadow: 0 2px 0 rgb(90 97 105 / 11%), 0 4px 8px rgb(90 97 105 / 12%), 0 10px 10px rgb(90 97 105 / 6%), 0 7px 70px rgb(90 97 105 / 10%);
`;

const AddColumn = () => {

    const [name, setName] = useState("");
    const { uid } = useUserContext()
    const dispatch = useDispatch();

    const newColumn = () => {
        const data = {
            name: name,
            uid: uid
        }
        dispatch(createState(data))
            .unwrap()
            .then(res => {
                console.log(res);
                
            })
            .catch(e => {
                console.log(e);
            })
        dispatch(findStateByUserID(uid))
        dispatch(findTaskByUserID(uid))
        setName("");
    }

    const handleInputChange = (event) => {
        setName(event.target.value);
    }

    return (
        <div>
            <ColumnHeader className="mnw275 mxh75 mb-0">
                <div className="row">
                    <InputGroup seamless className="mb-3 mt-2">
                        <FormInput placeholder="Название колонки" value={name} onChange={handleInputChange} className="mxw250 ml-3"/>
                        <InputGroupAddon type="append">
                        <Button theme="success" className="mb-0 mr-3" onClick={newColumn}>Добавить</Button>
                        </InputGroupAddon>
                    </InputGroup>
                </div>
            </ColumnHeader>
        </div>
    )
}

export default AddColumn;