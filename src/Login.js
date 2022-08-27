import styles from './stylesheets/login.module.css';
import React from 'react';


import { getCookie } from './requests/requests';
import { validateOtaWilmaAccount, loginToSession, Login, createAccout } from './requests/account';
import { InitializeTheme, InitializeVersion } from './requests/theme-manager';

const translations = {
    'Invalid login-credentials': 'Käyttäjätunnusta ei löydy tai salasana on väärä',
    '"username" is not allowed to be empty': 'Käyttäjätunnus ei voi olla tyhjä',
    '"password" is not allowed to be empty': 'Salasana ei voi olla tyhjä',
    'You are not whitelisted for OtaWilma [CLOSED BETA]': 'OtaWilmaa on vielä testausvaiheessa, ja ainoastaan testausryhmään kuuluvat henkilöt voivat kirjautua.'
}

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            credentials: {
                username: '',
                password: '',
                session: getCookie('session')
            },
            termsOfService: {
                accept: false,
                knowledge: false
            },
            loginError: ''
        };

        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSession = this.handleSession.bind(this);
        this.handleAccept = this.handleAccept.bind(this);
        this.handleKnowledge = this.handleKnowledge.bind(this);

        this.handleLogin = this.handleLogin.bind(this);
    }

    async componentDidMount() {
        console.log('Ready!');

        await InitializeTheme().catch(err => {
            console.log(err);
        });

        await InitializeVersion().catch(err => {
            console.log(err);
        });
    }

    handleUsername(e) {
        this.setState({credentials: { ...this.state.credentials, username: e.target.value }});
    }

    handlePassword(e) {
        this.setState({credentials: { ...this.state.credentials, password: e.target.value }});
    }

    handleSession(e) {
        this.setState({credentials: { ...this.state.credentials, session: e.target.value }});
    }

    handleAccept(e) {
        this.setState({termsOfService: { ...this.state.termsOfService, accept: !this.state.termsOfService.accept }});
    }

    handleKnowledge(e) {
        this.setState({termsOfService: { ...this.state.termsOfService, knowledge: !this.state.termsOfService.knowledge }});
    }

    async handleLogin() {
        this.setState({loginError: ''})

        if(!this.state.termsOfService.accept && !this.state.termsOfService.knowledge) {
            this.setState({loginError: 'Sinun on hyväksyttävä molemmat ehdot'})
            return;
        }

        if(this.state.credentials.session.length > 0) {
            await validateOtaWilmaAccount(this.state.credentials.session)
            .then(() => {

                Login({username: this.state.credentials.username, password: this.state.credentials.password})
                    .then(async () => {
                        loginToSession(this.state.credentials.username, this.state.credentials.session)
                        .then(() => {
                            document.cookie = `session=${this.state.credentials.session}; SameSite=Lax; Secure; max-age=31536000; path=/`;
                            // window.location = '/views/frontpage.html';
                            console.log('Success!');
                            return;
                        })
                        .catch(err => {                            
                            this.setState({loginError: 'Kirjautuminen OtaWilmaan epäonnistui'})
                            return;
                        })
                    })
                    .catch(err => {
                        this.setState({loginError: Object.keys(translations).includes(err.err) ? translations[err.err] : err.err})
                        return;
                    })
            })
            .catch(err => {
                switch (err.status) {
                    case 400:
                        this.setState({loginError: 'Virheellinen OtaWilma-tunnus. Jätä kenttä tyhjäksi jos haluat luoda uuden käyttäjän OtaWilmaan'})
                        return;
                    default:

                        throw err;
                }
            })
        }
        else {
            Login({username: this.state.credentials.username, password: this.state.credentials.password})
            .then(() => {
                createAccout(this.state.credentials.username)
                    .then((session) => {
                        loginToSession(this.state.credentials.username, session)
                        .then(() => {
                            // window.location = '/views/frontpage.html';
                            console.log('Success!');
                        })
                        .catch(err => {
                            // displayError(err);
                            throw err;
                        })
                    })
                    .catch(err => {
                        // displayError(err);
                        throw err;
                    })
            })
            .catch(err => {
                this.setState({loginError: Object.keys(translations).includes(err.err) ? translations[err.err] : err.err});
                return;
            })
        }
    }

    render() {
        return (
            <div className={styles["App"]}>
                <div className='container'>
                    <div className={styles["background"]} id="background"></div>
                    <div className={styles["top"]}>
                        <h1 className={styles["logo-text"]}>OtaWilma</h1>
                    </div>
                    <div className={styles['content']}>
                        <div className={styles["left"]}>

                        </div>
                        <div className={styles['right']}>
                            <h1>OtaWilma - Tervetuloa</h1>
                            <h2>Kirjaudu sisään <strong>Wilma</strong>-tunnuksillasi</h2>
                            <form className={styles["login-form"]}>
                                <h3>Käyttäjätunnus</h3>
                                <input id="username-field" type="text" placeholder="matti.heikkinen" autoComplete="on" value={this.state.credentials.username} onChange={this.handleUsername}></input>
                            </form>
                            <form className={styles["login-form"]}>
                                <h3>Salasana</h3>
                                <input id="password-field" type="password" placeholder="matti.heikkinen" autoComplete="on" value={this.state.credentials.password} onChange={this.handlePassword}></input>
                            </form>

                            <div className={styles["login-otawilma"]}>
                                <form className={styles["login-form"]}>
                                    <h3>OtaWilma-tunnus <strong id="help">(?)</strong></h3>
                                    <input id="session-field" type="password" autoComplete="new-password" value={this.state.credentials.session} onChange={this.handleSession}></input>
                                    <div className={styles["info"]}>
                                        <h2>Selaimesi käyttää OtaWilma-käyttäjää asetuksien tallentamiseen. Voit käyttää olemassa
                                        olevaa
                                        käyttäjää jos olet ennen käyttänyt
                                        OtaWilmaa toisella selaimella.</h2>
                                        <h2>OtaWilma-tunnus löytyy asetuksista <strong>Asetukset {'>'} OtaWilma-käyttäjää {'>'}
                                        Kopio OtaWilma-tunnus</strong></h2>
                                    </div>
                                </form>
                            </div>

                            <form className={styles["terms-of-service"]}>
                                <h2>Ymmärrän, että <strong>OtaWilma ei ole</strong> virallinen Wilman
                                    ylläpitämä ohjelmisto</h2>
                                <input id={styles["agreement"]} type="checkbox" checked={this.state.termsOfService.knowledge} onChange={this.handleKnowledge} ></input>
                            </form>
                            <form className={styles["terms-of-service"]}>
                                <h2>Hyväksyn <strong>käyttöehdot</strong> ja otan <strong>itse</strong> vastuun käyttäjäni
                                    turvallisuudesta</h2>
                                <input id="terms-of-service" type="checkbox" checked={this.state.termsOfService.accept} onChange={this.handleAccept}></input>
                            </form>
                            <h5 className={styles["login-error"]} id="login-error">{this.state.loginError}</h5>
                            <button id="login-button" onClick={this.handleLogin}>Kirjaudu sisään</button>
                        </div>
                        <h6 id="version-tag">v0.5.6 BETA</h6>
                        <div className={styles["login-loading-screen"]} id="login-loading-screen"></div>
                    </div>
                </div>
            </div>
          );
    }
}

export default App;
