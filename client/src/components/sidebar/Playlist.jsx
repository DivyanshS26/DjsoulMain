import React from "react";
import isEqual from "react-fast-compare";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import "./contextmenu.css";
export default class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name.substring(0, 400),
    };
  }
  componentDidUpdate(prevProps) {
    if (!isEqual(this.props, prevProps)) {
      this.setState({
        name: this.props.name,
      });
    }
  }
  loadPlaylist(id) {
    this.props.loadPlaylist(id);
  }
  deletePlayList(id) {
    this.props.deletePlaylist(id);
  }
  render() {
    //console.log(this.props);
    return (
      <ContextMenuTrigger id={this.props._id}>
        <ContextMenu id={this.props._id}>
          <MenuItem
            data={{ foo: "bar" }}
            onClick={this.loadPlaylist.bind(this, this.props._id)}
          >
            Load playlist
          </MenuItem>
          <MenuItem
            data={{ foo: "bar" }}
            onClick={this.deletePlayList.bind(this, this.props._id)}
          >
            Delete playlist
          </MenuItem>
        </ContextMenu>
        <div
          onClick={this.loadPlaylist.bind(this, this.props._id)}
          className="sidebar-playlist"
        >
          {this.state.name}
        </div>
      </ContextMenuTrigger>
    );
  }
}
