import React, { Suspense, useEffect } from 'react';
import getLists from "../../data/getData";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import ColumnElement from "./ColumnElement";
import {
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
  Button
} from "shards-react";

const ListGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 8px;
`;

// fake data generator
const getItems = (count, prefix) =>
// создание массива
  Array.from({ length: count }, (v, k) => k).map((k) => {
    const randomId = Math.floor(Math.random() * 1000);
    return {
      id: `item-${randomId}`,
      prefix,
      content: `item ${randomId}`
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

function TaskTable() {

  const arr = [];
  const [lists, setLists] = React.useState();

  // генерирует задачи в колонках
  const generateLists = () =>
      lists.reduce(
          (acc, listKey) => ({ ...acc, [listKey]: getItems(10, listKey)}),
      {}
  );

  getLists().then(data =>{
    for (const doc of data.docs) {
        console.log(doc.id, '=>', doc.data());
        arr.push(doc.data());
      }
      arr.map(list => {
          setLists(lists.push(list["columnName"]));
      })
  }).catch(error => {
    console.error(error);
  });

  const [elements, setElements] = React.useState(generateLists);

  console.log(elements);

  useEffect(() => {
    // перегенирируем колонки тасков
    setElements(generateLists());
  }, []);

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
    <Suspense fallback={<h1>Loading tasks...</h1>}>
      <DragDropContext onDragEnd={onDragEnd}>
        <ListGrid>
          {lists.map((listKey) => (
            <ColumnElement
              elements={elements[listKey]}
              key={listKey}
              prefix={listKey}
            />
          ))}
        </ListGrid>
      </DragDropContext>
      </Suspense>
  );
}

export default TaskTable;
