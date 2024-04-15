import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid'
import Badge from '@mui/material/Badge'
import CircularProgressWithLabel from '../components/ProgressRating';
import { Link } from "react-router-dom";

const IntanciaFilme = ({ filme }) => {
    return <>
        <Card sx={{ width: 190, height: 370 }} >
            <Link to={`/filme/${filme.id}`}>
                {filme.poster_path != null ?
                    <CardMedia
                        component="img"
                        alt={filme.title}
                        sx={{ height: 300 }}
                        image={`https://image.tmdb.org/t/p/w500${filme.poster_path}`}
                    />
                    :
                    <CardMedia
                        component="img"
                        alt={filme.title}
                        sx={{ height: 300 }}
                        image={"https://lightwidget.com/wp-content/uploads/localhost-file-not-found.jpg"}
                    />
                }
            </Link>
            <Badge
                badgeContent={<CircularProgressWithLabel value={filme.vote_average * 10} />}
                style={{ position: 'absolute' }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            />
            <CardContent>
                <Typography variant="inherit" color="text.primary">
                    <b>
                        {filme.title}
                    </b>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {filme.release_date}
                </Typography>
            </CardContent>
        </Card>
    </>
}

const ListaFilmes = ({ filmes }) => {
    
    return <>
        <Grid container sx={{ justifyContent: "center" }} spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {filmes.map((movie, index) => (
                <Grid item key={index}>
                    <IntanciaFilme filme={movie} />
                </ Grid>
            ))}
        </Grid>
    </>
}

export default ListaFilmes;