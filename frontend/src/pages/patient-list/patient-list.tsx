import { Avatar, Box, Card, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@material-ui/core";
import React, { useState } from "react";
import PerfectScrollbar from 'react-perfect-scrollbar';
import { customers } from '../../_mock/customers';
import SendIcon from '@material-ui/icons/Send';
import { useHistory } from 'react-router-dom';

interface PatientListProps {

}

const PatientList: React.FC<PatientListProps> = () => {
    const history = useHistory();

    const [limit] = useState(20);
    return (
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
                                    Registration date
                                </TableCell>
                                <TableCell>
                                    Visit Profile
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {customers.slice(0, limit).map((customer) => (
                                <TableRow
                                    hover
                                    key={customer.id}
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
                                                src={customer.avatarUrl}
                                            >

                                                &nbsp;&nbsp; {customer.name}
                                            </Avatar>
                                            <Typography
                                                color="textPrimary"
                                                variant="body1"
                                            >
                                                {customer.name}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        {customer.email}
                                    </TableCell>
                                    <TableCell>
                                        {`${customer.address.city}, ${customer.address.state}, ${customer.address.country}`}
                                    </TableCell>
                                    <TableCell>
                                        {customer.phone}
                                    </TableCell>
                                    <TableCell>
                                        {customer.createdAt}
                                    </TableCell>
                                    <TableCell>
                                        <IconButton color="primary" aria-label="delete" onClick={() => history.push('/profile')}>
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
    );
}


export default PatientList;