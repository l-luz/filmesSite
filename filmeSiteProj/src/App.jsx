import { useState, useEffect } from 'react';
import './App.css';
import ListaFilmes from './paginas/filmeList';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Certifique-se de que está importando Navigate aqui.
import InfoFilme from './paginas/filmeInfo';
import Container from '@mui/material/Container';
import { getHeaders } from '../header';
const App = () => {
    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: getHeaders()
        };

        fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options)
            .then(res => res.json())
            .then(res => {
                setFilmes(res.results);
                console.log(res.results)
            })
            .catch(err => console.error(err));
    }, [])


    return (
        <>
        <Router>
            <Navbar setFilmes={setFilmes}/>
            <div style={{ margin: '70px' }}></div>
            <Container>

            <Routes>
                <Route index element={<ListaFilmes filmes={filmes} />} />
                
                <Route path='/filme/:filmeId' element={<InfoFilme />} />
            </Routes>

                </Container>

        </Router>
        </>
    );
};

export default App;
