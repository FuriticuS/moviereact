import axios from 'axios';

const apiKey = '312736e2dbd2b57c078fba1885e6ac5d';
const url = 'https://api.themoviedb.org/3';
const nowPlayingUrl = `${url}/movie/now_playing`;
const topRatedUrl = `${url}/movie/top_rated`;
const movieUrl = `${url}/movie`;
const genreUrl = `${url}/genre/movie/list`;
const moviesUrl = `${url}/discover/movie`;
const personUrl = `${url}/trending/person/week`;

// запросы на API для фильмов (где я зарегался + сделал apiKey + где есть документашка)
export const fetchMovies = async () => {
    try {
        const {data} = await axios.get(nowPlayingUrl, {
            params: {
                api_key: apiKey,
                language: 'ru_RUS',
                page: 1
            }
        })

        // переменная для адреса
        const posterUrl = 'https://image.tmdb.org/t/p/original/';

        // все данные с api сервера - id, имя фильмы, картинка и тд
        const modifiedData = data['results'].map((m)=> ({
            id: m['id'],
            title: m['title'],
            poster: posterUrl + m['poster_path'],
            backPoster: posterUrl + m['backdrop_path'],
            popularity: m['popularith'],
            overview: m['overview'],
            rating: m['vote_average']
        }))

        return modifiedData;
    } catch(error){

    }
}

// запрос на получения фильмов для рейтинга
export const fetchGenre = async() => {
    try{
        const {data} = await axios.get(genreUrl, {
            params: {
                api_key: apiKey,
                language: 'ru_RUS',
                page: 1
            }
        });

        // все данные с api сервера - id, имя фильмы, картинка и тд
        const modifiedData = data['genres'].map((g)=> ({
            id: g['id'],
            name: g['name']
        }))

        return modifiedData;
    } catch(error){}
}

// запрос на получения фильмов по жанру
export const fetchMovieByGenre = async(genre_id) => {
    try{
        const {data} = await axios.get(moviesUrl, {
            params: {
                api_key: apiKey,
                language: 'ru_RUS',
                page: 1,
                with_genres: genre_id
            }
        })

        // переменная для адреса
        const posterUrl = 'https://image.tmdb.org/t/p/original/';

        // все данные с api сервера - id, имя фильмы, картинка и тд
        const modifiedData = data['results'].map((m)=> ({
            id: m['id'],
            title: m['title'],
            poster: posterUrl + m['poster_path'],
            backPoster: posterUrl + m['backdrop_path'],
            popularity: m['popularith'],
            overview: m['overview'],
            rating: m['vote_average']
        }))

        return modifiedData;

    }catch(error){}
}

// запрос на популярные люди недели
export const fetchPersons = async() => {
    try{
        const {data} = await axios.get(personUrl, {
            params: {
                api_key: apiKey
            }
        })
        // все данные с api сервера - id, имя фильмы, картинка и тд
        const modifiedData = data['results'].map((p)=> ({
            id: p['id'],
            name: p['name'],
            popularity:p['popularity'],
            profileImg: 'http://image.tmdb.org/t/p/w200'+ p['profile_path'],
            know: p['known_for_department']
        }));

        return modifiedData;
    }catch(error){}
}

export const fetchTopRatedMovie = async() => {
    try{
        const {data} = await axios.get(topRatedUrl, {
            params: {
                api_key: apiKey,
                language: 'ru_RUS',
                page: 1,
            }
        })

        const modifiedData = data['results'].map((t) => ({
            id: t['id'],
            title: t['title'],
            poster: 'https://image.tmdb.org/t/p/original/'+ t['poster_path'],
            popularity: t['popularity'],
            release_date: t['release_date'],
            vote_count: t['vote_count'],
            rating: t['vote_average']
        }));

        return modifiedData;

    }catch(error){}
}

// запрос на подробный обзор одного фильма
export const fetchMovieDetail = async(id) => {
    try{
        const {data} = await axios.get(`${movieUrl}/${id}`, {
            params: {
                api_key: apiKey,
                language: 'ru_RUS'
            }
        });
        return data;
    }catch(error){}
}

// запрос на получение видео ролика
export const fetchMovieVideos = async(id) => {
    try{
        const {data} = await axios.get(`${movieUrl}/${id}/videos`, {
            params: {
                api_key: apiKey
            }
        });
        return data['results'][0];

    }catch(error){}
}

// запрос на получение актеров
export const fetchCasts = async(id) => {
    try{
        const {data} = await axios.get(`${movieUrl}/${id}/credits`, {
            params: {
                api_key: apiKey
            }
        })

        const modifiedData = data['cast'].map((c) => ({
            id: c['cast_id'],
            character: c['character'],
            name:c['name'],
            img: 'https://image.tmdb.org/t/p/w200'+ c['profile_path']
        }))

        return modifiedData;
    }catch(error){}
}

// запрос на получение похожих фильмов
export const fetchSimilarMovie = async(id) => {
    try{
        const {data} = await axios.get(`${movieUrl}/${id}/similar`, {
            params:{
                api_key: apiKey,
                language: 'ru_RUS'
            }
        })

        const posterUrl = 'https://image.tmdb.org/t/p/original/';
        const modifieldData = data['results'].map((s) => ({
            id: s['id'],
            title: s['title'],
            poster: posterUrl + s['poster_path'],
            backPoster: posterUrl + s['backdrop_path'],
            popularity: s['popularith'],
            overview: s['overview'],
            rating: s['vote_average']
        }));

        return modifieldData;
    }catch(error){}
}
