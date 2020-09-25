import React from 'react';

const Footer = () => {
    return (
        <div>
            <hr className="mt-5" style={{borderTop: "1px solid #5a606b"}}/>

            <div className="row mt-5 ml-0 mr-0 mb-5">

                <div className="col-md-8 col-sm-6" style={{color:'#5a606b'}}>
                    <h3>About me</h3>
                    <p>About.me — веб-сайт, который является бесплатным сервисом, предоставляющий любому желающему персональный веб-хостинг. Сооснователями сайта являются Райан Фрейтас (англ. Ryan Freitas), Тони Конрад (англ. Tony Conrad) и Тим Янг (англ. Tim Young), запустившие его в октябре 2009 года[2].</p>
                    <p> Сайт предоставляет каждому зарегистрированному пользователю простую платформу, чтобы связать на одной странице всё о личности и её интересах, а также привязать некоторые внешние сайты и популярные сайты социальных сетей, такие как Google+, Twitter, Facebook, LinkedIn, Flickr, YouTube, Tumblr и другие. На страницу можно загрузить фото, написать краткую биографию, изменить задний план (фон) страницы и предоставить всему миру «картинку» о пользователе.</p>

                    <ul className="list-inline">
                        <li className="list-inline-item">
                            <a href="/" style={{color: '#f4c10f', cursor:'pointer', marginRight: '10px'}}>
                                <i className="fab fa-facebook"></i>
                            </a>
                            <a href="/" style={{color: '#f4c10f', cursor:'pointer', marginRight: '10px'}}>
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="/" style={{color: '#f4c10f', cursor:'pointer', marginRight: '10px'}}>
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href="/" style={{color: '#f4c10f', cursor:'pointer', marginRight: '10px'}}>
                                <i className="fab fa-youtube"></i>
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="col-md-4 col-sm-6" style={{color:'#5a606b'}}>
                    <h3>Keep in touch</h3>

                    <ul className="list-unstyled">
                        <li>
                            <p><strong><i className="fas fa-map-marker-alt"></i> Adress:</strong> city, country</p>
                        </li>
                        <li>
                            <p><strong><i className="fas fa-phone"></i> Phone:</strong> +7978 000 99 99</p>
                        </li>
                        <li>
                            <p><strong><i className="fas fa-envelope"></i> Email:</strong> Info@info.com</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    );
};

export default Footer;
