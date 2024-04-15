import { useState, useEffect } from 'react';
import './App.css';
import ListaFilmes from './paginas/filmeList';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  
import InfoFilme from './paginas/filmeInfo';
import Container from '@mui/material/Container';
import { getHeaders } from './header';


const App = () => {
    const [filmes, setFilmes] = useState([]);
    const [generos, setGeneros] = useState([]);
    useEffect(() => {
        const filme_opt = {
            method: 'GET',
            headers: getHeaders()
        };

        fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US&include_adult=false', filme_opt)
            .then(res => res.json())
            .then(res => {
                setFilmes(res.results);
                console.log(res.results)
            })
            .catch(err => console.error(err));
        const genero_opt = {
            method: 'GET',
            headers: getHeaders()
        };

        fetch('https://api.themoviedb.org/3/genre/movie/list?language=en&include_adult=false', genero_opt)
            .then(res => res.json())
            .then(res => {
                setGeneros(res.genres);
                console.log(res.genres)
            })
            .catch(err => console.error(err));

    }, [])

    return (
        <>
            <Router>
                <Navbar setFilmes={setFilmes} generos={generos} />
                <div style={{ margin: '70px' }}></div>
                <Container>
                    <Routes>
                        <Route index element={<ListaFilmes filmes={filmes} />} />
                        <Route path='/filme/:filmeId' element={<InfoFilme generos={generos}/>} />
                    </Routes>
                </Container>
            </Router>
        </>
    );
};

export default App;
