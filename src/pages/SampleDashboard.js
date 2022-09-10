import { Button, Heading, Text } from "@chakra-ui/react";
import React, { Fragment } from "react";

const Dashboard = ({ setAuth }) => {
    console.log('Dashboard');
    return (
        <Fragment>
            <Heading>Dashboard Placeholder Page</Heading>
            <Text>Just need to replace this with the actual dashboard later on. Or the homepage.</Text>
            <Button onClick={() => setAuth(false)}>Log Out</Button>
        </Fragment>
    )
}

export default Dashboard;