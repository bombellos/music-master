import React, {Component} from 'react';
import './App.css';
import {FormGroup, FormControl, InputGroup, Glyphicon} from 'react-bootstrap';
import Profile from './Profile';
import Gallery from './Gallery';


class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            query: '',
            artist: null,
            tracks: []
        }
    }

    search() {
        const ACCESS_TOKEN = 'BQClwMxPTxtJIj_IYXBYv4XZIf02hAoxWhunFiSYA2k9oJVydDr5Jz_iPubPKgbRIqq3HX2UXCb7alvVPjVkksDUIa38WoQa8_m8XyaQTbefxEmKnd_iWu6rs7gqTAAnVuC5_-FPhl_eO79pb8NmqAE8b3eYuLI5TP0';
        const BASE_URL = 'https://api.spotify.com/v1/search';
        let FETCH_URL = `${BASE_URL}?q=${this.state.query}&type=artist&limit=1`;
        const ALBUM_URL = 'https://api.spotify.com/v1/artists';
        const HEADER = {
            method: 'GET',
            headers: {
                "authorization": `Bearer ${ACCESS_TOKEN}`
            }
        };

        fetch(FETCH_URL, HEADER)
            .then(response => response.json())
            .then(json => {

                console.log(json);
                const artist = json.artists.items[0];
                this.setState({artist});


                FETCH_URL = `${ALBUM_URL}/${artist.id}/top-tracks?country=PL&`;

                fetch(FETCH_URL, HEADER)
                    .then(response => response.json())
                    .then(json => {
                        const {tracks} = json;
                        this.setState({tracks});
                    });


            });
    }

    render() {
        const content =
            <div className="App">
                <div className="App-title">
                    <div>Music Master</div>

                    <FormGroup className="search">
                        <InputGroup>
                            <FormControl
                                type="text"
                                placeholder="Search for an Artist"
                                value={this.state.query}
                                onChange={event => {
                                    this.setState({query: event.target.value})
                                }}
                                onKeyPress={event => {
                                    if (event.key === 'Enter')
                                        this.search();
                                }
                                }
                            >
                            </FormControl>
                            <InputGroup.Addon onClick={() => this.search()}>
                                <Glyphicon glyph="search"></Glyphicon>
                            </InputGroup.Addon>
                        </InputGroup>
                    </FormGroup>
                    {
                        this.state.artist !== null
                            ?
                            <div>
                                <Profile
                                    artist={this.state.artist}
                                >

                                </Profile>
                                <Gallery
                                className="profile-gallery"
                                tracks={this.state.tracks}>

                                </Gallery>
                            </div>
                            :
                            <div></div>
                    }

                </div>
            </div>;


        return content;
    }


}


export default App;