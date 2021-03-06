import axios from "axios";

import { authenticationService } from "./authenthication";
import { handleError } from "./handleError";
import { handleResponse } from "./handleResponse";
import jwt from "jsonwebtoken";

const key = "AIzaSyCc5tyizZ6BVh1XtAv_ItjIlS7QMKWhe0c"; //spotify
// const API = "https://tubemusicbackend.herokuapp.com";
const API = "http://localhost:8080";
//const clientId = "dc20085012814f3d8cab4b36a4144393"; youtube
axios.defaults.timeout = 25000;
export const handleScrape = async (items) => {
  let res = await axios
    .post(
      API + "/scrape/scrape",
      {
        items: items,
      },
      tokenConfig()
    )
    .catch((err) => {
      handleError(err);
    });

  if (res) {
    return res.data;
  } else {
    return null;
  }
};
//////////////////////////////////////////////////////////
export const handleSubmit = async (termFromSearch) => {
  //SETUPPING HEADERS ETC.
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      item: termFromSearch,
    },
  };
  const currentUser = authenticationService.currentUserValue;
  if (currentUser.token) {
    config.headers["x-auth-token"] = currentUser.token;
  }
  /////////
  let res = await axios
    // .get(API + "/scrape/search", config)
    .get("http://localhost:8080/scrape/search", config)
    .then(handleResponse)
    .catch((err) => {
      handleError(err);
    });

  if (res) {
    return res.data.array;
  } else {
    return null;
  }
};
export const handleSubmit_db = async (termFromSearch) => {
  //SETUPPING HEADERS ETC.
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      item: termFromSearch,
    },
  };
  const currentUser = authenticationService.currentUserValue;
  if (currentUser.token) {
    config.headers["x-auth-token"] = currentUser.token;
  }
  /////////
  let res = await axios
    // .get(API + "/scrape/dbsearch", config)
    .get("http://localhost:8080/scrape/search", config)
    .then(handleResponse)
    .catch((err) => {
      handleError(err);
    });

  if (res) {
    return res.data.array;
  } else {
    return null;
  }
};
export const autocomplete = async (termFromSearch) => {
  //SETUPPING HEADERS ETC.
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      item: termFromSearch,
    },
  };
  const currentUser = authenticationService.currentUserValue;
  if (currentUser.token) {
    config.headers["x-auth-token"] = currentUser.token;
  }
  /////////
  let res = await axios
    // .get(API + "/scrape/autocomplete", config)
    .get("http://localhost:8080/scrape/autocomplete", config)
    .then(handleResponse)
    .catch((err) => {
      handleError(err);
    });

  if (res) {
    return res.data.data;
  } else {
    return null;
  }
};
export const handleSubmit2 = async (termFromSearch) => {
  let res = await axios
    .get("https://www.googleapis.com/youtube/v3/search", {
      params: {
        part: "snippet",
        maxResults: 30,
        key: key,
        q: termFromSearch,
      },
    })
    .catch((err) => console.log(err));

  if (res) {
    return res.data.items;
  } else {
    return null;
  }
};
export const handleSpotifySearchFromYoutube = async (termFromSearch) => {
  //OLD
  let res = await axios
    .get("https://www.googleapis.com/youtube/v3/search", {
      params: {
        part: "snippet",
        maxResults: 1,
        key: key,
        q: termFromSearch,
      },
    })
    .catch((err) => console.log(err));

  if (res) {
    return res.data.items;
  } else {
    return null;
  }
};
export const getContentDetails = async (ListOfIds) => {
  let res = await axios.get("https://www.googleapis.com/youtube/v3/videos", {
    params: {
      part: "contentDetails",
      id: ListOfIds,
      key: key,
    },
  });
  return res.data.items;
};
export const getSpotifyUserId = async (token) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  let res = await axios.get("https://api.spotify.com/v1/me", config);

  return res;
};
export const getSpotifyUsersPlaylists = async (token) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  let res = await axios.get("https://api.spotify.com/v1/me/playlists", config);
  return res.data;
};
export const getRequestWithToken = async (token, address) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  let res = await axios.get(address, config);
  return res.data;
};
export const getPlaylistTracks = async (id, token) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  let res = await axios.get(
    `https://api.spotify.com/v1/playlists/${id}/tracks`,
    config
  );

  return res.data;
};
export const searchSpotifyPlaylists = async (term, token) => {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  let res = await axios.get(
    `https://api.spotify.com/v1/search?q=${term}&type=playlist&limit=30`,
    config
  );
  return res.data;
};

/* -------------------------------------------------------------------------------*/
/* -------------------------------------------------------------------------------*/
//////////////          SPOTIFY & YOUTUBE API ABOVE ////////////////////////
/* -------------------------------------------------------------------------------*/
/* -------------------------------------------------------------------------------*/
export const getPlaylists = async () => {
  let res = await axios.get(API + "/playlists", tokenConfig()).catch((err) => {
    handleError(err);
  });

  return res;
};
/*export const getPlaylists = async () => {
  let res = await axios.get(API+`/playlists");
  return res;
};*/
export const setTitle = (title) => {
  if (typeof title !== "string") {
    throw new Error("Title should be an string");
  }
  document.title = title;
};
export const makePlaylist = async (body) => {
  let res = await axios
    .post(API + "/playlists/create", body, tokenConfig())
    .catch((err) => {
      handleError(err);
    });

  return res;
};

