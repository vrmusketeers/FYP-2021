import { Avatar, Box, Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import PerfectScrollbar from 'react-perfect-scrollbar';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import { useHistory } from "react-router-dom";
import { appStore } from "../../store/app-store";

interface AssignedTaskProps {

}

const AssignedTask: React.FC<AssignedTaskProps> = () => {
    const history = useHistory();
    const [userList, setUserList] = useState([] as PatientList[])
    const [open, setOpen] = useState(false);
    const [currentId, setCurrentId] = useState(0);
    const [message, setMessage] = useState('Your FMRI data is being Processed. Please stay with us to know your results')

    useEffect(() => {
        setUserList(appStore.patientList as PatientList[]);
    }, []);

    const handleClose = useCallback(() => {
        appStore.userList = [];
        appStore.getPatientsList();
        setOpen(false);
        history.push('/dashboard/' + currentId)
    }, [currentId,history]);

    const handleProcessFmri = useCallback(async (userId: number) => {
        setOpen(true);
        setCurrentId(userId)
        console.log(currentId)
        let finalVal = '';
        await appStore.processFmri(userId);
        if (appStore.processedData === 0) {
            finalVal = 'NEGATIVE'
        } else {
            finalVal = 'POSITIVE'
        }
        setMessage('The test results after analyzing the FMRI reports of the patients turned out to be:' + finalVal)
    }, [currentId]);

    return (
        <>
            <Typography align="left" variant="h5">
                UNPROCESSED PATIENTS RECORDS
            </Typography>
            <br />
            <Card>
                <PerfectScrollbar>
                    <Box sx={{ minWidth: 1050 }}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell padding="checkbox">
                                    </TableCell>
                                    <TableCell>
                                        Name
                                    </TableCell>
                                    <TableCell>
                                        Age
                                    </TableCell>
                                    <TableCell>
                                        MRN No.
                                    </TableCell>
                                    <TableCell>
                                        Registration date
                                    </TableCell>
                                    <TableCell>
                                        Run Analysis
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {userList.length > 0 && userList.filter(user => user.processed === 0).map((user) => (
                                    <TableRow
                                        hover
                                        key={user.MRNNo}
                                    >
                                        <TableCell padding="checkbox">
                                        </TableCell>
                                        <TableCell>
                                            <Box
                                                sx={{
                                                    alignItems: 'center',
                                                    display: 'flex'
                                                }}
                                            >
                                                <Avatar
                                                    style={{ marginRight: 20 }}
                                                    src={'/static/images/avatars/avatar_' + Math.floor(Math.random() * 10) + '.png'}
                                                >

                                                    &nbsp;&nbsp; {user.patientName}
                                                </Avatar>
                                                <Typography
                                                    color="textPrimary"
                                                    variant="body1"
                                                >
                                                    {user.patientName}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            {user.age}
                                        </TableCell>
                                        <TableCell>
                                            {user.phone}
                                        </TableCell>
                                        <TableCell>
                                            {user.lastVisitDate}
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="contained"
                                                color="primary" startIcon={<AutorenewIcon />}
                                                onClick={() => handleProcessFmri(user.patientId)}>
                                                Process FMRI
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                </PerfectScrollbar>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Using Bi-Directional LSTM to Predict Autism"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {message}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary" autoFocus>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>

            </Card>
        </>

    );
}


export default AssignedTask;