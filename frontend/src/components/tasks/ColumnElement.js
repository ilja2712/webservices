import { Droppable } from "react-beautiful-dnd";
import Task from "./Task";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { BiTrash } from "react-icons/bi";
import { IoAddCircleOutline } from "react-icons/io5";
import { setNameCol } from "../../data/stateService";
import { useUserContext } from "../../context/userContext";
import ModalCreateTask from "./modalTask";

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

const handleClick = () => {
   
};



const ColumnElement = ({ prefix, elements, id }) => {

  const [columnName, setName] = useState(prefix);
  const { uid } = useUserContext();
  const [tasks, addTasks] = useState(elements);

  const setColumnName = (e) => {
    console.log(e.target.value);
    setName(e.target.value);

    const data = {
      name: e.target.value
    }
    setNameCol(data, id, uid);
  };

  const handleAddTask = () => {
      console.log(columnName);
     /* addTasks(elements.push({
        id: '3',
        content: '234',
        description: 'dsfdsfdsfs',
        priority: "Slow",
        date_task: '12.05.2023',
        prefix: columnName
      }))*/
      console.log(elements);
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
            {elements.map((item, index) => (
              <Task key={item.id} item={item} index={index} />
            ))}
            {provided.placeholder}
            <center><IoAddCircleOutline size={30} color="brown" onClick={handleAddTask}/></center>
            <ModalCreateTask />
          </div>
        )}
      </Droppable>
    </DroppableStyles>)
};

export default ColumnElement;