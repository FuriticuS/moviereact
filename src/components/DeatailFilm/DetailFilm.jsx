import React, {useEffect, useState} from 'react';
import {fetchMovieDetail} from "../../service";

const DetailFilm = ({match}) => {

    let params = match.params;

    //хук useState для получения деталей одного фильма
    const [detail, setDetail] = useState([]);

    //хук useEffect получение id фильма которого выбрали
    useEffect(() => {
        const fetchAPI = async () => {
            setDetail(await fetchMovieDetail(params.id))
        }
        fetchAPI();
    },[])

    return (
        <div>
            <div className="row mt-3">
                {/*Дата выхода*/}
                <div className="col-md-3">
                    <p style={{color:'#5a606b', textTransform:'uppercase', fontWeight:'bolder'}}>Дата выхода</p>
                    <p style={{color:'#f4c10f'}}>{detail.release_date}</p>
                </div>

                {/*Длительность*/}
                <div className="col-md-3">
                    <p style={{color:'#5a606b', textTransform:'uppercase', fontWeight:'bolder'}}>Длительность</p>
                    <p style={{color:'#f4c10f'}}>{detail.runtime}мин.</p>
                </div>

                {/*Бюджет*/}
                <div className="col-md-3">
                    <p style={{color:'#5a606b', textTransform:'uppercase', fontWeight:'bolder'}}>Бюджет</p>
                    <p style={{color:'#f4c10f'}}>{detail.budget}$</p>
                </div>

                {/*Домашняя страница*/}
                <div className="col-md-3">
                    <p style={{color:'#5a606b', textTransform:'uppercase', fontWeight:'bolder'}}>Домашняя страница</p>
                    <a href={detail.homepage} style={{color:'#f4c10f', cursor:'pointer', textDecoration:'none'}} target="_blank">{detail.homepage}</a>
                </div>

            </div>
        </div>
    );
};

export default DetailFilm;
