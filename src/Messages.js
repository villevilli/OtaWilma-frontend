import styles from './stylesheets/messages.module.css';
import React from 'react';

import { InitializeTheme, InitializeVersion } from './requests/theme-manager';
import { fetchMessages, fetchMessageContent } from './requests/wilma-api';


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: {
                
            },
            categories: {
                current: 'inbox'
            }
        };

        this.handleChangeCategory = this.handleChangeCategory.bind(this);
    }

    async componentDidMount() {
        console.log('Ready!');

        await InitializeTheme().catch(err => {
            console.log(err);
        });

        this.setState({messages: {...this.state.messages, inbox: await fetchMessages(this.state.categories.current, 1000)}});
    }

    async handleChangeCategory(category) {
        if(this.state.categories.current == category) return;
        const messages = {};

        messages[category] = this.state.messages[category] ? this.state.messages[category] : await fetchMessages(category, 1000);

        this.setState({messages: {...this.state.messages, ...messages}});
        this.setState({categories: {...this.state.categories, current: category}});
    }

    render() {
        return (
            // todo - generalize nav-bar
            <div className="App">
                <div className='container'>
                    <div className="background" id="background"></div>
                    <div className={styles["content"]}>
                        <div className={styles["categories"]} id="categories">
                            <div className={styles["category-selected"]}>
                                <h1 onClick={() => this.handleChangeCategory('inbox')}>Saapuneet</h1>
                            </div>
                            <div>
                                <h1 onClick={() => this.handleChangeCategory('outbox')}>Lähetetyt</h1>
                            </div>
                            <div>
                                <h1 onClick={() => this.handleChangeCategory('appointments')}>Tapahtumakutsut</h1>
                            </div>
                            <div>
                                <h1 onClick={() => this.handleChangeCategory('OtaWilma')}>OtaWilma</h1>
                            </div>
                        </div>
                        <div className={styles["messages"]}>
                            <div className={styles["list"]} id="message-list">
                                {
                                   ( this.state.messages[this.state.categories.current] ? this.state.messages[this.state.categories.current] : []).map(message => {
                                        return (
                                            <div className={styles['message-object']} key={message.id}>
                                                <h1>{message.subject}</h1>
                                                <h2>{message.timeStamp}</h2>
                                                <h2>{message.senders[0].name}</h2>
                                                <h3>{message.replies ? `${message.replies} ${message.replies > 1 ? 'vastausta' : 'vastaus'}` : ''}</h3>
                                                <h7>{message.new ? 'Uusi' : ''}</h7>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="loading-indicator list" id="list-loading-screen"></div>
                        <div className={styles["message-content"]} id="message-container">
                            <h1 id={styles["message-title"]}></h1>
                            <div className="info" id="message-info">

                            </div>
                            <div className={styles["main-content"]} id="message-content">

                            </div>
                            <div className={styles["responses"]} id="message-responses">
                            </div>
                        </div>
                        <div className="loading-indicator message" id="message-loading-screen"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
