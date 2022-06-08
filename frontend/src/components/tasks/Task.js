import { Draggable } from "react-beautiful-dnd";
import React, { useMemo } from "react";
import styled, { css } from "styled-components";
import { BiTrash } from "react-icons/bi";
import { Badge } from "shards-react";
import { useDispatch } from "react-redux";
import { findTaskByUserID, deleteTask } from "../../slices/tasks";
import { useUserContext } from "../../context/userContext";

const CardHeader = styled.div`
  font-weight: 500;
`;

const Author = styled.div`
  display: flex;
  align-items: center;
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
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background: white;
  margin: 0 0 8px 0;
  display: grid;
  grid-gap: 20px;
  flex-direction: column;
`;

const Task = ({ item, index }) => {

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

  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => {
        return (
          <DragItem
            ref={provided.innerRef}
            snapshot={snapshot}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <CardHeader>
              <div className="row ml-0 mr-0">
                <Badge pill className={`card-post__category bg-blue`}>
                  Task-{item.id}
                </Badge> 
                  <div className="ml-1">
                    <span>{item.content}</span>
                  </div>
                <div className="ml-auto">
                  <BiTrash size={19} onClick={deleteTaskId} color="red"/>
                </div>
              </div>
            </CardHeader>
            <span>{item.description}</span>
            <CardFooter>
              <span>{item.priority}</span>
              <Author>
                {item.date_task}
              </Author>
            </CardFooter>
          </DragItem>
        );
      }}
    </Draggable>
  );
};

export default Task;
