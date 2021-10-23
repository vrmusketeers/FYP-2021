import { Box, Card, CardContent, CardHeader, Container, Divider, Grid } from "@material-ui/core";
import React from "react";
import DCard from "../../shared/components/vital-cards/d-card";

import GroupIcon from '@material-ui/icons/Group';
import DGraphContainer from "../../shared/components/graphs/graph-container";

interface DashboardProps {

}

const Dashboard: React.FC<DashboardProps> = () => {

    const renderDCard = (label: string, vitalValue: string, color: string) => {
        return (
            <Grid
                item
                lg={3}
                sm={6}
                xl={3}
                xs={12}
            >
                <DCard label={label} vitalValue={vitalValue} color={color}>
                    <GroupIcon />
                </DCard>
            </Grid>
        );
    }
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
                        {renderDCard("SOCIAL TOTAL A", "123", "blue")}
                        {renderDCard("VERBAL TOTAL BV", "123", "green")}
                        {renderDCard("RBR TOTAL C", "123", "purple")}
                        {renderDCard("ONSET TOTAL D", "123", "orange")}
                        {renderDCard("SOCIAL TOTAL A", "123", "blue")}
                        {renderDCard("VERBAL TOTAL BV", "123", "green")}
                        {renderDCard("RBR TOTAL C", "123", "purple")}
                        {renderDCard("ONSET TOTAL D", "123", "orange")}
                        <Grid
                            item
                            lg={8}
                            md={12}
                            xl={9}
                            xs={12}
                        >
                            <DGraphContainer />
                        </Grid>
                        <Grid
                            item
                            lg={4}
                            md={6}
                            xl={3}
                            xs={12}
                        >
                            <Card>
                                <CardHeader
                                    title="Voxel Intensity"
                                />
                                <Divider />
                                <CardContent >
                                    <Box
                                        sx={{
                                            height: 300,
                                            position: 'relative',
                                            padding: 0
                                        }}
                                    >
                                        <img alt="Voxel Images" style={{ height: '100%', width: '100%' }} src='./static/images/carpet_plot.png'></img>
                                    </Box>
                                </CardContent>
                            </Card>

                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </React.Fragment >
    )
}


export default Dashboard;