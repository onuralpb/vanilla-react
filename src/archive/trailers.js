import React, { Component } from "react";
import YouTube from "@u-wave/react-youtube";

const videos = [
	{ id: "ZuuVjuLNvFY", name: "JUNNY - kontra (Feat. Lil Gimch, Keeflow)" },
	{ id: "PYE7jXNjFWw", name: "T W L V - Follow" },
	{ id: "ld8ugY47cps", name: "SLCHLD - I can't love you anymore" },
	{ id: null, name: "<none>" },
];

const qualities = [ "auto", "240", "380", "480", "720", "1080", "1440", "2160" ];

const hashVideoRx = /^#!\/video\/(\d)$/;
const hash = typeof window.location !== "undefined" ? window.location.hash : ""; // eslint-disable-line no-undef
const defaultVideo = hashVideoRx.test(hash) ? parseInt(hash.replace(hashVideoRx, "$1"), 10) : 0;

export default class trailers extends Component {
	constructor(props) {
		super(props);

		this.state = {
			videoIndex       : defaultVideo,
			suggestedQuality : "auto",
			volume           : 1,
			paused           : false,
		};

		this.handlePause = this.handlePause.bind(this);
		this.handlePlayerPause = this.handlePlayerPause.bind(this);
		this.handlePlayerPlay = this.handlePlayerPlay.bind(this);
		this.handleVolume = this.handleVolume.bind(this);
		this.handleQuality = this.handleQuality.bind(this);
	}

	selectVideo(index) {
		this.setState({ videoIndex: index });
	}

	handlePause(event) {
		this.setState({
			paused : event.target.checked,
		});
	}

	handlePlayerPause() {
		this.setState({ paused: true });
	}

	handlePlayerPlay() {
		this.setState({ paused: false });
	}

	handleVolume(event) {
		this.setState({
			volume : parseFloat(event.target.value),
		});
	}

	handleQuality(event) {
		this.setState({
			suggestedQuality : qualities[event.target.selectedIndex],
		});
	}

	render() {
		const { videoIndex, volume, paused, suggestedQuality } = this.state;

		const video = videos[videoIndex];

		return (
			<div>
				<h1>Users</h1>

				<div className='panel'>
					<div className='row'>
						<div className='col s4'>
							<div className='collection'>
								<ul className='list-unstyled'>
									{videos.map((choice, index) => (
										<li key={choice.id}>
											<a
												key={choice.id}
												href={`#!/video/${index}`}
												className={`collection-item ${video === choice ? "active" : ""}`}
												onMouseEnter={() => this.selectVideo(index)}
											>
												{choice.name}
											</a>
										</li>
									))}
								</ul>
							</div>
							<h5>Paused</h5>
							<p>
								<label htmlFor='paused'>
									<input type='checkbox' id='paused' checked={paused} onChange={this.handlePause} />
									<span>Paused</span>
								</label>
							</p>
							<h5>Volume</h5>
							<input type='range' value={volume} min={0} max={1} step={0.01} onChange={this.handleVolume} />
							<h5>Quality</h5>
							<select className='browser-default' onChange={this.handleQuality}>
								{qualities.map((quality) => (
									<option key={quality} value={quality}>
										{quality}
									</option>
								))}
							</select>
						</div>
						<div className='col s8 center-align'>
							<YouTube
								video={video.id}
								width={640}
								height={480}
								autoplay
								controls={false}
								annotations={false}
								suggestedQuality={suggestedQuality}
								volume={volume}
								paused={paused}
								onPause={this.handlePlayerPause}
								onPlaying={this.handlePlayerPlay}
								modestBranding={false}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
