import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import HomeHeader from '../HomeHeader';
import HomeFooter from '../HomeFooter';

import './About.scss';
class About extends Component {
	render() {
		return (
			<React.Fragment>
				<HomeHeader />
				<div className="about container-fluid">
					<div className="row">
						<div className="col-6 item" data-aos="fade-right">
							<div className="about-header">THỜI TRANG SAM – VẺ ĐẸP QUYẾN RŨ THỜI TRANG PHÁP</div>
							<div className="about-content">
								Đồng hành cùng phụ nữ Việt Nam từ năm 2002, SAM tự hào là thương hiệu góp phần thay đổi
								diện mạo thời trang Việt Nam trên chặng đường hoà mình cùng dòng chảy thời trang thế
								giới. Những thiết kế từ SAM luôn đơn giản nhưng tinh tế, kết hợp giữa sự thanh lịch của
								thời trang Pháp và nét đẹp truyền thống của người Á Đông. <br />
								Đầu tư công sức cho việc thiết kế sản phẩm, chú trọng tới đường nét cắt may tinh xảo,
								lựa chọn những chất liệu cao cấp, các nhà thiết kế từ SAM luôn tin rằng, một bộ trang
								phục dành cho phụ nữ Việt, không chỉ cần sang trọng, quyến rũ, mà còn phải vừa vặn và
								phù hợp với vóc dáng cơ thể đặc trưng của phụ nữ Châu Á. <br />
								Với bốn dòng sản phẩm chính <br />
								SAM New <br />
								SAM Luxury Limited <br />
								Homewear <br />
								cùng những nét đặc trưng riêng trong thiết kế, SAM tự tin mang đến cho khách hàng “giải
								pháp” thời trang phù hợp với nhiều độ tuổi, phong cách ăn mặc và hoàn cảnh sử dụng khác
								nhau.
							</div>
						</div>

						<div className="col-6 item" data-aos="fade-left">
							<div className="about-img" />
						</div>
						<div className="col-6 item" data-aos="fade-right">
							<div className="about-img2" />
							<div className="about-title">
								SAM Luxury Limited: Dòng sản phẩm giới hạn với thiết kế sang trọng, quyến rũ, bắt kịp
								những xu hướng thời trang mới nhất trên thế giới.
							</div>
						</div>
						<div className="col-6 item" data-aos="fade-left">
							<div className="about-img3" />
							<div className="about-title">
								SAM New: Dòng sản phẩm công sở với những thiết kế đa dạng về chất liệu, màu sắc, kiểu
								dáng, mang lại sử mới mẻ, mềm mại và nữ tính cho trang phục công sở thường nhật.
							</div>
						</div>
						<div className="col-6 item" data-aos="fade-right">
							<div className="about-img4" />
							<div className="about-title">
								Homewear: Dòng sản phẩm mặc nhà với chất liệu thoải mái cùng kiểu dáng trẻ trung, đa
								dạng giúp chị em phụ nữ mặc đẹp ngay cả khi ở nhà.
							</div>
						</div>
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
		userInfo: state.user.userInfo
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
