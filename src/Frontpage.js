import styles from './stylesheets/frontpage.module.css';
import React from 'react';
import cx from 'classnames';

import { InitializeTheme, InitializeVersion } from './requests/theme-manager';
import { fetchGradeBook, fetchMessages, fetchNews } from './requests/wilma-api';

const overview = [
    'Lu21 pakollinen moduuli',
    'Lu21 valtakunnallinen valinnainen moduuli',
    'Lu21 paikallinen opintojakso',
    'Yhteensä',
    'Keskiarvo',
    'Lukuaineiden keskiarvo',
    'Teknologia'
]

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            schedule: {},
            news: {},
            grades: {},
            messages: []
        };
    }

    async componentDidMount() {
        console.log('Ready!');

        await InitializeTheme().catch(err => {
            console.log(err);
        });

        this.setState({messages: await fetchMessages('inbox', 25)})
        this.setState({news: await fetchNews('current', 25)})
        this.setState({grades: await fetchGradeBook('courses')})
    }

    render() {
        return (
            // todo - generalize nav-bar
            
            <div className="App">
                <div className='container'>
                    <div className={styles.background} id="background"></div>
                    <div className={styles.content}>
                        <div className={styles['top-container']}>
                            <div className={styles.left}>
                                <div className={styles.schedule} id="schedule"></div>
                            </div>
                            <div className={styles.middle}>
                                <div className={styles.clock}>
                                    <div className={styles["clock-marking-x"]}></div>
                                    <div className={styles["clock-marking-y"]}></div>
                                    <div className={cx(styles["clock-marking"], styles["one"])}></div>
                                    <div className={cx(styles["clock-marking"], styles["two"])}></div>
                                    <div className={cx(styles["clock-marking"], styles["three"])}></div>
                                    <div className={cx(styles["clock-marking"], styles["four"])}></div>
                                    <div className={styles["inner-circle"]}>
                                        <div className={cx(styles.hand, styles["sec"])}></div>
                                        <div className={cx(styles.hand, styles["min"])}></div>
                                        <div className={cx(styles.hand, styles["hour"])}></div>
                                        <div className={styles["center"]}></div>
                                    </div>
                                </div>
                                <div className={styles.info}>
                                    <h1 id={styles["current-time"]}>13.22.45</h1>
                                    <h2 id={styles["current-date"]}>3 Heinäkuuta 2022</h2>
                                    <form id={styles["date-form"]}>
                                        <button id="previous-week">{'<'}</button>
                                        <input type="date" name="date-input" id="date-input" required></input>
                                        <button id="next-week">{'>'}</button>
                                    </form>
                                </div>
                            </div>
                            <div className={styles.right}>
                                <div className={styles.news} id="news">
                                    <a href="">Tiedotteet</a>
                                    {
                                        Object.keys(this.state.news).map(date => {
                                            const list = this.state.news[date];
                                            return list.map(news => {
                                                return (
                                                    <div className={styles['news-object']} key={news.href}>
                                                        <h1>{news.title}</h1>
                                                        <h2>{date}</h2>
                                                        <h2>{news.sender.name}</h2>
                                                        <h3>{news.description}</h3>
                                                    </div>
                                                )
                                            })
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className={styles["bottom-container"]}>
                            <div className={styles["left"]}>
                                <div className={styles["grades"]} id="grades">
                                    <a className={styles["title"]} href="https://otawilma.tuukk.dev/views/grades.html">Opinnot</a>
                                    <div className={styles['overview']}>
                                        <ul><a>Lu21 pakollinen moduuli </a><a>{this.state.grades['Lu21 pakollinen moduuli']}</a></ul>
                                        <ul><a>Lu21 valtakunnallinen valinnainen moduuli </a><a>{this.state.grades['Lu21 valtakunnallinen valinnainen moduuli']}</a></ul>
                                        <ul><a>Lu21 paikallinen opintojakso </a><a>{this.state.grades['Lu21 paikallinen opintojakso']}</a></ul>
                                        <ul><a>Yhteensä </a><a>{this.state.grades['Yhteensä']}</a></ul>
                                        <ul><a>Keskiarvo </a><a>{this.state.grades['Keskiarvo']}</a></ul>
                                        <ul><a>Lukuaineiden keskiarvo </a><a>{this.state.grades['Lukuaineiden keskiarvo']}</a></ul>
                                    </div>
                                    {
                                        Object.keys(this.state.grades).filter(s => !overview.includes(s)).map((subject, i) => {
                                            const grade = this.state.grades[subject];

                                            return (
                                                <div className={styles['grade-object']} key={i}>
                                                    <h1>{subject}</h1>
                                                    <ul>
                                                        <a>Arvosana </a>
                                                        <a>{grade.grade}</a>
                                                    </ul>
                                                    <ul>
                                                        <a>Laajuus </a>
                                                        <a>{grade.points}</a>
                                                    </ul>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className={styles["middle"]}>
                                <div className={styles["links"]}>
                                    <h1>Linkit</h1>
                                    <h3>Opiskelu</h3>

                                    <div className={styles["link"]}>
                                        <a target="_blank" href="https://classroom.google.com/">Google Classroom</a>
                                    </div>
                                    <div className={styles["link"]}>
                                        <a target="_blank" href="https://www.microsoft.com/fi-fi/microsoft-teams/log-in">Microsoft
                                            Teams</a>
                                    </div>

                                    <div className={styles["link"]}>
                                        <a target="_blank" href="https://espoo.inschool.fi/">Wilma - espoo</a>
                                    </div>
                                    <div className={styles["link"]}>
                                        <a target="_blank" href="https://digikirja.otava.fi/tietokantajulkaisut/maol-2020/">MAOL
                                            digitaulukot</a>
                                    </div>
                                    <div className={styles["link"]}>
                                        <a target="_blank" href="https://www.sanomapro.fi/">Sanomapro - digikirjat</a>
                                    </div>
                                    <div className={styles["link"]}>
                                        <a target="_blank" href="https://opiskelija.otava.fi/materiaalit/omat">Otava -
                                            digikirjat</a>
                                    </div>
                                    <div className={styles["link"]}>
                                        <a target="_blank" href="https://app.studeo.fi/auth/login">Studeo -
                                            digikirjat</a>
                                    </div>
                                    <div className={styles["link"]}>
                                        <a target="_blank" href="https://shop.edita.fi/digiedita/omat-tuotteet">Edita -
                                            digikirjat</a>
                                    </div>
                                    <h3>Hyödyllinen</h3>
                                    <div className={styles["link"]}>
                                        <a target="_blank" href="https://lomalaskuri.tk/OtaniemenLukio/Etusivu">Lomalaskuri</a>
                                    </div>
                                    <div className={styles["link"]}>
                                        <a target="_blank"
                                            href="https://www.espoo.fi/fi/otaniemen-lukio/kalenteri-otaniemen-lukio">Otaniemen lukio
                                            - Kalenteri</a>
                                    </div>
                                    <div className={styles["link"]}>
                                        <a target="_blank"
                                            href="https://www.espoo.fi/fi/otaniemen-lukio/opiskelijalle-otaniemen-lukio#section-33736">Otaniemen
                                            Lukio - opiskelijalle</a>
                                    </div>
                                    <h3>Ruokailu</h3>
                                    <div className={styles["link"]}>
                                        <a target="_blank"
                                            href="https://www.amica.fi/ravintolat/ravintolat-kaupungeittain/espoo/tietokyla/">Amica
                                            -
                                            Otaniemen lukio</a>
                                    </div>
                                    <div className={styles["link"]}>
                                        <a target="_blank" href="https://www.lounaat.info/otaniemi">Lounaat - Otaniemi</a>
                                    </div>
                                    <h3>Ruokailuvuorot</h3>
                                    <div className={styles["link"]}>
                                        <a target="_blank"
                                            href="https://drive.google.com/file/d/1NrGciABX7vW9lq7q4mA7xfoNEmPrRr_z/view">Ruokailuvuorot
                                            - 1A periodi</a>
                                    </div>
                                </div>
                            </div>
                            <div className={styles["right"]}>
                                <div className={styles["messages"]} id="messages">
                                <a href="">Viestit</a>
                                    <div className={styles['message-list']}>
                                        {
                                            this.state.messages.map(message => {
                                                return (
                                                    <div className={styles['message-object']} key={message.id}>
                                                        <h1>{message.subject}</h1>
                                                        <h4>{message.timeStamp}</h4>
                                                        <h4>{message.senders[0].name}</h4>
                                                        <h3></h3>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
