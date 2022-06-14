import { Droppable } from "react-beautiful-dnd";
import Task from "./Task";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { BiTrash } from "react-icons/bi";
import { IoAddCircleOutline } from "react-icons/io5";
import { deleteState, findStateByUserID, updateStateName } from "../../slices/states";
import { deleteTaskWithState, findTaskByUserID } from "../../slices/tasks";
import { useUserContext } from "../../context/userContext";
import { useDispatch } from "react-redux";
import CreateTask from "./AddTask";

const ColumnHeader = styled.div`
  text-transform: uppercase;
  margin-bottom: 15px;
`;

const DroppableStyles = styled.div`
  margin: 5px;
  padding: 10px;
  border-radius: 6px;
  background: #e9ecef;
  box-shadow: 0 1px 2px #015c50, 0 1px 2px #015c50;
`

const ColumnElement = ({ status, elements, id, idl }) => {

  const deleteColumn = () => {

    dispatch(deleteTaskWithState(idl))
      .unwrap()
      .then(res => {
        console.log(res);
      })
      .catch(e => {
        console.log(e);
      })

    dispatch(deleteState(idl))
      .unwrap()
      .then(res => {
        console.log(res);
      })
      .catch(e => {
        console.log(e);
      })
    dispatch(findStateByUserID(uid))
    dispatch(findTaskByUserID(uid))
  };

  const dispatch = useDispatch();

  const [columnName, setColName] = useState(status);
  const { uid } = useUserContext();

  const setColumnName = (e) => {
    const data = {
      id: id,
      name: e.target.value,
      uid: uid
    }
    dispatch(updateStateName(data))
      .unwrap()
      .then(response => {
        console.log(response);
        setColName(e.target.value);
      })
      .catch(e => {
        console.error(e);
    });
    dispatch(findTaskByUserID(uid))
  };

  return ( <DroppableStyles>
      <ColumnHeader className="mnw250 mb-0">
          <div className="row ml-0 mr-0 mt-1">
              <div className="ml-2"><input className="mxw200 fieldColumnName form-control-plaintext"
                                                  onBlur={setColumnName}
                                                  contentEditable="false" 
                                                  defaultValue={columnName}>
                                            </input></div>
              <div className="ml-auto mt-2">
                <BiTrash size={25} onClick={deleteColumn} color="#015c50"/>
                </div>
          </div>
        </ColumnHeader>
        <hr className="mt-1 mb-3" color="#015c50"></hr>
        <Droppable droppableId={`${columnName}`}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}> 
              {elements && elements.map((item, index) => (
                <Task key={item.id} item={item} index={index} />
              ))}
              {provided.placeholder}
              <CreateTask columnName={columnName} />
            </div>
          )}
        </Droppable>
    </DroppableStyles>)
};

export default ColumnElement;