export const updatePlaylist = async (body, id) => {
  let res = await axios.put(
    API + `/playlists/update/${id}`,
    body,
    tokenConfig()
  );
  return res;
};
export const addSongToPlaylist = async (body, id) => {
  let res = await axios.put(
    API + `/playlists/additem/${id}`,
    body,
    tokenConfig()
  );
  return res;
};
export const updatePlaylistSongTime = async (body, id) => {
  let res = await axios.put(
    API + `/playlists/updatetime/${id}`,
    body,
    tokenConfig()
  );
  return res;
};
export const deletePlaylist = async (id) => {
  let res = await axios
    .delete(API + `/playlists/delete/${id}`, tokenConfig())
    .catch((err) => {
      handleError(err);
    });
  return res;
};
export const getPlayListById = async (id) => {
  let res = await axios
    .get(API + `/playlists/find/${id}`, tokenConfig())
    .catch((err) => {
      handleError(err);
    });
  return res;
};

export const addUserPlaylist = async (
  playlistid,
  name,
  priv,
  owner,
  createdAt,
  token
) => {
  const body = JSON.stringify({
    playlistId: playlistid,
    playlistName: name,
    private: priv,
    owner: owner,
    createdAt: createdAt,
  });
  await axios
    .put(API + "/users/addPlaylist", body, tokenConfig())
    .catch((err) => {
      handleError(err);
    });
};
export const deleteUserPlaylist = async (playlistid, token) => {
  let res = await axios
    .delete(API + `/users/deletePlaylist${playlistid}`, tokenConfig())
    .catch((err) => {
      handleError(err);
    });
  return res;
};
export const updateUserPlaylist = async (playlistid, name, priv, token) => {
  const body = JSON.stringify({
    playlistId: playlistid,
    playlistName: name,
    private: priv,
  });
  await axios
    .put(API + `/users/editPlaylist${playlistid}`, body, tokenConfig())
    .catch((err) => {
      handleError(err);
    });
};
export const tokenConfig = () => {
  //gets called to each action needing auth
  //retrieves token
  //checks token if it's going to expire soon, if so, renew that token
  //returns token as config header to the calls
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const currentUser = authenticationService.currentUserValue;
  if (currentUser) {
    const decode = jwt.decode(currentUser.token);
    if (!decode) {
      authenticationService.logout();
      window.location.reload(true);
    }
    const diff = Math.floor(new Date().getTime() / 1000) - decode.exp;

    config.headers["x-auth-token"] = currentUser.token;
    if ((diff > -(60 * 65 * 1) + 30) & (diff < -10)) {
      //if token will expire in 1 hr 5mins 30 seconds && will not expire in 10seconds
      //issue new Token
      axios.get(API + "/auth/renew", config).then((res) => {
        authenticationService.newToken(res.data);
      });
    }
  }
  return config;
};
/** */

export const searchArtists = async (query) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      query: query,
    },
  };
  const currentUser = authenticationService.currentUserValue;
  if (currentUser.token) {
    config.headers["x-auth-token"] = currentUser.token;
  }
  let res = await axios
    // .get(API + "/scrape/search_artists", config)
    .get("http://localhost:8080/scrape/search", config)
    .then(handleResponse)
    .catch((err) => {
      handleError(err);
    });
  if (res) {
    return res.data.array;
  } else {
    return null;
  }
};
export const getArtistData = async (query) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      query: query,
    },
  };
  const currentUser = authenticationService.currentUserValue;
  if (currentUser.token) {
    config.headers["x-auth-token"] = currentUser.token;
  }
  let res = await axios
    // .get(API + "/scrape/get_artist_data", config)
    .get("http://localhost:8080/scrape/search", config)
    .then(handleResponse)
    .catch((err) => {
      handleError(err);
    });
  if (res) {
    return res.data.array;
  } else {
    return null;
  }
};
export const getPlaylist = async (query) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      query: query,
    },
  };
  const currentUser = authenticationService.currentUserValue;
  if (currentUser.token) {
    config.headers["x-auth-token"] = currentUser.token;
  }
  let res = await axios
    // .get(API + "/scrape/get_playlist", config)
    .get("http://localhost:8080/scrape/search", config)
    .then(handleResponse)
    .catch((err) => {
      handleError(err);
    });

  if (res) {
    return res.data.array;
  } else {
    return null;
  }
};
export const getAlbum = async (query) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      query: query,
    },
  };
  const currentUser = authenticationService.currentUserValue;
  if (currentUser.token) {
    config.headers["x-auth-token"] = currentUser.token;
  }
  let res = await axios
    // .get(API + "/scrape/get_album", config)
    .get("http://localhost:8080/scrape/search", config)
    .then(handleResponse)
    .catch((err) => {
      handleError(err);
    });

  if (res) {
    return res.data.array;
  } else {
    return null;
  }
};
export const getArtistAlbumData = async (browseId, params) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      browseId: browseId,
      params: params,
    },
  };
  const currentUser = authenticationService.currentUserValue;
  if (currentUser.token) {
    config.headers["x-auth-token"] = currentUser.token;
  }
  let res = await axios
    // .get(API + "/scrape/get_artist_albums", config)
    .get("http://localhost:8080/scrape/search", config)
    .then(handleResponse)
    .catch((err) => {
      handleError(err);
    });

  if (res) {
    return res.data.array;
  } else {
    return null;
  }
};
