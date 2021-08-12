import React from "react";
import "./UserPlaylists.css";

class UserPlaylists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPlaylist: false,
      selectedPlaylistId: "",
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.viewPlaylist(e.target);
    this.setState({
      showPlaylist: !this.state.showPlaylist,
      selectedPlaylistId: e.target.id,
    });
  }

  render() {
    return (
      <div className="structure">
        <h2>Playlists</h2>
        <div className="userPlaylist">
          {this.props.userPlaylists.map((playlist) => {
            return (
              <div className="playlist-information">
                <h3
                  className="title"
                  id={playlist.id}
                  key={playlist.id}
                  onClick={this.handleClick}
                >
                  {playlist.name}
                </h3>
                {this.state.selectedPlaylistId === playlist.id
                  ? this.state.showPlaylist
                    ? this.props.selectedPlaylist.map((track) => {
                        return (
                          <div className="content">
                            <h4>{track.name}</h4>
                            <p>
                              {track.artist} | {track.album}
                            </p>
                          </div>
                        );
                      })
                    : null
                  : null}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default UserPlaylists;
