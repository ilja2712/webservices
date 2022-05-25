import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IoAddCircleOutline } from "react-icons/io5";
import { Card, FormTextarea, FormGroup, FormInput, DatePicker } from "shards-react";
import SelectorPriority from "./SelectorPriority";

export default function AlertDialog(props) {

  const [open, setOpen] = React.useState(false);
  const [date_task, setDate] = React.useState();
 

  const data = {};

  const handleSetPriority = (e) => {
    console.log(e);
  }

  const handleSetDate = (value) => {
    setDate(value);
    data.date_task = date_task;
  }

  const handleSetDesc = (e) => {
    data.description = e.target.value;
  }

  const handleSetHead = (e) => {
    data.content = e.target.value;
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen =() => {
    setOpen(true);
  }

  const handleAddTask = () => {
    let select = document.querySelector("select");
    console.log(select.value);
    data.prefix = props.columnName;
    console.log(data);
    setOpen(false);
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
        <FormInput size="lg" className="mb-3" placeholder="Заголовок задачи" onChange={handleSetHead} />
        </DialogTitle>
        <DialogContent>
        <FormGroup>
              <DatePicker
                size="sm"
                selected={date_task}
                onChange={handleSetDate}
                placeholderText="Срок выполнения задачи"
                dropdownMode="select"
                className="text-center"

              />
        </FormGroup>
        <FormGroup>
              <label htmlFor="feInputAddress">Описание задачи</label>
              <FormTextarea size="lg" id="feDescription" rows="5" onChange={handleSetDesc} />
        </FormGroup>
        <FormGroup>
              <SelectorPriority />
        </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={handleAddTask} autoFocus>
            Создать
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}