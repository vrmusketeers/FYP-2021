import {
    Box,
    Card,
    CardContent,
    Divider,
    Typography
} from '@material-ui/core';

interface ResultCardI {
    result?: string;
}

const ResultCard = (props: ResultCardI) => {
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
                    <Typography
                        color="textPrimary"
                        gutterBottom
                        variant="h4"
                    >
                        TEST RESULT
                    </Typography>
                    <Typography
                        color="textSecondary"
                        variant="body1"
                    >
                        {props.result && props.result === '0' ? 'NEGATIVE' : 'POSITIVE'}
                    </Typography>
                </Box>
            </CardContent>
            <Divider />
        </Card>
    )
};

export default ResultCard;
