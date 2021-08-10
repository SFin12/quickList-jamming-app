import { div } from "prelude-ls";
import React from "react";
import "./UserPlaylists.css";
import Spotify from "../../util/Spotify";

class UserPlaylists extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="Playlist">
        <h2 className="Playlist title">Playlists</h2>
        <div></div>
      </div>
    );
  }
}

export default UserPlaylists;
