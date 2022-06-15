import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FormTextarea, FormGroup, FormInput, DatePicker } from "shards-react";
import { updateTaskAll } from "../../slices/tasks";
import { useUserContext } from '../../context/userContext';
import { selectAllPriority } from "../../slices/priority";
import { findTaskByUserID } from '../../slices/tasks';
import { useDispatch, useSelector } from "react-redux";
import { Badge, Button } from "shards-react";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    FormSelect
} from "shards-react";

export default function ViewTask( { item, id } ) {

    const getCorrectDate = () => {
        const dateF = item.date_task.split(".");
        const newDate = new Date(dateF[2], dateF[1] - 1, dateF[0]);
        return newDate;
    }

    const initialTaskState = {
        id: id,
        title: item.content,
        description: item.description,
        date_task: getCorrectDate(),
        status: item.status,
        priority: item.priority
    };

    const priority = useSelector(selectAllPriority);
    const [task, setTask] = useState(initialTaskState);
    const { uid } = useUserContext();
    const dispatch = useDispatch();

    /** Открытие и закрытие окна */
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen =() => {
        setOpen(true);
    }

    // запись значений task
    const handleInputChange = event => {
        const { name, value } = event.target;
        setTask({ ...task, [name]: value });
    };

    // сохранить дат
    const handleDateChange = (date) => {
        setTask({ ...task, date_task: new Date(date) });
    }

    const updateTask = () => {
        dispatch(updateTaskAll(task))
            .unwrap()
            .then(res => {
                console.log(res);
                dispatch(findTaskByUserID(uid))
            })
            .catch(e => {
                console.log(e);
            })

        setOpen(false);
    }

    const colorPriority = () => {
        let color = "";
        priority.filter(p => {
            if(p['Name'] == task.priority) {
                color = p['Color'];
            }
        })
        return color
    }

    return (
    <div>
        {priority && priority.length ?
        <Badge pill className={`card-post__category task-id-design ${colorPriority()}`} onClick={handleOpen}>
            Task-{id}
        </Badge>
        : null}
        <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"md"}
        scroll={"body"}
        >
        <DialogTitle id="alert-dialog-title" className='row ml-0 mr-0'>
            <div className="ml-1">
                <Badge pill className={`card-post__category task-id-design ${colorPriority()}`}>
                    Task-{id}
                </Badge>
            </div>
            <div className="ml-1">
                <input className="mnw700 fieldColumnName" placeholder="Заголовок задачи" name="title" value={task.title} onChange={handleInputChange}></input>
            </div>
        </DialogTitle>
        <DialogContent>
            <FormGroup>
                    <DatePicker
                    size="sm"
                    name="date_task"
                    selected={task.date_task}
                    dateFormat="dd/MM/yyyy"
                    onChange={handleDateChange}
                    placeholderText="Срок выполнения задачи"
                    dropdownMode="select"
                    className="fieldDateTask"
                    />
            </FormGroup>
            <FormGroup>
                    <label htmlFor="feInputAddress" className='fieldDescriptionName'>Описание задачи</label>
                    <FormTextarea className="fieldDescription" size="lg" id="feDescription" rows="5" name="description" value={task.description} onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
                    <InputGroup className="mb-3">
                    <InputGroupAddon type="prepend">
                        <InputGroupText className={`selector-pr selector-${colorPriority()}`}>Приоритет</InputGroupText>
                    </InputGroupAddon>
                    <FormSelect name="priority" className='selector-pr' value={task.priority} onChange={handleInputChange}>
                        { priority && priority.length ?
                        priority.map((pr, idx) => (<option className='selector-pr' key={idx}>{pr["Name"]}</option>)
                        ) : null }
                    </FormSelect>
                    </InputGroup>
            </FormGroup>
        </DialogContent>
        <DialogActions>
            <Button outline theme="warning" className="mb-2 mr-1" onClick={handleClose}>Отмена</Button>
            <Button outline theme="success" className="mb-2 mr-1" onClick={updateTask} autoFocus>Обновить</Button>
        </DialogActions>
        </Dialog>
    </div>
    )
}