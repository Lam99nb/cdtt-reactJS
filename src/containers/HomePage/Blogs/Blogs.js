import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import * as actions from '../../../store/actions';
import './Blogs.scss';

import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import HomeHeader from '../HomeHeader';
import HomeFooter from '../HomeFooter';

let imageArray = [
	{
		image: 'https://picsum.photos/id/0/5616/3744',
		title: '學長歸來,MUST國際音樂創作營開箱文',
		time: '2019-10-26'
	},
	{
		image: 'https://picsum.photos/id/10/2500/1667',
		title: '學姊歸來,爽爽開學去',
		time: '2019-10-26'
	},
	{
		image: 'https://picsum.photos/id/1000/5626/3635',
		title: '學弟歸來,開心吃東西去',
		time: '2019-10-26'
	},
	{
		image: 'https://picsum.photos/id/1003/1181/1772',
		title: '老師歸來,悲傷挨罵去',
		time: '2019-10-26'
	}
];

class Blogs extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {}

	renderChildrenView = (item, index) => {
		return (
			<div className="contentBox" key={index}>
				<div className="cardBox">
					<div style={{ backgroundImage: `url(${item.image})` }} className="imageStyle" />
					<div className="fontBox">
						<p className="titleStyle">{item.title}</p>
						<span>{item.time}</span>
					</div>
				</div>
			</div>
		);
	};
	render() {
		return (
			<React.Fragment>
				<Carousel
					dataArray={imageArray}
					autoplay={true}
					delay={10}
					carouselPostWidth={'400px'}
					carouselPostHeight={150}
					carouselPostMargin={10}
				>
					{this.renderChildrenView}
				</Carousel>
			</React.Fragment>
		);
	}
}

class Carousel extends React.Component {
	state = {
		nowIndex: 0
	};
	componentDidMount() {
		if (this.props.autoplay) {
			// this.autoPlay()
		}
	}
	componentWillUnmount() {
		clearInterval(this.timer);
	}
	autoPlay = () => {
		this.timer = setInterval(() => {
			this.changeImagePosition(2);
		}, this.props.delay * 1000);
	};

	conputedLeft = () => {
		const { carouselPostWidth, carouselPostHeight, carouselPostMargin } = this.props;
		const { nowIndex } = this.state;
		console.log('nowIndex', nowIndex);
		let leftSpan = parseInt(`${-nowIndex * parseInt(carouselPostWidth)}`);
		return {
			left:
				carouselPostWidth.toString().match(/[%vw]/) != null
					? `calc(${leftSpan}% - ${carouselPostMargin * 2 * nowIndex}px)`
					: `${leftSpan - carouselPostMargin * 2 * nowIndex}px`
		};
	};

	changeImagePosition = (index) => {
		const { dataArray, block } = this.props;
		const { nowIndex } = this.state;
		// (1 + 1 + 3) % 3
		this.setState({
			nowIndex: (nowIndex + index + dataArray.length) % dataArray.length
		});
	};

	render() {
		const { dataArray, carouselPostMargin, carouselPostWidth, carouselPostHeight } = this.props;
		return (
			<div className="carouselContainer">
				<div className="carouselArea">
					<div style={this.conputedLeft()} className="carouselPosts">
						{dataArray.map((imgaeUrl, index) => {
							return (
								<div
									key={imgaeUrl}
									style={{
										width: carouselPostWidth,
										height: carouselPostHeight,
										margin: `0px ${carouselPostMargin}px `,
										...this.props.carouselPostStyle
									}}
									className="carouselPostBox"
								>
									{this.props.children(imgaeUrl, index)}
								</div>
							);
						})}
					</div>
				</div>

				<div onClick={() => this.changeImagePosition(-2)} className="controlLeft">
					<i className="fa fa-angle-left" />
				</div>
				<div onClick={() => this.changeImagePosition(2)} className="controlRight">
					<i className="fa fa-angle-right" />
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.user.isLoggedIn
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Blogs);
