import React from "react";
import { Switch, Route } from "react-router";

import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import TasksForm from "./pages/Form";

const Routes: React.FC = () => {
    return (
        <Switch>
            <Route path = "/" exact component = {Home} />
            <Route path = "/tasks" exact component = {Tasks} />
            <Route path = "/register-task" exact component = {TasksForm} />
            <Route path = "/edit-task/:id" exact component = {TasksForm} />
        </Switch>
    );
}

export default Routes;