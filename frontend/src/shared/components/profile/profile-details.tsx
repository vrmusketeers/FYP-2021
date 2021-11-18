import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography
} from '@material-ui/core';
import { useParams } from "react-router-dom";
import { useMountEffect } from '../../hooks/useMountEffect';
import { appStore } from '../../../store/app-store';

const ProfileDetails = () => {
  const [values,] = useState({
    firstName: 'Katarina',
    lastName: 'Smith',
    email: 'demo@devias.io',
    phone: '+1-988-866-8975',
    state: 'Alabama',
    country: 'USA',
    age: '32',
    lastVisit: '09/12/2021'
  });

  let { userId } = useParams<{ userId: string }>();

  useMountEffect(()=>{
    appStore.getUserById(userId);
  });

  const renderTextFieldsWithLabels = (labelName: string, value: string) => {
    return (
      <React.Fragment>
        <Grid
          item
          md={6}
          xs={12}
        >
          <Typography
            color="textSecondary"
            gutterBottom
            variant="caption"
            display="block"
          >
            {labelName}
          </Typography>
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h6"
            display="block"
          >
            {value}
          </Typography>
        </Grid>
      </React.Fragment>
    )
  }

  return (
    <Card>
      <CardHeader
        subheader="Patients profile information along with vital details"
        title="Patients Profile"
      />
      <Divider />
      <CardContent>
        <Grid
          container
          spacing={3}
        >
          {renderTextFieldsWithLabels('FIRST NAME', values.firstName)}
          {renderTextFieldsWithLabels('LAST NAME', values.lastName)}
          {renderTextFieldsWithLabels('EMAIL', values.email)}
          {renderTextFieldsWithLabels('PHONE', values.phone)}
          {renderTextFieldsWithLabels('COUNTRY', values.country)}
          {renderTextFieldsWithLabels('STATE', values.state)}
          {renderTextFieldsWithLabels('AGE', values.age)}
          {renderTextFieldsWithLabels('LAST VISIT', values.lastVisit)}
        </Grid>
      </CardContent>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      >
        {/* <Button
          color="primary"
          variant="contained"
        >
          Save details
          </Button> */}
      </Box>
    </Card>
  );
};

export default ProfileDetails;