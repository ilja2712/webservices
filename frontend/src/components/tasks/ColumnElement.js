import { Droppable } from "react-beautiful-dnd";
import Task from "./Task";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { BiTrash } from "react-icons/bi";
import { IoAddCircleOutline } from "react-icons/io5";
import { updateStateName } from "../../slices/states";
import { findTaskByUserID } from "../../slices/tasks";
import { useUserContext } from "../../context/userContext";
import { useDispatch } from "react-redux";
import CreateTask from "./AddTask";

const ColumnHeader = styled.div`
  text-transform: uppercase;
  margin-bottom: 20px;
`;

const DroppableStyles = styled.div`
  padding: 10px;
  border-radius: 6px;
  background: #d4d4d4;
`

const handleAddColumn = () => {
    
};

const ColumnElement = ({ status, elements, id }) => {

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
      .unwrap()
      .then(response => {
        console.log(response);
      })
      .catch(e => {
        console.error(e);
    });
  };

  return ( <DroppableStyles>
      <ColumnHeader className="mnw250">
          <div className="columnButton1">
              <div className="columnButton"><input className="mxw150 fieldColumnName form-control-plaintext"
                                                  onChange={setColumnName}
                                                  contentEditable="false" 
                                                  defaultValue={columnName}>
                                            </input></div>
              <div className="columnButton right-align">
                <BiTrash size={30} color="red"/>
                <IoAddCircleOutline size={30} color="green" onClick={handleAddColumn}/>
                </div>
          </div>
        </ColumnHeader>
        <hr></hr>
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