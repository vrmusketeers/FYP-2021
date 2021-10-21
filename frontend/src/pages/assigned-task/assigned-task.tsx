import { Avatar, Box, Button, Card, Checkbox, Container, Grid, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from "@material-ui/core";
import React, { useState } from "react";
import DCard from "../../shared/components/vital-cards/d-card";
import PerfectScrollbar from 'react-perfect-scrollbar';
import GroupIcon from '@material-ui/icons/Group';
import DGraphContainer from "../../shared/components/graphs/graph-container";
import customers from '../../_mock/customers';
import AutorenewIcon from '@material-ui/icons/Autorenew';

interface AssignedTaskProps {

}

const AssignedTask: React.FC<AssignedTaskProps> = () => {
    const [limit, setLimit] = useState(20);
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