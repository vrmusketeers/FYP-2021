import { Avatar, Box, Button, Card, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@material-ui/core";
import React, { useState } from "react";
import PerfectScrollbar from 'react-perfect-scrollbar';
import { user_data } from '../../_mock/user-data';
import AutorenewIcon from '@material-ui/icons/Autorenew';

interface AssignedTaskProps {

}

const AssignedTask: React.FC<AssignedTaskProps> = () => {
    const [limit] = useState(20);
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
                                    Gender
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
                            {user_data.slice(0, limit).map((user) => (
                                <TableRow
                                    hover
                                    key={user.id}
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
                                                src={user.avatarUrl}
                                            >

                                                &nbsp;&nbsp; {user.name}
                                            </Avatar>
                                            <Typography
                                                color="textPrimary"
                                                variant="body1"
                                            >
                                                {user.name}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        {user.age}
                                    </TableCell>
                                    <TableCell>
                                        {`${user.gender}`}
                                    </TableCell>
                                    <TableCell>
                                        {user.phone}
                                    </TableCell>
                                    <TableCell>
                                        {user.createdAt}
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