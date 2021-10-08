import React from "react";
import { Switch, Route } from "react-router";

import Home from "./pages/Home";
import Tasks from "./pages/Tasks";

const Routes: React.FC = () => {
    return (
        <Switch>
            <Route path = "/" exact component = {Home} />
            <Route path = "/tasks" exact component = {Tasks} />
        </Switch>
    );
}

export default Routes;