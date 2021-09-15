import { Box, Container, Grid } from "@material-ui/core";
import React from "react";
import Budget from "../../shared/components/vital-cards/total";

import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import GroupIcon from '@material-ui/icons/Group';
import LoopIcon from '@material-ui/icons/Loop';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';

interface DashboardProps {

}

const Dashboard: React.FC<DashboardProps> = () => {
    return (
        <React.Fragment>
            <Box
                sx={{
                    minHeight: '100%',
                    py: 3
                }}
            >
                <Container maxWidth={false}>
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            lg={3}
                            sm={6}
                            xl={3}
                            xs={12}
                        >
                            <Budget label="SOCIAL TOTAL A" vitalValue="123" color="blue">
                                <GroupIcon />
                            </Budget>
                        </Grid>
                        <Grid
                            item
                            lg={3}
                            sm={6}
                            xl={3}
                            xs={12}
                        >
                            <Budget label="VERBAL TOTAL BV" vitalValue="123" color="green">
                                <RecordVoiceOverIcon />
                            </Budget>
                        </Grid>
                        <Grid
                            item
                            lg={3}
                            sm={6}
                            xl={3}
                            xs={12}
                        >
                            <Budget label="RBR TOTAL C" vitalValue="123" color="purple">
                                <LoopIcon />
                            </Budget>
                        </Grid>
                        <Grid
                            item
                            lg={3}
                            sm={6}
                            xl={3}
                            xs={12}
                        >
                            <Budget label="ONSET TOTAL D" vitalValue="123" color="orange">
                                <HourglassEmptyIcon />
                            </Budget>
                        </Grid>
                        <Grid
                            item
                            lg={8}
                            md={12}
                            xl={9}
                            xs={12}
                        >
                            Sales
                        </Grid>
                        <Grid
                            item
                            lg={4}
                            md={6}
                            xl={3}
                            xs={12}
                        >
                            Traffic
                        </Grid>
                        <Grid
                            item
                            lg={4}
                            md={6}
                            xl={3}
                            xs={12}
                        >
                            Latest Products
                        </Grid>
                        <Grid
                            item
                            lg={8}
                            md={12}
                            xl={9}
                            xs={12}
                        >
                            LAtest Orders
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </React.Fragment>
    )
}


export default Dashboard;