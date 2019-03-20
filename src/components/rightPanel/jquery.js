import React, { Component } from "react";
import $ from "jquery";

//selec2
import "select2/dist/css/select2.css";
import "select2/dist/js/select2";

// @chenfengyuan/datepicker.js
import "@chenfengyuan/datepicker/dist/datepicker.min.css";
import "@chenfengyuan/datepicker/dist/datepicker";

//countdown
import "jquery-countdown";

export default class jquery extends Component {
	componentDidMount() {
		setTimeout(() => {
			fetch("http://localhost:4000/albums?userId=1").then((data) => data.json());
		}, 500);
		this.$el_selec2 = $(this.el_selec2);
		this.$el_date = $(this.el_date);
		this.$el_countdown = $(this.el_countdown);

		this.$el_selec2.select2();

		this.$el_date.datepicker({
			autoHide : true,
		});

		this.$el_countdown.countdown("2020/01/01").on("update.countdown", function(event) {
			$(this).html(
				event.strftime(
					"" +
						"<span>%-w</span> week%!w " +
						"<span>%-d</span> day%!d " +
						"<span>%H</span> hr " +
						"<span>%M</span> min " +
						"<span>%S</span> sec"
				)
			);
		});
	}

	componentWillUnmount() {
		this.$el_date.datepicker("destroy");
	}

	render() {
		return (
			<div className='jqueryContent'>
				<h1>jQuery</h1>
				<div className='panel'>
					<h5>select2</h5>
					<select
						className='js-example-basic-multiple form-control'
						name='states[]'
						multiple='multiple'
						ref={(el_selec2) => (this.el_selec2 = el_selec2)}
					>
						<option value='AL'>Alabama</option>
						<option value='AfL'>Alabfdsama</option>
						<option value='AfdL'>Alabdfsasama</option>
						<option value='AsL'>Alaasdasbama</option>
						<option value='AfL'>Aldasdabama</option>
						<option value='AdL'>Alaasds asddasbama</option>
						<option value='ffAdL'>Alas das bama</option>
						<option value='AscL'>AlasadHJGJ HGbama</option>
						<option value='AvvL'>Alabhj ghama</option>
						<option value='WcY'>Wyoming</option>
					</select>
				</div>
				<hr />
				<div className='panel'>
					<h5>datepicker</h5>
					<input
						type='text'
						className='form-control'
						data-toggle='datepicker'
						ref={(el_date) => (this.el_date = el_date)}
					/>
				</div>
				<hr />
				<div className='panel'>
					<h5>jquery-countdown</h5>
					<div id='clock' ref={(el_countdown) => (this.el_countdown = el_countdown)} />
				</div>
			</div>
		);
	}
}
