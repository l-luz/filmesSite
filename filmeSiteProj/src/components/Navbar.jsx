import { React, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { styled, alpha } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import SearchIcon from '@mui/icons-material/Search';
import MailIcon from '@mui/icons-material/Mail';
import { getHeaders } from '../header';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import MultipleSelectCheckbox from './MultipleSelectCheckbox';


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 300,
    },
}));


const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));


export default function NavBar({ setFilmes, generos }) {
    const [query, setQuery] = useState("");
    const [selGeneros, setSelGeneros] = useState([]);

    const searchTitle = (event) => {
        const options = {
            method: 'GET',
            headers: getHeaders()
        };
        fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US`, options)
            .then(res => res.json())
            .then(res => {
                setFilmes(res.results);
                console.log(res.results)
            })
            .catch(err => console.error(err));
    }

    const searchGenre = (event) => {
        var genres = "";

        selGeneros.forEach(function (el) {
            genres += el + ",";
        });
        const options = {
            method: 'GET',
            headers: getHeaders()
        };

        fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&with_genres=${genres}`, options)
            .then(res => res.json())
            .then(res => {
                setFilmes(res.results);
                console.log(res.results);
                setQuery("");
            })
            .catch(err => console.error(err));
    }

    return (
        <div>
            <AppBar
                position="fixed"
                sx={{
                    boxShadow: 0,
                    bgcolor: 'transparent',
                    backgroundImage: 'none',
                    mt: 2,
                }}
            >
                <Container maxWidth="lg">
                    <Toolbar
                        variant="regular"
                        sx={(theme) => ({
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexShrink: 0,
                            borderRadius: '999px',
                            bgcolor:
                                theme.palette.mode === 'light'
                                    ? 'rgba(255, 255, 255, 0.4)'
                                    : 'rgba(0, 0, 0, 0.4)',
                            backdropFilter: 'blur(24px)',
                            maxHeight: 40,
                            border: '1px solid',
                            borderColor: 'divider',
                            boxShadow:
                                theme.palette.mode === 'light'
                                    ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                                    : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
                        })}
                    >
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: 'flex',
                                alignItems: 'center',
                                ml: '-18px',
                                px: 0,
                            }}
                        >
                            <Typography style={{ margin: "5px" }} color={'black'} to={"/"} component={Link} >
                                <b>Top Filmes</b>
                            </Typography>

                            <Box sx={{ flexGrow: 1 }} />

                            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                                <Search>
                                    <StyledInputBase
                                        placeholder="Search…"
                                        inputProps={{ 'aria-label': 'search' }}
                                        onChange={(e) => setQuery(e.target.value)}
                                    />
                                    <IconButton onClick={(e) => searchTitle(e)}>
                                        <SearchIcon />
                                    </IconButton>
                                </Search>
                            </Box>
                            <Box sx={{ flexGrow: 1 }} />

                            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                                <MultipleSelectCheckbox title={"Gêneros"} options={generos} setSelected={setSelGeneros} />
                                <IconButton onClick={(e) => searchGenre(e, searchGenre)}>
                                    <SearchIcon />
                                </IconButton>
                            </Box>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
}


