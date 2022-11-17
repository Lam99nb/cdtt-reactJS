import React, { Component } from 'react';
import { connect } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.css';

class Comment extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	// initFacebookSDK() {
	// 	if (window.FB) {
	// 		window.FB.XFBML.parse();
	// 	}

	// 	let { language } = this.props;
	// 	// let locale = language === LANGUAGES.VI ? 'vi_VN' : 'en_US'
	// 	window.fbAsyncInit = function() {
	// 		window.FB.init({
	// 			// appId: process.env.REACT_APP_FACEBOOK_APP_ID,
	// 			cookie: true, // enable cookies to allow the server to access
	// 			// the session
	// 			xfbml: true, // parse social plugins on this page
	// 			version: 'v2.5' // use version 2.1
	// 		});
	// 	};
	// 	// Load the SDK asynchronously
	// 	(function(d, s, id) {
	// 		var js,
	// 			fjs = d.getElementsByTagName(s)[0];
	// 		if (d.getElementById(id)) return;
	// 		js = d.createElement(s);
	// 		js.id = id;
	// 		js.src = `//connect.facebook.net/vi_VN/sdk.js`;
	// 		fjs.parentNode.insertBefore(js, fjs);
	// 	})(document, 'script', 'facebook-jssdk');
	// }
	// componentDidMount() {
	// 	this.initFacebookSDK();
	// }
	// componentDidUpdate(prevProps, prevState, snapshot) {

	// }
	render() {
		// let { width, dataHref, numPosts } = this.props;
		// console.log('check props', this.props);

		return (
			<React.Fragment>
				{/* <div class="fb-comments" data-href={dataHref} data-width={width} data-numposts="5" /> */}
				<div
					class="fb-comments"
					data-href="https://developers.facebook.com/docs/plugins/comments#configurator"
					data-width="100%"
					data-numposts="1"
				/>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.user.isLoggedIn,
		userInfo: state.user.userInfo
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
