import { useParams } from "react-router-dom"
import { useEffect, useState } from 'react';
import { getHeaders } from '../header';
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import MainFeaturedPost from '../components/MainFeaturePost';


export default function InfoFilme({ filme }) {
    const { filmeId } = useParams();
    const [info, setInfo] = useState({});
    useEffect(() => {
        const options = {
            method: 'GET',
            headers: getHeaders()
        };

        fetch(`https://api.themoviedb.org/3/movie/${filmeId}?language=en-US&include_adult=false`, options)
            .then(res => res.json())
            .then(res => {
                res['release_year'] = setReleaseYear(info.release_date);
                setInfo(res);
                console.log(res);
            })
            .catch(err => console.error(err));

    }, []);

    const setReleaseYear = (date) => {
        var yearString = "" + date;
        yearString =  '(' + yearString.substring(0, 4) + ')';
        return yearString;
    }

    return <>
            <Container maxWidth="lg">
                <main>
                    <MainFeaturedPost 
                    post={{
                        title: info.title,
                        release_date: info.release_date,
                        release_year: info.release_year,
                        overview: info.overview,
                        genres: info.genres,
                        background: `https://image.tmdb.org/t/p/w500${info.backdrop_path}`,
                        cover: `https://image.tmdb.org/t/p/w500${info.poster_path}`,
                        imageText: 'main image description',
                        linkText: 'Continue reading…',
                     }} />
                </main>
            </Container>
    </>
}