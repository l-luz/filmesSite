import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge'
import CircularProgressWithLabel from '../components/ProgressRating';
import { useParams } from "react-router-dom"
import { useEffect, useState } from 'react';
import { getHeaders } from '../header';
export default function InfoFilme({ filme }) {
    const { filmeId } = useParams();
    const [info, setInfo] = useState({});
    useEffect (() => {
        const options = {
            method: 'GET',
            headers: getHeaders()
          };
          
          fetch(`https://api.themoviedb.org/3/movie/${filmeId}?language=en-US`, options)
            .then(res => res.json())
            .then(res => setInfo(res))
            .then(res => console.log(res))
            .catch(err => console.error(err));
    }, []);


    return <>
        <Card sx={{ width: 190, height: 370 }}>
            <CardMedia
                component="img"
                alt={info.title}
                sx={{ maxHeight: 300 }}
                image={`https://image.tmdb.org/t/p/w500${info.poster_path}`}
            />

            <Badge
                badgeContent={<CircularProgressWithLabel value={info.vote_average * 10} />}
                style={{ position: 'absolute' }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            />

            <CardContent>
                <Typography variant="inherit" color="text.primary">
                    <b>
                        {info.title}

                    </b>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {info.release_date}
                </Typography>
            </CardContent>
        </Card>
    </>
}