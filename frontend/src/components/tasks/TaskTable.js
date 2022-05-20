import React, { useEffect } from 'react';
import getState from "../../data/stateService";
import getTask from "../../data/taskService";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import ColumnElement from "./ColumnElement";
import { useUserContext } from "../../context/userContext";
//import {} from "shards-react";

const ListGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 8px;
`;

// отображение задач
const getItems = (prefix, el) => 
  Array.from(el, e => {
    return {
      id: `${e['ID_TASK']}`,
      prefix,
      content: e['Name'],
      description: e['Description'],
      priority: e['Priority'],
      date_task: e['Date_Task']
    };
  });

const removeFromList = (list, index) => {
  const result = Array.from(list);
  const [removed] = result.splice(index, 1);
  return [removed, result];
};

const addToList = (list, index, element) => {
  const result = Array.from(list);
  result.splice(index, 0, element);
  return result;
};

const arr = [];
const lists =[];
const el = [];
  
/** Генерация новых задач */
const generateLists = () => 
lists.reduce(
    (acc, listKey) => ({ ...acc, [listKey]: getItems(listKey, el.filter(e => e['State'] == listKey))}),
{});

function TaskTable() {

  const [elements, setElements] = React.useState();
  const { uid } = useUserContext();

  getTask(uid).then(response => {
    if (el.length == 0) {
      for (const doc of response.data) {
        el.push(doc);
      }
    }
  })
  
  getState().then(response => {
    if(lists.length == 0) {
      for (const doc of response.data) {
      arr.push(doc);
    }
    arr.map(list => {lists.push(list["Name"])});
  }
  }).catch(error => {
    console.error(error);
  });

  useEffect(() => {
    let mounted = true;
    setTimeout(() => {
      if(mounted) {
        setElements(generateLists());
      } 
    }, 400);

    return () => mounted = false;
  }, []);

  /** Отрисовка конечного положения задач в столбцах */
  const onDragEnd = (result) => {
  if (!result.destination) {
    return;
  }

  const listCopy = { ...elements };

  const sourceList = listCopy[result.source.droppableId];

  const [removedElement, newSourceList] = removeFromList(
    sourceList,
    result.source.index
  );
  listCopy[result.source.droppableId] = newSourceList;
  const destinationList = listCopy[result.destination.droppableId];
  listCopy[result.destination.droppableId] = addToList(
    destinationList,
    result.destination.index,
    removedElement
  );

  setElements(listCopy);
  };

  return (
  <DragDropContext onDragEnd={onDragEnd}>
    <ListGrid>
      {lists.map((listKey, idx) => (
        <ColumnElement
          elements={elements[listKey]}
          key={listKey}
          prefix={listKey}
          id={idx}
        />
      ))}
    </ListGrid>
  </DragDropContext>
  );
}

export default TaskTable;
