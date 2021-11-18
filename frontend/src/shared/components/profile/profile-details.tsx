import React, { useEffect } from 'react';
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
import { appStore } from '../../../store/app-store';

const ProfileDetails = () => {
  let { userId } = useParams<{ userId: string }>();

  useEffect(() => {
    appStore.getUserById(userId);
  }, [userId]);

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
          {renderTextFieldsWithLabels('FIRST NAME', appStore.getUsersProfile().firstName)}
          {renderTextFieldsWithLabels('LAST NAME', appStore.getUsersProfile().lastName)}
          {renderTextFieldsWithLabels('EMAIL', appStore.getUsersProfile().email)}
          {renderTextFieldsWithLabels('PHONE', appStore.userProfile.phone)}
          {renderTextFieldsWithLabels('COUNTRY', appStore.userProfile.city)}
          {renderTextFieldsWithLabels('STATE', appStore.userProfile.state)}
          {renderTextFieldsWithLabels('AGE', appStore.userProfile.dateOfBirth)}
          {renderTextFieldsWithLabels('LAST VISIT', appStore.userProfile.userID?.toString())}
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