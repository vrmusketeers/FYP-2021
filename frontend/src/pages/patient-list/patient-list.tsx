import { Avatar, Box, Card, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import PerfectScrollbar from 'react-perfect-scrollbar';
import SendIcon from '@material-ui/icons/Send';
import { useHistory } from 'react-router-dom';
import { appStore } from "../../store/app-store";
import { observer } from "mobx-react-lite";

interface PatientListProps {

}

const PatientList: React.FC<PatientListProps> = observer(() => {
    const history = useHistory();
    const [userList, setUserList] = useState([] as PatientList[])

    useEffect(() => {
        setUserList(appStore.patientList as PatientList[]);
    }, []);

    return (
        <>
            <Typography align="left" variant="h5">
                PROCESSED PATIENTS RECORDS
            </Typography>
            <br />
            <Card>
                <PerfectScrollbar>
                    <Box sx={{ minWidth: 1050 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell padding="checkbox">
                                    </TableCell>
                                    <TableCell>
                                        Name
                                    </TableCell>
                                    <TableCell>
                                        Email
                                    </TableCell>
                                    <TableCell>
                                        Location
                                    </TableCell>
                                    <TableCell>
                                        Phone
                                    </TableCell>
                                    <TableCell>
                                        Date of Birth
                                    </TableCell>
                                    <TableCell>
                                        Visit Profile
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {userList.length > 0 && userList.filter(user => user.processed === 1).map((user) => (
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
                                            {user.email}
                                        </TableCell>
                                        <TableCell>
                                            {user.city},{user.state}
                                        </TableCell>
                                        <TableCell>
                                            {user.phone}
                                        </TableCell>
                                        <TableCell>
                                            {user.dateOfBirth}
                                        </TableCell>
                                        <TableCell>
                                            <IconButton color="primary" aria-label="delete" onClick={() => history.push('/profile/' + user.patientId)}>
                                                <SendIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                </PerfectScrollbar>

            </Card>
        </>
    );
});


export default PatientList;