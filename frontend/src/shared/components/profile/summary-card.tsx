import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  createStyles,
  Divider,
  makeStyles,
  Theme,
  Typography
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  city: 'Los Angeles',
  country: 'USA',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith',
  timezone: 'GTM-7'
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(15),
      height: theme.spacing(15),
    },
  }),
);

interface ProfileSummaryI {
  firstName: string;
  lastName: string;
  city: string;
  state: string;
}

const ProfileSummary = (props: ProfileSummaryI) => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar alt="Remy Sharp" src={user.avatar} className={classes.large} />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h4"
          >
            {props.firstName}&nbsp;{props.lastName}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body1"
          >
            {`${props.city} ${props.state}`}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          color="primary"
          fullWidth
          variant="text"
          onClick={() => history.push('/dashboard')}
        >
          Visit Dashboard
        </Button>
      </CardActions>
    </Card>
  )
};

export default ProfileSummary;
