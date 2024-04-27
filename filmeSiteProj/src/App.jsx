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
    const [detail, setDetail] = useState(false);
    const [query, setQuery] = useState("");

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: getHeaders()
        };

        fetch('https://api.themoviedb.org/3/genre/movie/list?language=en&include_adult=false', options)
            .then(res => res.json())
            .then(res => {
                setGeneros(res.genres);
                console.log(res.genres)
            })
            .catch(err => console.error(err));

    }, []);

    return (
        <>
            <Router>
                <Navbar setFilmes={setFilmes} generos={generos} detail={detail}/>
                <div style={{ margin: '70px' }}></div>
                <Container>
                    <Routes>
                        <Route index element={<ListaFilmes filmes={filmes} setFilmes={setFilmes} setDetail={setDetail} detail={detail} />} />
                        <Route path='/filme/:filmeId' element={<InfoFilme generos={generos} setDetail={setDetail} />} />
                    </Routes>
                </Container>
            </Router>
        </>
    );
};

export default App;
