import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import * as actions from '../../../store/actions';
import './Search.scss';

import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import HomeHeader from '../HomeHeader';
import HomeFooter from '../HomeFooter';

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			listProductSearchResults: []
		};
	}
	static propTypes = {
		match: PropTypes.object.isRequired,
		location: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired
	};
	componentDidMount() {}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.resultsProductRedux !== this.props.resultsProductRedux) {
			this.setState({
				listProductSearchResults: this.props.resultsProductRedux
			});
		}
	}
	render() {
		const { match } = this.props;
		let arrProducts = this.state.listProductSearchResults;
		return (
			<React.Fragment>
				<HomeHeader />
				<div className="text-title">TRANG CHỦ/ TÌM KIẾM</div>
				<div className="container">
					<div className="row">
						<div className="text-result">Kết tìm kiếm cho : {match.params.q}</div>
						{arrProducts &&
							arrProducts.length > 0 &&
							arrProducts.map((item, index) => {
								let imageBase64 = '';
								if (item.image) {
									imageBase64 = new Buffer(item.image, 'base64').toString('binary');
								}
								return (
									<div className="product-item col-3 " data-aos="zoom-in" key={index}>
										<div className="card ">
											<div
												className="card-img-top product-img"
												alt="Card image cap"
												style={{ backgroundImage: `url(${imageBase64})` }}
											/>
											<div className="card-body">
												<h5 className="item-title">{item.productName}</h5>
												<p className="item-price">
													{item.price}
													<span>₫</span>
												</p>
											</div>
										</div>
									</div>
								);
							})}
					</div>
				</div>
				<HomeFooter />
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.user.isLoggedIn,
		resultsProductRedux: state.product.resultsProduct
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));
