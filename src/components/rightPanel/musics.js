import React, { Component } from "react";

export default class musics extends Component {
	constructor() {
		super();
		this.state = {
			playlist    : [],
			token       :
				"BQDBhwB6vUnJ2AIJtoaDYhpBsuRebnAMO3hdNxKZ-0r0Qul6RbEWJSy7zwYqeGtWu2cnAEjnqGTHa0ZpM572ycgav32G1M23gmoto0ue5DqrS1vjzJfndK7_VO15QuYG5SDHIAgFTolfhXZda_6LkaJnelteQ96LrjhbejYcdA",
			loggedIn    : false,
			error       : "",
			trackName   : "Track Name",
			artistName  : "Artist Name",
			albumName   : "Album Name",
			playing     : false,
			position    : 0,
			duration    : 1,
			spotify_uri : [],
			// deviceId    : "262a960445731bacc831be3f73cb1bb38d7b12b7", /* WISGNYB59 */
			deviceId    : "5152d75cd780bacee2764f578c3178f24ca3f252" /* Onur's Spotify Player */,
			// deviceId    : "330413e7e5e44ae59e99056d4701ab55" /* React Music Player */,
		};
		this.playerCheckInterval = setInterval(() => this.createPlayer(), 1000);
		console.log("constructor");
	}

	componentDidMount() {
		const { token } = this.state;

		fetch(`https://api.spotify.com/v1/playlists/0VDtlGFaf6Q6iSKj6a89O7/tracks?offset=0&limit=15`, {
			method  : "GET",
			headers : {
				Accept         : "application/json",
				"Content-Type" : "application/json",
				Authorization  : `Bearer ${token}`,
			},
		})
			.then((response) => response.json())
			.then((playlist) => {
				this.setState({
					playlist    : playlist.items,
					spotify_uri : playlist.items.map((song) => song.track.uri),
				});
			})
			.catch((error) => console.log(error));
		console.log("componentDidMount - Fetch - playlist");
	}

	createPlayer() {
		console.log("createPlayer");
		const { token } = this.state;

		clearInterval(this.playerCheckInterval);
		this.player = new window.Spotify.Player({
			name          : "Onur's Spotify Player",
			getOAuthToken : (cb) => {
				cb(token);
			},
			volume        : 0.1,
		});
		this.player.on("player_state_changed", (state) => {
			console.log(state);
			this.setState({
				trackName  : state.track_window.current_track.name,
				artistName : state.track_window.current_track.artists.map((artist) => artist.name).join(", "),
				albumName  : state.track_window.current_track.album.name,
			});
		});
		// Ready
		this.player.on("ready", () => {
			this.transferPlaybackHere();
		});
		this.player.connect();
	}

	transferPlaybackHere() {
		const { token, spotify_uri, deviceId } = this.state;
		fetch(`https://api.spotify.com/v1/me/player`, {
			method  : "PUT",
			body    : JSON.stringify({
				uris       : [ spotify_uri ],
				device_ids : [ deviceId ],
				play       : true,
			}),
			headers : {
				"Content-Type" : "application/json",
				Authorization  : `Bearer ${token}`,
			},
		});
		console.log("transferPlaybackHere - Fetch - player");
	}

	onPrevClick() {
		this.player.previousTrack();
	}

	onPlayClick() {
		this.player.togglePlay();
	}

	onNextClick() {
		this.player.nextTrack();
	}

	render() {
		const { trackName, artistName, albumName } = this.state;
		console.log("render");
		console.log(this.state.playlist);

		return (
			<div>
				<h1>Musics</h1>
				<div>
					<p>Artist: {artistName}</p>
					<p>Track: {trackName}</p>
					<p>Album: {albumName}</p>
					<p>
						<button className='btn btn-info' onClick={() => this.onPrevClick()}>
							Previous
						</button>
						<button className='btn btn-info' onClick={() => this.onPlayClick()}>
							Play
						</button>
						<button className='btn btn-info' onClick={() => this.onNextClick()}>
							Next
						</button>
					</p>
				</div>
				<div className='row'>
					{this.state.playlist.map((singer) => (
						<div className='col-lg-4' key={singer.track.id}>
							<div
								className='subPanel'
								style={{
									background     : `url(${singer.track.album.images[0].url}) no-repeat center center`,
									backgroundSize : "cover",
								}}
							>
								<ul className='list-unstyled align-self-end'>
									<li>{singer.track.name}</li>
									<li>{singer.track.artists[0].name}</li>
									<li>
										<img src={singer.track.album.images[2].url} alt='' />
									</li>
								</ul>
							</div>
						</div>
					))}
				</div>
			</div>
		);
	}
}
