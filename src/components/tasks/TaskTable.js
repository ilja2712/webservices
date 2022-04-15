import React from "react";
import Task from "./Task"
import { Card, CardHeader, CardBody } from "shards-react";
import { Component } from "react/cjs/react.production.min";
import Column from "./Column";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

/* Создание доски задач */
class TaskTable extends Component {

    constructor(props) {
        super(props); 
        this.state = {
            columns: []
        };

        // Добавление колонки
        this.handleClickAddColumn = () => {
            const columnName = document.getElementById("nameAddColumn");
            this.state.columns.push(new Column(columnName.value));
            this.setState({columns: this.state.columns});

            columnName.value = "";
            return;
        }

    }


    render() {
        const { columns } = this.state;

        return (
            <><DragDropContext>
                <Droppable droppableId="characters">
                    {columns.map((col, idx) => (
                        (provided) => (
                        <Card small className="mb-1 mr-2 mnh700" key={idx} {...provided.droppableProps} ref={provided.innerRef} >
                            <CardHeader className="border-bottom">
                                <div className="mb-1 input-group input-group-seamless">
                                    <input id="nameColumn" className="form-control border-0" disabled="true" value={col.columnName}></input>
                                    <div className="input-group-append">
                                        <button className="btn btn-outline-primary btn-sm">Добавить</button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardBody className="p-2 pb-2 mnw250">
                                <Task stateTask={col.columnName}/>
                            </CardBody>
                        </Card>)
                        ))}
                    </Droppable>
              </DragDropContext>
                    <CardHeader className="border-bottom mb-1 mr-1 mnw300">
                        <div className="mb-1 input-group input-group-seamless">
                            <input id="nameAddColumn" placeholder="Добавить колонку" className="form-control"></input>
                            <div className="input-group-append">
                                <button id="addColumn" className="btn btn-outline-primary btn-sm" onClick={this.handleClickAddColumn}>Добавить</button>
                            </div>
                        </div>
                    </CardHeader></>
        )
    }
}

export default TaskTable;