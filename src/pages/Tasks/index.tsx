import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { HeaderTasks, TitleTasks, ButtonAddTask } from "./style";
import { useHistory } from "react-router-dom"; 
import moment from "moment";
import api from "../../services/api";

interface ITask {
    id: number,
    title: string,
    description: string,
    finish: boolean,
    updated_at: Date,
    created_at: Date
}

const Tasks: React.FC = () => {

    const [tasks, setTasks] = useState<ITask[]>([]);
    const history = useHistory();
    
    useEffect(() => {
        loadTasks()
    }, []);

    async function loadTasks() {
        const response = await api.get('/tasks');
        setTasks(response.data);
    }

    function formatDate(date: Date) {
        return moment(date).format("DD/MM/YY hh:mm:ss");
    }

    function newTask() {
        history.push('/register-task');
    }

    function editTask(id: number) {
        history.push(`/edit-task/${id}`);
    }

    function detailTask(id: number) {
        history.push(`/detail-task/${id}`);
    }

    return (
        <div className="container">
            <br />
            <HeaderTasks>
                <TitleTasks>Your Tasks</TitleTasks>
                <ButtonAddTask onClick={newTask}>New Task</ButtonAddTask>
            </HeaderTasks>
            <br /> 
            <Table striped bordered hover className="text-center">
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Updated</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tasks.map(task => (
                            <tr key={task.id}>
                                <td>{ task.id }</td>
                                <td>{ task.title }</td>
                                <td>{ task.finish ? "FINISHED" : "PENDING" }</td>
                                <td>{ formatDate(task.updated_at) }</td>
                                <td>
                                    <Button size="sm" onClick={() => {editTask(task.id)}}>Edit</Button>{' '}
                                    <Button size="sm" variant="success">Finish</Button>{' '}
                                    <Button size="sm" onClick={() => {detailTask(task.id)}} variant="info">View</Button>{' '}
                                    <Button size="sm" variant="danger">Delete</Button>{' '}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
    );
}

export default Tasks;