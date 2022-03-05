import React, {Component, Fragment} from 'react';
import HomePage from "../pages/HomePage";
import ProjectPage from "../pages/ProjectPage";
import CoursePage from "../pages/CoursePage";
import ServicePage from "../pages/ServicePage";
import ContactPage from "../pages/ContactPage";
import ClientReviewPage from "../pages/ClientReviewPage";
import {Route} from "react-router";

class AppRoute extends Component {
    render() {
        return (
            <Fragment>
                <switch>
                    <Route exact path="/" component={HomePage}></Route>
                    <Route exact path="/Project" component={ProjectPage}></Route>
                    <Route exact path="/Course" component={CoursePage}></Route>
                    <Route exact path="/Service" component={ServicePage}></Route>
                    <Route exact path="/Contact" component={ContactPage}></Route>
                    <Route exact path="/Review" component={ClientReviewPage}></Route>
                </switch>
            </Fragment>
        );
    }
}

export default AppRoute;
