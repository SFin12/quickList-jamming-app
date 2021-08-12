import React from "react";
import "./App.css";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import Spotify from "../../util/Spotify";
import UserPlaylists from "../UserPlaylists/UserPlaylists";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: "Playlist Name",
      playlistTracks: [],
      userPlaylists: [],
      selectedPlaylist: [],
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.viewPlaylist = this.viewPlaylist.bind(this);
  }

  addTrack(track) {
    console.log("App.js addTrack(track.id): " + track.id);
    let tracks = this.state.playlistTracks;
    if (
      tracks.find((savedTrack) => {
        console.log(savedTrack.id);
        return savedTrack.id === track.id;
      })
    ) {
      return;
    }

    tracks.push(track);
    this.setState({ playlistTracks: tracks });
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    const newTracks = tracks.filter((savedTrack) => savedTrack.id !== track.id);
    this.setState({ playlistTracks: newTracks });
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  savePlaylist() {
    const trackUris = this.state.playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
      this.setState({
        playlistName: "New Playlist",
        playlistTracks: [],
      });
    });
  }

  search(term) {
    Spotify.search(term).then((searchResults) => {
      console.log(searchResults);
      return this.setState({ searchResults: searchResults });
    });
  }

  viewPlaylist(playlist) {
    Spotify.getPlaylist(playlist.id).then((tracksArray) => {
      console.log(tracksArray);
      return this.setState({ selectedPlaylist: tracksArray });
    });
  }

  componentDidMount() {
    console.log("component did mount");
    Spotify.showPlaylists().then((playlists) => {
      console.log(playlists);
      this.setState({ userPlaylists: playlists });
    });
  }

  render() {
    return (
      <div>
        <h1>
          Quick<span className="highlight">List</span>
        </h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
            <UserPlaylists
              userPlaylists={this.state.userPlaylists}
              viewPlaylist={this.viewPlaylist}
              selectedPlaylist={this.state.selectedPlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
