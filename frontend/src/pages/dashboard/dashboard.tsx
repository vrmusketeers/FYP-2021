import { Box, Card, CardContent, CardHeader, Container, Divider, Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import DCard from "../../shared/components/vital-cards/d-card";

import GroupIcon from '@material-ui/icons/Group';
import DGraphContainer from "../../shared/components/graphs/graph-container";
import { appStore } from "../../store/app-store";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";

interface DashboardProps {

}

const Dashboard: React.FC<DashboardProps> = observer(() => {
    let { userId } = useParams<{ userId: string }>();

    useEffect(() => {
        appStore.getPatientTestReports(userId)
    }, [userId]);

    const renderDCard = (label: string, vitalValue: string, color: string) => {
        return (
            <Grid
                item
                lg={3}
                sm={6}
                xl={3}
                xs={12}
            >
                <DCard label={label} vitalValue={vitalValue} color={color} date={appStore.patientTestReports && appStore.patientTestReports.length > 0 && appStore.patientTestReports[0][0]['lastVisitDate']}> 
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
                        {renderDCard("SOCIAL TOTAL A",  appStore.patientTestReports && appStore.patientTestReports.length > 0 && appStore.patientTestReports[0][0]['ADI_R_SOCIAL_TOTAL_A'], "blue")}
                        {renderDCard("VERBAL TOTAL BV",  appStore.patientTestReports && appStore.patientTestReports.length > 0 && appStore.patientTestReports[0][0]['ADI_R_VERBAL_TOTAL_BV'], "green")}
                        {renderDCard("RBR TOTAL C",  appStore.patientTestReports && appStore.patientTestReports.length > 0 && appStore.patientTestReports[0][0]['ADI_RRB_TOTAL_C'], "purple")}
                        {renderDCard("ONSET TOTAL D",  appStore.patientTestReports && appStore.patientTestReports.length > 0 && appStore.patientTestReports[0][0]['ADI_R_ONSET_TOTAL_D'], "orange")}
                        {renderDCard("AGE AT SCAN",  appStore.patientTestReports && appStore.patientTestReports.length > 0 && appStore.patientTestReports[0][0]['AGE_AT_SCAN'], "blue")}
                        {renderDCard("F IQ",  appStore.patientTestReports && appStore.patientTestReports.length > 0 && appStore.patientTestReports[0][0]['FIQ'], "green")}
                        {renderDCard("P IQ",  appStore.patientTestReports && appStore.patientTestReports.length > 0 && appStore.patientTestReports[0][0]['PIQ'], "purple")}
                        {renderDCard("ADOS SOCIAL",  appStore.patientTestReports && appStore.patientTestReports.length > 0 && appStore.patientTestReports[0][0]['ADOS_SOCIAL'], "orange")}
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
});


export default Dashboard;