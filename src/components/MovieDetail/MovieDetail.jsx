import React, {useEffect, useState} from 'react';
import {fetchCasts, fetchMovieDetail, fetchMovieVideos, fetchSimilarMovie} from "../../service";
import Footer from "../Footer/Footer";
import {Link} from "react-router-dom";
import DetailFilm from "../DeatailFilm/DetailFilm";

//bootstrap компоненты
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import {Modal} from "react-bootstrap";
import ReactPlayer from "react-player";
import ReactStars from "react-rating-stars-component";

import './MovieDetail.scss';

const  MovieDetail = ({match}) => {

    let params = match.params;
    // пустой массив для получения жанров
    let genres = [];

    //хук useState для получения деталей одного фильма
    const [detail, setDetail] = useState([]);

    //хук useState для получения актеров
    const [casts, setCasts] =  useState([]);

    //хук useState для получения похожие фильмы
    const [similarMovies, setSimilarMovies] = useState([])

    //хук useEffect получение id фильма которого выбрали
    useEffect(() => {
        const fetchAPI = async () => {
            setDetail(await fetchMovieDetail(params.id))
            setVideo(await fetchMovieVideos(params.id))
            setCasts(await fetchCasts(params.id));
            setSimilarMovies(await fetchSimilarMovie(params.id))
        }
        fetchAPI();
    },[])

    // хук useState для включения фильма
    const [isOpen, setIsOpen] = useState(false);

    // хук useState для воспроизведения фильма
    const [video, setVideo] = useState([]);

    // onclick для включения фильма
    const MoviePlayerModal = (props) => {
        const youtubeUrl = 'https://www.youtube.com/watch?v=';
        return (
            <Modal
            {...props}
            size='lg'
            aria-labelledby="contained-modal-title-vcenter"
            centered>
                <Modal.Header closeButton>
                    <Modal.Title
                    id="contained-modal-title-vcenter"
                    style={{color:'#000000', fontWeight:'bolder'}}>
                        {detail.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{background:'#000000'}}>
                    <ReactPlayer
                        className="container-fluid"
                        url={youtubeUrl+video.key}
                        playing
                        width="100%">

                    </ReactPlayer>
                </Modal.Body>
            </Modal>
        )
    }

    // получение жанра
    genres = detail.genres;

    //получение списка жанров
    let genresList;
    if (genres) { genresList = genres.map((g, i) => {
        return (
            <li className="list-inline-item" key={i}>
                <button type="button" className="btn btn-outline-info" >{g.name}</button>
            </li>
        )
    })}


    //получение актеров первые 4 в списке
    const castsList = casts.slice(0,4).map((casts, index)=> {
        return (
            <div className="col-md-3 text-center" key={index}>
                <img src={casts.img} alt={casts.name} className="img-fluid rounded-circle mx-auto d-block"/>
                <p className="font-weight-bold text-center">{casts.name}</p>
                <p className="font-weight-light text-center">{casts.character}</p>
            </div>
        )
    });

    //получение похожих фильмов первые 4 в списке
    const similarMoviesList = similarMovies.slice(0,4).map((sim, index)=>{
        return(
            <div className="col-md-3 text-center"  key={index}>

                <div className="card" style={{border:'none'}}>
                    <Link to={`/movie/${sim.id}`} style={{background: "transparent"}}>
                        <img src={sim.poster} name={sim.title} style={{width: '100%',height: 400}} className="img-fluid"/>
                    </Link>
                </div>

                <div className="mt-3 mb-3">
                    <p style={{fontWeight:'bolder'}}>{sim.title}</p>
                    <p>Популярность: {sim.popularity}</p>
                    <p>Дата релиза: {sim.release_date}</p>
                    <p>Просмотров: {sim.vote_count}</p>
                    <p>Оценка: {sim.rating}</p>
                    <ReactStars
                        className={'all-stars'}
                        count={10}
                        value={sim.rating}
                        size={20}
                        color1={'#f4c10f'}
                        style={{justifyContent: 'center'}}>
                    </ReactStars>
                </div>

            </div>
        );
    })

    return (
        <div className="container">

            {/*главная обложка + трейлер фильма с youtube*/}
            <div className="row mt-0">

                <MoviePlayerModal
                    show={isOpen}
                    onHide={ ()=> {
                        setIsOpen(false);
                    }}>

                </MoviePlayerModal>

                <div className="col text-center" style={{width: '100%'}}>
                    <img src={`http://image.tmdb.org/t/p/original/${detail.backdrop_path}`} alt={detail.title} className="img-fluid"/>
                    <div className="carousel-center">
                        <i
                            onClick={()=> setIsOpen(true)}
                            className="fa fa-play-circle">
                        </i>
                    </div>
                    <div className="carousel-caption" style={{textAlign:'center', fontSize:35}}>
                        {detail.title}
                    </div>
                </div>
            </div>

            {/*жанр*/}
            <div className="row mt-5">
                <div className="col">
                    <p style={{color:'#5a606b', fontWeight:'bolder'}}>ЖАНР</p>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col">
                    {genresList}
                </div>
            </div>

            {/*описание*/}
            <div className="row mt-3">
                <div className="col">
                    <div className="text-center">
                        <ReactStars
                            className={'all-stars'}
                            count={detail.vote_average}
                            size={20}
                            color1={'#f4c10f'}>
                        </ReactStars>
                    </div>
                    <div className="mt-3">
                        <p style={{color: "#5a606b", fontWeight:"bold", textTransform: "uppercase"}}>Описание</p>
                        {detail.overview}
                    </div>
                </div>
            </div>

            {/*характеристики фильм плюс ссылка*/}
            <DetailFilm match={match}/>

            {/*актеры*/}
            <div className="row mt-5">
                <div className="col">
                    <p style={{color:'#5a606b', fontWeight:'bolder'}}>В ролях:</p>
                </div>
            </div>

            <div className="row mt-3">
                {castsList}
            </div>

            {/*похожие фильмы*/}
            <div className="row mt-5">
                <div className="col">
                    <p style={{color:'#5a606b', fontWeight:'bolder'}}>Похожие фильмы</p>
                </div>
            </div>

            <div className="row mt-3">
                {similarMoviesList}
            </div>

            {/*footer*/}
            <Footer />

        </div>
    );
};

export default MovieDetail;
