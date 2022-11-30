import '../App.css';

import { Outlet } from "react-router-dom";
import { Helmet } from 'react-helmet';

const Title = (props) => {

    return (
        <>
            <Helmet>
                <title> {props.title} | SubjectTermMan </title>
                <style>{"body { background-color: lightblue; }"}</style>
            </Helmet>
            <Outlet />
        </>
    )
};

export default Title;