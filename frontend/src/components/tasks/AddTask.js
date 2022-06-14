import React, { useState, useEffect, useCallback } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { IoAddCircleOutline } from "react-icons/io5";
import { FormTextarea, FormGroup, FormInput, DatePicker } from "shards-react";
import { createTask } from "../../slices/tasks";
import { useUserContext } from '../../context/userContext';
import { findPriorityByUserID, selectAllPriority } from "../../slices/priority";
import { findTaskByUserID, selectAllTask } from '../../slices/tasks';
import { useDispatch, useSelector } from "react-redux";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormSelect
} from "shards-react";

export default function AddTask(props) {

  const initialTaskState = {
    id: null,
    title: "",
    description: "",
    date_task: "",
    status: props.columnName,
    priority: "Низкий"
  };

  const priority = useSelector(selectAllPriority);
  const [task, setTask] = useState(initialTaskState);
  const { uid } = useUserContext();

  const dispatch = useDispatch();

  // получить списоку приоритетов пользователя
  const getPriority = useCallback(() => {
    dispatch(findPriorityByUserID(uid))
    .unwrap()
    .then(response => {
      console.log(response);
    })
    .catch(e => {
      console.error(e);
    })
}, [dispatch]);

useEffect(() => {
  let mounted = true;
  setTimeout(() => {
    if (mounted) {
      if (priority.length == 0) {
        getPriority();
      }
    }
  }, 100);

  return () => mounted = false;
}, []);

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
  
  // сохранить таск
  const saveTask = () => {
    const { title, description, date_task, status, priority } = task;

    dispatch(createTask({ title, description, date_task, status, priority, uid }))
      .unwrap()
      .then(data => {
        console.log(data);
        dispatch(findTaskByUserID(uid))
        setTask({
          id: null,
          title: data.title,
          description: data.description,
          status: props.columnName,
          priority: data.priority
        });
      })
      .catch(e => {
        console.log(e);
      });
    setOpen(false);
  };

  return (
    <div>
      <center><IoAddCircleOutline size={30} color="#015c50" onClick={handleOpen}/></center>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"md"}
        scroll={"body"}
      >
        <DialogTitle id="alert-dialog-title">
        <FormInput size="lg" className="mb-3" placeholder="Заголовок задачи" name="title" onChange={handleInputChange} />
        </DialogTitle>
        <DialogContent>
        <FormGroup>
              <DatePicker
                size="sm"
                name="date_task"
                dateFormat="dd/MM/yyyy"
                selected={task.date_task}
                onChange={handleDateChange}
                placeholderText="Срок выполнения задачи"
                dropdownMode="select"
                className="text-center"
              />
        </FormGroup>
        <FormGroup>
              <label htmlFor="feInputAddress">Описание задачи</label>
              <FormTextarea size="lg" id="feDescription" rows="5" name="description" onChange={handleInputChange} />
        </FormGroup>
        <FormGroup>
              <InputGroup className="mb-3">
                <InputGroupAddon type="prepend">
                  <InputGroupText>Приоритет</InputGroupText>
                </InputGroupAddon>
                <FormSelect name="priority" onChange={handleInputChange}>
                  { priority && priority.length ?
                    priority.map((pr, idx) => (<option key={idx}>{pr["Name"]}</option>)
                  ) : null }
                </FormSelect>
              </InputGroup>
        </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={saveTask} autoFocus>
            Создать
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}