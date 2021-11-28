import { Avatar, Box, Button, Card, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import PerfectScrollbar from 'react-perfect-scrollbar';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import { useHistory } from "react-router-dom";
import { appStore } from "../../store/app-store";

interface AssignedTaskProps {

}

const AssignedTask: React.FC<AssignedTaskProps> = () => {
    const history = useHistory();
    const [userList, setUserList] = useState([] as PatientList[])

    useEffect(() => {
        setUserList(appStore.patientList as PatientList[]);
    }, []);

    return (
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
                                            color="primary" startIcon={<AutorenewIcon />}>
                                            Process FMRI
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </PerfectScrollbar>

        </Card>
    );
}


export default AssignedTask;