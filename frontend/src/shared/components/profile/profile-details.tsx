import React, { useCallback, useEffect, useState } from 'react';
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
  const [userProfile, setUserProfile] = useState({} as UserProfile);

  const getUserProfileData = useCallback(async () => {
    setUserProfile(await appStore.getUserById(userId) as unknown as UserProfile);
  }, [userId])

  useEffect(() => {
    getUserProfileData()
  }, [userId, getUserProfileData]);

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
          {renderTextFieldsWithLabels('FIRST NAME', appStore.getUsersProfile().patientName)}
          {renderTextFieldsWithLabels('EMAIL', appStore.getUsersProfile().email)}
          {renderTextFieldsWithLabels('PHONE', appStore.getUsersProfile().phone)}
          {renderTextFieldsWithLabels('COUNTRY', appStore.getUsersProfile().city)}
          {renderTextFieldsWithLabels('STATE', appStore.getUsersProfile().state)}
          {renderTextFieldsWithLabels('AGE', appStore.getUsersProfile().age?.toString())}
          {renderTextFieldsWithLabels('LAST VISIT', appStore.getUsersProfile().lastVisitDate?.toString())}
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