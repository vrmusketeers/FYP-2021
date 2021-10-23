import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const DGraphContainer= () => {

  return (
    <Card>
      <CardHeader
        title="Image Viewer"
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 400,
            position: 'relative',
            padding:0
          }}
        >
          {/* This is the place where graph will go */}
          <iframe style={{width:'100%', height:'100%', border:0}} src="./static/index.html"></iframe>
        </Box>
      </CardContent>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          Overview
        </Button>
      </Box>
    </Card>
  );
};

export default DGraphContainer;