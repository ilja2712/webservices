import { Droppable } from "react-beautiful-dnd";
import Task from "./Task";
import React from "react";
import styled from "styled-components";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

const ColumnHeader = styled.div`
  text-transform: uppercase;
  margin-bottom: 20px;
`;

const DroppableStyles = styled.div`
  padding: 10px;
  border-radius: 6px;
  background: #d4d4d4;
`;

const ColumnElement = ({ prefix, elements }) => (
  
  <DroppableStyles>
    <ColumnHeader className="mnw250">
    <input className="form-control mxw150" value={prefix}></input>
    <IconButton aria-label="delete" size="small" color="error">
        <DeleteIcon fontSize="inherit" />
      </IconButton>
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