import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider} from '@material-ui/core';

const DGraphContainer= () => {

  return (
    <Card>
      <CardHeader
        title="3D Viewer"
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: 'relative',
            padding:0
          }}
        >
          {/* This is the place where graph will go */}
          <iframe title='iframe' style={{width:'100%', height:'100%', border:0}} src="./static/index.html"></iframe>
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
      </Box>
    </Card>
  );
};

export default DGraphContainer;