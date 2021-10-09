import React, { useState, ChangeEvent, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom"; 
import api from "../../services/api";
import { HeaderTasks, TitleTasks, ButtonAddTask } from "../Tasks/style";

interface ITask {
    title: string,
    description: string,
}

interface IParams {
    id: string,
}

const Tasks: React.FC = () => {

    const history = useHistory();
    const { id } = useParams<IParams>();
    const [model, setModel] = useState<ITask>({
        title: '',
        description: '',
    }); 

    useEffect(() => {
        if(id) { findTask(id) };
    }, [id]);

    function updateModel(e: ChangeEvent<HTMLInputElement>) {
        setModel({
            ...model,
            [e.target.name]: e.target.value
        });
    }

    async function submitTask(e: ChangeEvent<HTMLFormElement>) {   
        e.preventDefault();
        if(id) {
            const response = await api.put(`/task-update/${id}`, model);
        }
        else {
            const response = await api.post("/task-save", model);
        }
        backToTasks();
    }

    async function findTask(id: string) {
        const response = await api.get<ITask>(`/tasks/${id}`);
        setModel({
            title: response.data.title,
            description: response.data.description
        });
    } 

    function backToTasks() {
        history.goBack();
    }

    return (
        <div className="container">
            <br />
            <HeaderTasks>
                <TitleTasks>Add new task</TitleTasks>
                <ButtonAddTask onClick={backToTasks}>Back</ButtonAddTask>
            </HeaderTasks>
            <br />  
            <div className="container">
            <Form onSubmit={submitTask}>
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Title..." value={model.title} name="title" onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} name="description" value={model.description} onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} />
                </Form.Group>
                <Button variant="dark" type="submit">
                    Save
                </Button>
            </Form>
            </div>
        </div>
    );
}

export default Tasks;