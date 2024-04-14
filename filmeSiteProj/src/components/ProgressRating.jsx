import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function CircularProgressWithLabel(props) {
    return (
        <Box sx={{
            position: 'relative',
            display: 'inline-flex',
            borderRadius: '50%',
            backgroundColor: 'white'
        }} >
            <CircularProgress variant="determinate" size={30} thickness={5} {...props} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="caption" component="div" >
                    <b>{`${Math.round(props.value)}%`}</b>
                </Typography>
            </Box>
        </Box>
    );
}

