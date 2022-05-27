import React, { useEffect, useState } from 'react';
import StateService from "../../services/stateService";
import TaskService from "../../services/taskService";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import ColumnElement from "./ColumnElement";
import { useUserContext } from "../../context/userContext";
import { updateTaskStatus } from "../../slices/tasks";
import { selectAllStates, findStateByUserID } from "../../slices/states";
import { useDispatch, useSelector } from "react-redux";

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

const arr = [];
const lists =[];
const el = [];

/** Генерация новых задач */
const generateLists = () => 
lists.reduce(
    (acc, listKey) => ({ ...acc, [listKey]: getItems(listKey, el.filter(e => e['State'] == listKey))}),
{});

function TaskTable() {

  const states = useSelector(selectAllStates);

  const [elements, setElements] = React.useState();
  const [currentTask, setCurrentTask] = useState(initialTaskState);
  const { uid } = useUserContext();

  // удаление задачи из старой колонки
  const removeFromList = (list, index) => {
    console.log(states.states);
    const result = Array.from(list);
    const [removed] = result.splice(index, 1);
    return [removed, result];
  };

  // добавление задачи в новой колонке
  const addToList = (list, index, element, uid, state) => {
    const result = Array.from(list);
    element.status = state;
    element.uid = uid;
    updateStatus(element);
    result.splice(index, 0, element);
    return result;
  };

  const dispatch = useDispatch();

  const initialTaskState = {
    id: null,
    title: "",
    description: "",
    date_task: "",
    status: "",
    priority: ""
  }

  // обновление статуса задачи в БД
  const updateStatus = (element) => {
    dispatch(updateTaskStatus(element))
    .unwrap()
    .then(response => {
      console.log(response);
      setCurrentTask({...currentTask, status: element.status});
    });
  }

  // получить столбцы из БД
  const getState = uid => {
    /*StateService.get(uid)
      .then(response => {
        for (const doc of response.data) {
          arr.push(doc);
        }
        arr.map(list => {lists.push(list["Name"])});
      })
      .catch(e => {
        console.error(e);
      })*/
      dispatch(findStateByUserID(uid))
        .unwrap()
        .then(response => {
          for (const doc of response.data) {
            arr.push(doc);
          }
          arr.map(list => {lists.push(list["Name"])});
        })
  }

  // получить список задач из БД 
  const getTask = uid => {
    TaskService.get(uid)
      .then(response => {
        for (const doc of response.data) {
          el.push(doc);
        }
      })
      .catch(e => {
        console.error(e);
      })
  }

  useEffect(() => {
    getTask(uid);
    getState(uid);
    let mounted = true;
    setTimeout(() => {
      if(mounted) {
        setElements(generateLists());
      } 
    }, 500);
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
    removedElement,
    uid,
    result.destination.droppableId
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
