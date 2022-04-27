import { Droppable } from "react-beautiful-dnd";
import Task from "./Task";
import React from "react";
import styled from "styled-components";
import { BiTrash } from "react-icons/bi";
import { IoAddCircleOutline } from "react-icons/io5";

const ColumnHeader = styled.div`
  text-transform: uppercase;
  margin-bottom: 20px;
`;

const DroppableStyles = styled.div`
  padding: 10px;
  border-radius: 6px;
  background: #d4d4d4;
`;

const handleAddColumn = () => {
    
};

const handleClick = () => {
    const inputField = document.getElementById("columnNameField");
    inputField.contentEditable = true;
};

const ColumnElement = ({ prefix, elements }) => (
  
  <DroppableStyles>
    <ColumnHeader className="mnw250">
        <div className="columnButton1">
            <div className="columnButton"><input id="columnNameField" className="mxw150 fieldColumnName form-control-plaintext " contentEditable="false" defaultValue={prefix} onClick={handleClick}></input></div>
            <div className="columnButton right-align">
              <BiTrash size={30} color="red"/>
              <IoAddCircleOutline size={30} color="green" onClick={handleAddColumn}/>
              </div>
        </div>
      </ColumnHeader>
    <Droppable droppableId={`${prefix}`}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          {elements.map((item, index) => (
            <Task key={item.id} item={item} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </DroppableStyles>
);

export default ColumnElement;