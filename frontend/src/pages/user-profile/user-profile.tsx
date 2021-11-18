import { Box, Container, Grid } from "@material-ui/core";
import React from "react";
import ProfileDetails from "../../shared/components/profile/profile-details";
import ProfileSummary from "../../shared/components/profile/summary-card";
import { appStore } from "../../store/app-store";

interface UserProfileProps {

}

const UserProfile: React.FC<UserProfileProps> = () => {
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
              firstName={appStore.userProfile.firstName}
              lastName={appStore.userProfile.lastName}
              city={appStore.userProfile.city}
              state={appStore.userProfile.state} />
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