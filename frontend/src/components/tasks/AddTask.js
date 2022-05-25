import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IoAddCircleOutline } from "react-icons/io5";
import { Card, FormTextarea, FormGroup, FormInput, DatePicker } from "shards-react";
import { useDispatch } from "react-redux";
import { createTask } from "../../slices/tasks";
import { useUserContext } from '../../context/userContext';
import getPriority from '../../services/priorityService';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormSelect
} from "shards-react";

export default function AddTask(props) {


  // ВРЕМЕННО ПОТОМ ИЗМЕНИТСЯ ПОЛУЧЕНИЕ ДАННЫХ ЧЕРЕЗ REDUX
  const [priority, setPriority] = useState();
  const [value, setValue] = useState("");
  const { uid } = useUserContext();
  const priorities = [];

  getPriority(uid).then(response => {
    if (priorities.length == 0) {
      for (const doc of response.data) {
        priorities.push(doc);
        if (doc.id == 0) setValue(doc["Name"]);
      }
    }
  })

  useEffect(() => {
    let mounted = true;
    setTimeout(() => {
      if(mounted) {
        setPriority(priorities);
      } 
    }, 100);

    return () => mounted = false;
  }, [])

  const handleSetPriority = (e) => {
    console.log(e.target.value);
    setValue(e.target.value);
    console.log(value);
  }
  /***---------------------------------- */


  /** Открытие и закрытие окна */
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen =() => {
    setOpen(true);
  }

  const initialTaskState = {
    id: null,
    title: "",
    description: "",
    date_task: "",
    status: "",
    priority: ""
  };

  const [task, setTask] = useState(initialTaskState);
 
  const dispatch = useDispatch();

  // запись значений task
  const handleInputChange = event => {
    const { name, value } = event.target;
    setTask({ ...task, [name]: value });
  };
  
  // сохранить таск
  const saveTask = () => {
    const { title, description, date_task, status, priority } = task;

    dispatch(createTask({ title, description, date_task, status, priority }))
      .unwrap()
      .then(data => {
        console.log(data);
        setTask({
          id: null,
          title: data.title,
          description: data.description,
          date_task: data.date_task,
          status: props.columnName,
          priority: data.priority
        });
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      <center><IoAddCircleOutline size={30} color="brown" onClick={handleOpen}/></center>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"md"}
        scroll={"body"}
      >
        <DialogTitle id="alert-dialog-title">
        <FormInput size="lg" className="mb-3" placeholder="Заголовок задачи" onChange={handleInputChange} />
        </DialogTitle>
        <DialogContent>
        <FormGroup>
              <DatePicker
                size="sm"
                selected={task.date_task}
                onChange={handleInputChange}
                placeholderText="Срок выполнения задачи"
                dropdownMode="select"
                className="text-center"
              />
        </FormGroup>
        <FormGroup>
              <label htmlFor="feInputAddress">Описание задачи</label>
              <FormTextarea size="lg" id="feDescription" rows="5" onChange={handleInputChange} />
        </FormGroup>
        <FormGroup>
              <InputGroup className="mb-3">
                <InputGroupAddon type="prepend">
                  <InputGroupText>Приоритет</InputGroupText>
                </InputGroupAddon>
                <FormSelect onChange={handleInputChange}>
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