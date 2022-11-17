import React, { Component } from 'react';
import { connect } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.css';
import slider2 from '../../../assets/images/slider2.jpg';
import slider1 from '../../../assets/images/slider1.jpg';
import slider3 from '../../../assets/images/ms_banner_img2.jpg';

import './Slider.scss';
// class Slider extends Component {
function Slider(props) {
	let slideIndex = 0;
	showSlides();

	function showSlides() {
		let i;
		let slides = document.getElementsByClassName('mySlides');
		let dots = document.getElementsByClassName('dot');
		for (i = 0; i < slides.length; i++) {
			slides[i].style.display = 'none';
		}
		slideIndex++;
		if (slideIndex > slides.length) {
			slideIndex = 1;
		}
		for (i = 0; i < dots.length; i++) {
			dots[i].className = dots[i].className.replace(' active', '');
		}
		if (slides[slideIndex - 1]) {
			slides[slideIndex - 1].style.display = 'block';

			dots[slideIndex - 1].className += ' active';
		}

		// slides[slideIndex - 1].style.display = 'block';
		setTimeout(showSlides, 2000); // Change image every 2 seconds
	}

	return (
		<div className="home-header-banner">
			<div className="banner-text">Trang chu</div>
			<div className="slideshow-container">
				<div className="mySlides ">
					<img src={slider1} style={{ width: '100%' }} />
				</div>

				<div className="mySlides ">
					<img src={slider2} style={{ width: '100%' }} />
				</div>

				<div className="mySlides">
					<img src={slider3} style={{ width: '100%' }} />
				</div>
			</div>
			<br />

			<div style={{ textAlign: 'center' }}>
				<span className="dot" />
				<span className="dot" />
				<span className="dot" />
			</div>
		</div>
	);
}
// 	render() {
// 		return (
// 			<React.Fragment>
// 				<div className="home-header-banner">
// 					<div className="banner-text">Trang chu</div>
// 					<div className="slideshow-container">
// 						<div className="mySlides fade">
// 							<img src={slider1} style={{ width: '100%' }} />
// 						</div>

// 						<div className="mySlides fade">
// 							<img src={slider2} style={{ width: '100%' }} />
// 						</div>

// 						{/* <div className="mySlides fade">
// 							<div className="numbertext">3 / 3</div>
// 							<img src="img_mountains_wide.jpg" style={{ width: '100%' }} />
// 						</div> */}
// 					</div>
// 					<br />

// 					<div style={{ textAlign: 'center' }}>
// 						<span className="dot" />
// 						<span className="dot" />
// 						<span className="dot" />
// 					</div>
// 					{/* <div className="banner-img" /> */}
// 				</div>
// 			</React.Fragment>
// 		);
// 	}
// }

// const mapStateToProps = (state) => {
// 	return {
// 		isLoggedIn: state.user.isLoggedIn,
// 		userInfo: state.user.userInfo
// 	};
// };

// const mapDispatchToProps = (dispatch) => {
// 	return {};
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Slider);
export default Slider;
