import React from 'react';
import ReactDOM from 'react-dom';
import './style/main.less';
import axios from 'axios';

const CardList = (props) => (
    <div>
        {props.profiles.map(profile => <Card key={profile.id} {...profile} />)}
    </div>
);

class Card extends React.Component {
    render () {
        const profile = this.props;
        return (
            <div className="github-profile">
                <img src={profile.avatar_url} />
                <div className="info">
                    <div className="name"> { profile.name } </div>
                    <div className="company"> { profile.company } </div>
                </div>
            </div>
        );
    }
}

class Form extends React.Component {
    state = { userName: '' };
    handleSubmit = async (event) => {
        event.preventDefault();
        console.log(this.state.userName);
        const resp = await axios.get(`https://api.github.com/users/${this.state.userName}`);
        this.props.onSubmit(resp.data);
        this.setState({ userName: '' });
    }

    render () {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text"
                    placeholder="GitHub Username"
                    value={this.state.userName}
                    onChange={event => this.setState({ userName: event.target.value })}
                />
                <button>Add Card</button>
            </form>
        );
    }
}

class App extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            profiles: [],
        };
    }

    addNewProfile = (profileData) => {
        this.setState(prevState => ({
            profiles: [...prevState.profiles, profileData],
        }));
    }

    render () {
        return (
            <div>
                <div className="header">{this.props.title}</div>
                <Form onSubmit={this.addNewProfile}/>
                <CardList profiles={this.state.profiles} />
            </div>
        );
    }
}
ReactDOM.render(<App title="The GitHub Cards App" />, document.getElementById('root'));
