import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { addAnimate } from "../HOC/animate";

export default class navMenu extends Component {
	componentDidMount() {
		let x = document.querySelectorAll(".leftMenuContent a");
		for (let i = 0; i < x.length; i++) {
			x[i].addEventListener(
				"mouseenter",
				function() {
					if (!x[i].classList.contains("activePage")) {
						addAnimate(x[i], "pulse", "faster");
					}
				},
				false
			);
		}
		// let menuLinks = document.querySelectorAll(".leftMenuContent a");
		// [].forEach.call(menuLinks, function(el) {
		// 	el.addEventListener("mouseenter", function() {
		// 		if (!el.classList.contains("activePage")) {
		// 			addAnimate(el, "pulse", "faster");
		// 		}
		// 	});
		// });
	}
	render() {
		return (
			<ul className={`list-unstyled leftMenuContent`}>
				<li>
					<NavLink to='/' exact activeClassName='activePage'>
						<i className='fas fa-home' /> Dashboard
					</NavLink>
				</li>
				<li>
					<NavLink to='/posts' exact activeClassName='activePage'>
						<i className='fas fa-blog' /> Posts
					</NavLink>
				</li>
				<li>
					<NavLink to='/comments' exact activeClassName='activePage'>
						<i className='fas fa-comment-alt' /> Comments
					</NavLink>
				</li>
				<li>
					<NavLink to='/albums' exact activeClassName='activePage'>
						<i className='fas fa-images' /> Albums
					</NavLink>
				</li>
				<li>
					<NavLink to='/photos' exact activeClassName='activePage'>
						<i className='fas fa-camera-retro' /> Photos
					</NavLink>
				</li>
				<li>
					<NavLink to='/todos' exact activeClassName='activePage'>
						<i className='fas fa-check-double' /> Todos
					</NavLink>
				</li>
				<li>
					<NavLink to='/users' exact activeClassName='activePage'>
						<i className='fas fa-user-friends' /> Users
					</NavLink>
				</li>

				<li>
					<NavLink to='/musics' exact activeClassName='activePage'>
						<i className='fas fa-headphones-alt' /> Musics
					</NavLink>
				</li>
				<li>
					<NavLink to='/jquery' exact activeClassName='activePage'>
						<i className='fas fa-dollar-sign' /> jQuery
					</NavLink>
				</li>
				<li>
					<NavLink to='/products' exact activeClassName='activePage'>
						<i className='fas fa-shopping-bag' /> Products
					</NavLink>
				</li>
			</ul>
		);
	}
}
