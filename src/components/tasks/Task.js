import React from "react";
import { Card } from "shards-react";

/* Колонка одного из состояний задачи */
const Task = () => (
      <Card>
            <div className="mb-1 input-group input-group-seamless">
                  <input id="nameColumn" className="form-control border-0" disabled="true" value=""></input>
                        <div className="input-group-append">
                              <button className="btn btn-outline-primary btn-sm">Создать задачу</button>
                        </div>
            </div>
      </Card>
);

export default Task; 