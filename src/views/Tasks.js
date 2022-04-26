import React from "react";
import { Container, Row } from "shards-react";
import TaskTable from "../components/tasks/TaskTable";
import PageTitle from "../components/common/PageTitle";

const Tasks = () => {
  return (<Container fluid className="main-content-container px-4">
              {/* Заглавие страницы */}
              <Row noGutters className="page-header py-4">
                <PageTitle title="Задачи" subtitle="Dashboard" className="text-sm-left mb-3" />
              </Row>

              {/* Доска задач */}
              <Row> 
                  <TaskTable />
              </Row>

          </Container>
  )
};

export default Tasks;
