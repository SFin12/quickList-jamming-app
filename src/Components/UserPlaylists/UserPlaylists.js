import React from "react";
import ViewPlaylist from "../ViewPlaylist/ViewPlaylist";
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
    const newName = !this.state.showPlaylist
      ? e.target.textContent
      : "New Playlist";

    this.props.onOpen(newName);
  }

  render() {
    return (
      <div className="structure">
        <h2>Playlists</h2>
        <div className="userPlaylist">
          {this.props.userPlaylists.map((playlist) => {
            return (
              <div className="playlist-information" key={playlist.id + "div"}>
                <h3
                  className="title"
                  value={playlist.name}
                  id={playlist.id}
                  onClick={this.handleClick}
                >
                  {playlist.name}
                </h3>
                {this.state.selectedPlaylistId === playlist.id ? (
                  this.state.showPlaylist ? (
                    <ViewPlaylist
                      selectedPlaylist={this.props.selectedPlaylist}
                    />
                  ) : null
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default UserPlaylists;
