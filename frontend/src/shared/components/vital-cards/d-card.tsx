import React, { ReactElement } from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography
} from '@material-ui/core';
import { deepOrange, deepPurple, lightGreen, lightBlue } from '@material-ui/core/colors';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

interface DCardsProps {
  label: string;
  vitalValue: string;
  children: ReactElement;
  color: string;
}

enum Color {
  BLUE = 'blue',
  GREEN = 'green',
  PURPLE = 'purple',
  ORANGE = 'orange'
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    orange: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
    },
    purple: {
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
    },
    blue: {
      color: theme.palette.getContrastText(lightBlue[500]),
      backgroundColor: lightBlue[500],
    },
    green: {
      color: theme.palette.getContrastText(lightGreen[500]),
      backgroundColor: lightGreen[500],
    },
  }),
);


const DCard = (props: DCardsProps) => {
  const classes = useStyles();
  const iconColor = (color: string) => {
    switch (color) {
      case Color.BLUE:
        return classes.blue
      case Color.GREEN:
        return classes.green
      case Color.PURPLE:
        return classes.purple
      case Color.ORANGE:
        return classes.orange
    }
  }
  return (
    <Card>
      <CardContent>
        <Grid
          container
          spacing={3}
          justifyContent="space-between"
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              {props.label}
            </Typography>
            <Typography
              color="textPrimary"
              variant="h6"
            >
              {props.vitalValue}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar alt="Remy Sharp" className={iconColor(props.color)} >
              {props.children}
            </Avatar>
          </Grid>
        </Grid>
        <Box
          sx={{
            pt: 2,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <ArrowDownwardIcon />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="body2"
          >
            12%
          </Typography>
          <Typography
            color="textSecondary"
            variant="caption"
          >
            Since last month
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default DCard;