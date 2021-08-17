import React from "react";
import "./ViewPlaylist.css";

class ViewPlaylist extends React.Component {
  render() {
    return (
      <div className="playlist-information">
        <div className="playlist-information">
          {this.props.selectedPlaylist.map((track) => {
            return (
              <div className="content" key={track.id}>
                <h4>{track.name}</h4>
                <p>
                  {track.artist} | {track.album}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ViewPlaylist;
