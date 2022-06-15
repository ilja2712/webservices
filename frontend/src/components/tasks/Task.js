import { Draggable } from "react-beautiful-dnd";
import React, { useMemo } from "react";
import styled, { css } from "styled-components";
import { BiTrash } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { findTaskByUserID, deleteTask } from "../../slices/tasks";
import { useUserContext } from "../../context/userContext";
import { selectAllPriority } from "../../slices/priority";
import ViewTask from "./ViewTask";

const CardHeader = styled.div`
  font-weight: 500;
`;

const CardFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DragItem = styled.div`
  padding: 10px;
  border-radius: 6px;
  margin: 0 0 10px 0;
  display: grid;
  grid-gap: 10px;
  flex-direction: column;
  background: rgb(255 255 255 / 54%)
`;

const Task = ({ item, index }) => {

  const priority = useSelector(selectAllPriority);
  const { uid } = useUserContext();
  const dispatch = useDispatch();

  const deleteTaskId = () => {
    dispatch(deleteTask(item.id))
      .unwrap()
      .then(response => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      })
    dispatch(findTaskByUserID(uid))
  }

  const colorPriority = () => {
    let color = "";
    priority.filter(p => {
        if(p['Name'] == item.priority) {
            color = p['Color'];
        }
    })
    return color
}

  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => {
        return (
          <DragItem
            className={`card-task card-task-${colorPriority()}`}
            ref={provided.innerRef}
            snapshot={snapshot}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <CardHeader>
              <div className="row ml-0 mr-0">
                  <div className="ml-1">
                    <ViewTask item={item} id={item.id}/>
                  </div>
                <div className="ml-auto">
                  <BiTrash size={19} onClick={deleteTaskId} color="#b1b1b1"/>
                </div>
              </div>
            </CardHeader>
            <span className="head-task font-task-info">{item.content}</span>
            <CardFooter>
              <span className="font-task-info">{item.date_task}</span>
            </CardFooter>
          </DragItem>
        );
      }}
    </Draggable>
  );
};

export default Task;
