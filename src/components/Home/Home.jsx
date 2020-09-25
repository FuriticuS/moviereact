import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {fetchGenre, fetchMovieByGenre, fetchMovies, fetchPersons, fetchTopRatedMovie} from "../../service";
//карусель
import RBCarousel from 'react-bootstrap-carousel';
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
//звезды для оценки фильмов
import ReactStars from "react-rating-stars-component/dist/react-stars";

import './Home.scss';
import Footer from "../Footer/Footer";


const Home = () => {

    //хук useState из service index.js имя и обложка
    const [nowPlaying, setNowPlaying] = useState([]);

    //хук useState из service index.js жанр (драмма, комедия и тд)
    const [genres, setGenres] = useState([]);

    //хук useState из service index.js сортировка по жанру (драмма, комедия и тд)
    const [movieByGenre, setMovieByGenre] = useState([]);

    //хук useState из service index.js популярные люди недели
    const [persons, setPerson] = useState([]);

    //хук useState из service index.js популярные фильмы
    const [topRated, setTopRated] = useState([]);

    //хук useEffect из service index.js имя и обложка, жанр и тд
    useEffect(()=> {
        const fetchAPI = async () => {
            setNowPlaying(await fetchMovies());
            setGenres(await fetchGenre());
            setMovieByGenre(await fetchMovieByGenre());
            setPerson(await fetchPersons());
            setTopRated(await fetchTopRatedMovie());
        }
        fetchAPI();
    },[]);

    //получение списка фильмов
    const movies = nowPlaying.slice(0, 5).map((item, index) => {
        return(
            <div key={index} style={{height:600, width: '100%'}}>
                <div className="carousel-center">
                    <img src={item.backPoster} alt={item.title} style={{height: 600}}/>
                </div>
                <div className="carousel-center">
                    <i className="fa fa-play-circle"></i>
                </div>
                <div className="carousel-caption" style={{textAlign:'center', fontSize:35}}>
                    {item.title}
                </div>
            </div>
        )
    });

    // onclick для genre - для выбора жанра
    const handleGenreClick = async (genre_id) => {
        setMovieByGenre(await fetchMovieByGenre(genre_id));
    }

    //получение жанра
    const genreList = genres.map((item, index) => {
        return (
            <li className="list-inline-item" key={index}>
                <button type="button" className="btn btn-outline-info" onClick={ () => {
                    handleGenreClick(item.id);
                }}>
                    {item.name}
                </button>
            </li>
        )
    });

    //cписок фильмов по жанрам
    const movieList = movieByGenre.slice(0,4).map((item, index) => {
        return(
            <div className="col-md-3 col-sm-6" key={index}>
                <div className="card" style={{border:'none'}}>
                    <Link to={`/movie/${item.id}`}>
                        <img src={item.poster} alt={item.title} className="img-fluid"/>
                    </Link>
                </div>
                <div className="mt-3">
                    <p style={{fontWeight:"bolder"}}>{item.title}</p>
                    <p>Рейтинг: {item.rating}</p>
                    <ReactStars count={10}
                                value={item.rating}
                                size={20}
                                color1={'#f4c10f'}>
                    </ReactStars>
                </div>
            </div>
        )
    });

    //cписок популярные люди недели
    const trendingPersons = persons.slice(0,4).map((p, index) => {
        return (
            <div className="col-md-3 text-center" key={index}>
                <img src={p.profileImg} alt={p.name} className="img-fluid rounded-circle mx-auto d-block"/>
                <p className="font-weight-bold text-center">{p.name}</p>
                <p className="font-weight-light text-center">Популярность в номинации: {p.know}</p>
            </div>
        )
    });

    //список популярных фильмов
    const topRadtingMovies = topRated.map((t, index) => {
        return(
            <div className="col-md-3 text-center"  key={index}>

                <div className="card" style={{border:'none'}}>
                    <Link to={`/movie/${t.id}`} style={{background: "transparent"}}>
                        <img src={t.poster} name={t.title} style={{width: '100%',height: 400}} className="img-fluid"/>
                    </Link>
                </div>

                <div className="mt-3 mb-3">
                    <p style={{fontWeight:'bolder'}}>{t.title}</p>
                    <p>Популярность: {t.popularity}</p>
                    <p>Дата релиза: {t.release_date}</p>
                    <p>Просмотров: {t.vote_count}</p>
                    <p>Оценка: {t.rating}</p>
                    <ReactStars
                        className={'all-stars'}
                        count={10}
                        value={t.rating}
                        size={20}
                        color1={'#f4c10f'}
                        style={{justifyContent: 'center'}}>
                    </ReactStars>
                </div>

            </div>
        );
    });

    return (
        <div className="container">

            <div className="row mt-0 ml-0 mr-0">
                <div className="col">
                    {/*карусель с помощью React bootstrap*/}
                    <RBCarousel
                        autoplay={true}
                        pauseOnVisibility={true}
                        slidesshowSpeed={500}
                        version={4}
                        indicators={false}>

                        {movies}
                    </RBCarousel>
                </div>
            </div>

            <div className="row mt-5 ml-0 mr-0">
                <div className="col">
                    <ul className='list-inline'>
                        {genreList}
                    </ul>
                </div>
            </div>

            {/*arrow right*/}
            <div className="row mt-3">
                <div className="col">
                    <div className="float-right">
                        <i className="far fa-arrow-alt-circle-right"></i>
                    </div>
                </div>
            </div>

             {/*MoveList*/}
            <div className="row mt-5 ml-0 mr-0">
                    {movieList}
            </div>

            <div className="row mt-5 ml-0 mr-0">

                <div className="col">
                    <p className="font-weight-bold" style={{color: '#5a606b', fontSize: 35}}>Популярные люди недели</p>
                </div>

            </div>

            {/*arrow right*/}
            <div className="row mt-3">
                <div className="col">
                    <div className="float-right">
                        <i className="far fa-arrow-alt-circle-right"></i>
                    </div>
                </div>
            </div>

            {/*trending person*/}
            <div className="row mt-5">
                {trendingPersons}
            </div>

            <div className="row mt-5 ml-0 mr-0">

                <div className="col">
                    <p className="font-weight-bold" style={{color: '#5a606b', fontSize: 35}}>Top rated movies</p>
                </div>

            </div>

            {/*arrow right*/}
            <div className="row mt-3">
                <div className="col">
                    <div className="float-right">
                        <i className="far fa-arrow-alt-circle-right"></i>
                    </div>
                </div>
            </div>

            {/*Top rated movies*/}
            <div className="row mt-5">
                {topRadtingMovies}
            </div>

            {/*footer*/}
            <Footer />
        </div>
    );
};

export default Home;
