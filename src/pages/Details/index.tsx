import React, { useEffect, useState } from "react";
import { Badge, Card } from "react-bootstrap";
import { useHistory, useParams } from "react-router";
import { HeaderTasks, TitleTasks, ButtonAddTask } from "../Tasks/style";
import moment from "moment";
import api from "../../services/api";

interface ITask {
    id: number,
    title: string,
    description: string,
    finish: boolean,
    created_at: Date,
    updated_at: Date,
}

interface IParams {
    id: string,
}

const Detail: React.FC = () => {

    const { id } = useParams<IParams>();
    const history = useHistory();
    const [task, setTask] = useState<ITask>();

    useEffect(() => {
        findTask();
    },[])

    function formatDate(date: Date|undefined) {
        if(date) return moment(date).format("DD/MM/YY hh:mm:ss");
    }

    async function findTask() {
        const response = await api.get<ITask>(`/tasks/${id}`);
        console.log(response);
        setTask(response.data);
    }

    function backToTasks() {
        history.goBack();
    }

    return (
        <div className="container">
            <br />
            <HeaderTasks>
                <TitleTasks>View your task</TitleTasks>
                <ButtonAddTask onClick={backToTasks}>Back</ButtonAddTask>
            </HeaderTasks>
            <br /> 
            <Card>
                <Card.Body>
                    <Card.Title>{ task?.title }</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{ task?.description }</Card.Subtitle>
                    <br />
                    <p>{task?.finish ? "FINISHED :)" : "PENDING..."}</p>
                    <strong>Created: </strong><p>{ formatDate(task?.created_at) }</p>
                    <br />
                    <strong>Updated: </strong><p>{ formatDate(task?.updated_at) }</p>
                </Card.Body>
            </Card>
        </div> 
    );
}

export default Detail;