import { Box, Container, Grid } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProfileDetails from "../../shared/components/profile/profile-details";
import ResultCard from "../../shared/components/profile/result-card";
import ProfileSummary from "../../shared/components/profile/summary-card";
import { appStore } from "../../store/app-store";

interface UserProfileProps {

}

const UserProfile: React.FC<UserProfileProps> = () => {
  let { userId } = useParams<{ userId: string }>();
  const [userProfile, setUserProfile] = useState({} as UserProfile);

  const getUserProfileData = useCallback(async () => {
    setUserProfile(await appStore.getUserById(userId) as unknown as UserProfile);
  }, [userId])

  useEffect(() => {
    getUserProfileData()
  }, [userId, getUserProfileData]);
  return (
    <Box
      sx={{
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
            <ProfileSummary
              fullName={appStore.getUsersProfile().patientName}
              city={appStore.getUsersProfile().city}
              state={appStore.getUsersProfile().state}
              userId={userId}
              testResults={appStore.getUsersProfile().testresult} />
            <br />
            <ResultCard result={appStore.getUsersProfile().testresult}></ResultCard>
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            <ProfileDetails />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}


export default UserProfile;