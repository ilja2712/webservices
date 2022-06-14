import React, { useEffect, useState, useCallback } from 'react';
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import ColumnElement from "./ColumnElement";
import { useUserContext } from "../../context/userContext";
import { updateTaskStatus } from "../../slices/tasks";
import { selectAllStates, findStateByUserID } from "../../slices/states";
import { findTaskByUserID } from "../../slices/tasks";
import { selectAllTask } from "../../slices/tasks";
import { useDispatch, useSelector } from "react-redux";
import AddColumn from './AddColumn';

const ListGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

  // отображение задач
  const getItems = (status, el) => 
  Array.from(el, e => {
    return {
      id: `${e['ID_TASK']}`,
      status,
      content: e['Name'],
      description: e['Description'],
      priority: e['Priority'],
      date_task: e['Date_Task']
    };
  });

function TaskTable() {

  const initialTaskState = {
    id: null,
    content: "",
    description: "",
    date_task: "",
    status: "",
    priority: "",
    uid: ""
  }

  const states = useSelector(selectAllStates);
  const tasks = useSelector(selectAllTask);
  const [currentTask, setCurrentTask] = useState(initialTaskState);
  const { uid } = useUserContext();

  const dispatch = useDispatch();

  /** Генерация новых задач */
  const generateLists = () => 
  states.reduce(
    (acc, listKey) => ({ ...acc, [listKey['Name']]: getItems(listKey['Name'], tasks.filter(task => task['State'] == listKey['Name']))}),
  {});

  const [elements, setElements] = React.useState();

  // удаление задачи из старой колонки
  const removeFromList = (list, index) => {
    const result = Array.from(list);
    const [removed] = result.splice(index, 1);
    return [removed, result];
  };

  // добавление задачи в новой колонке
  const addToList = (list, index, element, status) => {
    const result = Array.from(list);
    element.status = status;
    element.uid = uid;
    setCurrentTask(element);
    updateStatus(element);
    result.splice(index, 0, element);
    return result;
  };

  // обновление статуса задачи в БД
  const updateStatus = (element) => {
    dispatch(updateTaskStatus(element))
    .unwrap()
    .then(response => {
      console.log(response);
    });

  }

  // получить столбцы из БД
  const getState = useCallback(uid => {
      dispatch(findStateByUserID(uid))
        .unwrap()
        .then(response => {
          console.log(response);
        })
  }, [dispatch])

  // получить список задач из БД 
  const getTask = useCallback(uid => {
    dispatch(findTaskByUserID(uid))
      .unwrap()
      .then(response => {
        console.log(response);
      })
      .catch(e => {
        console.error(e);
      })
  }, [dispatch]);

  useEffect(() => {
    let mounted = true;
    setTimeout(() => {
      if (mounted) {
        if (states.length == 0) {
          getState(uid);
          getTask(uid);
          console.log('getState')
        }
      }
    }, 100);
    return () => mounted = false;
  })

  useEffect(() => {
    let mounted = true;
    setTimeout(() => {
      if (mounted) {
        setElements(generateLists());
        console.log('setElements');
      } 
    }, 100);
    return () => mounted = false;
  }, [tasks])

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
    removedElement,
    result.destination.droppableId
  );

  setElements(listCopy);
  };

  return (
  <>{(elements) ? 
      <DragDropContext onDragEnd={onDragEnd}>
          <ListGrid className='columnBase'>
            {states && tasks && states.map((listKey, idx) => (
              <ColumnElement
                elements={elements[listKey['Name']]}
                key={listKey['Name']}
                status={listKey['Name']}
                id={idx}
                idl={listKey['ID_STATE']}
              />
            ))}
            <AddColumn />
          </ListGrid>
      </DragDropContext>
    : null}</>
  );
}

export default TaskTable;
