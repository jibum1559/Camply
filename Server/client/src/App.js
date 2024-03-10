import React, { useState, useEffect, Component } from "react";
import ShopDetail from "./Component/pages/shop/ShopDetail/ShopDetail";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import Register from "./Component/pages/common/Register";
import GeneralRegister from "./Component/pages/common/GeneralRegister";
import ManagerRegister from "./Component/pages/common/ManagerRegister";
import GeneralEmailRegister from "./Component/pages/common/GeneralEmailRegister";
import ManagerEmailRegister from "./Component/pages/common/ManagerEmailRegister";
import Login from "./Component/pages/common/Login";
import Preloader from "./Pre";
import Navbar from "./Component/pages/camp/CampNavbar";
import CampSearch from "./Component/pages/camp/CampSearch/CampSearch";
import Home from "./Component/pages/camp/CampMain/Home/Home";
import About from "./Component/pages/camp/CampMain/About/About";
import Reservations from "./Component/pages/camp/CampMain/Reservations/Reservations";
import Inquiry from "./Component/pages/camp/CampMain/Inquiry/Inquiry";
import ScrollToTop from "./Component/pages/camp/CampScrollToTop";
import "./Component/pages/camp/CampStyle.css";
import "./CampApp.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./Component/pages/camp/CampFooter";
import ShopMain from "./Component/pages/shop/ShopMain";
import ShopMyPage from "./Component/pages/shop/ShopMyPage/ShopMyPage";
import ShopLayout from "./Component/pages/shop/ShopLayout";
import Tent from "./Component/pages/shop/Category/Tent";
import Sleeping from "./Component/pages/shop/Category/Sleeping";
import Kitchen from "./Component/pages/shop/Category/Kitchen";
import Lamp from "./Component/pages/shop/Category/Lamp";
import BBQ from "./Component/pages/shop/Category/BBQ";
import Chair from "./Component/pages/shop/Category/Table";
import CreateProduct from "./Component/pages/shop/ShopOrder/CreateProduct";
import SellerProduct from "./Component/pages/shop/ShopOrder/SellerProduct";
import UpdateProduct from "./Component/pages/shop/ShopOrder/UpdateProduct";
import OrderProduct from "./Component/pages/shop/ShopOrder/OrderProduct";
import ShopMore from "./Component/pages/shop/ShopDetail/ShopMore/ShopMore";
import ShopInquiry from "./Component/pages/shop/ShopDetail/ShopInquiry/ShopInquiry";
import ButtonUp from "./Component/pages/shop/ButtonUp";
import ShopReview from "./Component/pages/shop/ShopDetail/ShopReview/ShopReview";
import ReviewDetail from "./Component/pages/shop/ShopDetail/ShopReview/ReviewDetail";
import ReviewUpdate from "./Component/pages/shop/ShopDetail/ShopReview/ReviewUpdate";
import InquiryDetail from "./Component/pages/shop/ShopDetail/ShopInquiry/InquiryDetail";
import UpdateBoard from "./Component/pages/camp/CampBoard/CampBoardUpdate";
import InquiryUpdate from "./Component/pages/shop/ShopDetail/ShopInquiry/InquiryUpdate";
import InquiryWriter from "./Component/pages/shop/ShopDetail/ShopInquiry/InquiryWriter";
import ReviewWriter from "./Component/pages/shop/ShopDetail/ShopReview/ReviewWriter";
import ShopCart from "./Component/pages/shop/ShopCart";
import OrderCart from "./Component/pages/shop/ShopOrder/Order/OrderCart";
import MyPage from "./Component/pages/common/MyPage";
import EditUser from "./Component/pages/common/EditUser";
import campMainImg from "./Component/img/MainImg/ai-generated-8541462_1280.jpg";
import ShopMainImg from "./Component/img/MainImg/camping-7947056_1280.jpg";
import CampBoard from "./Component/pages/camp/CampBoard/CampBoard";
import CampBoardAll from "./Component/pages/camp/CampBoard/CampBoardAll";
import CampBoardDetail from "./Component/pages/camp/CampBoard/CampBoardDetail";
import CampBoardUpdate from "./Component/pages/camp/CampBoard/CampBoardUpdate";
import CampReserve from "./Component/pages/camp/CampReserve/CampReserve";
import CampBoardTent from "./Component/pages/camp/CampBoard/CampBoardTent";
import CampBoardCaravan from "./Component/pages/camp/CampBoard/CampBoardCaravan";
import CampBoardGlamping from "./Component/pages/camp/CampBoard/CampBoardGlamping";
import CampBoardPension from "./Component/pages/camp/CampBoard/CampBoardPension";
import CampBoardSite from "./Component/pages/camp/CampBoard/CampBoardSite";
import MyShopping from "./Component/pages/common/MyShopping";
import MyCamping from "./Component/pages/common/MyCamping";
import SellerMypage from "./Component/pages/common/SellerMypage";
import MypageupdateAnddelete from "./Component/pages/common/MypageupdateAnddelete";
import MyLikeList from "./Component/pages/common/MyLikeList";
import CartList from "./Component/pages/shop/ShopCart/Cartlist";
import OrderList from "./Component/pages/shop/ShopOrder/Order/OrderMain";
// import "./Component/pages/camp/CampStyle.css";
// import "./CampApp.css";
// import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  const [load, upadateLoad] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      upadateLoad(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);
  // 탭 상태 관리
  const [activeTab, setActiveTab] = useState("list");
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div style={{ marginTop: "150px", marginBottom: "8%" }}>
              <div className="container text-center mt-5">
                <h1 className="main-camply" style={{ fontSize: "140px" }}>
                  Camply
                  <p
                    className="main-camply-p"
                    style={{ fontSize: "40px", color: "black" }}
                  >
                    Camp is your life
                  </p>
                </h1>
                <h2
                  style={{ marginBottom: "100px" }}
                  className="display-4"
                  id="main-h2"
                ></h2>
                <div
                  style={{ gap: "100px" }}
                  className="d-flex justify-content-center"
                >
                  <Link to="/camp" className="btn btn-primary m-2">
                    <img
                      src={campMainImg}
                      alt="Camping Image"
                      className="img-thumbnail"
                      style={{ width: "350px", height: "300px" }}
                    />
                    <p
                      id="main-h2"
                      style={{ fontWeight: "bold", fontSize: "16px" }}
                    >
                      캠핑 예약
                    </p>
                  </Link>
                  <Link to="/shop/main" className="btn btn-success m-2">
                    <img
                      src={ShopMainImg}
                      alt="Shopping Image"
                      className="img-thumbnail"
                      style={{ width: "350px", height: "300px" }}
                    />
                    <p
                      id="main-h2"
                      style={{ fontWeight: "bold", fontSize: "16px" }}
                    >
                      쇼핑몰
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          }
        />
        <Route
          path="/shop/seller"
          element={
            <div>
              <Navbar />
              <h1 style={{ marginTop: "160px" }}></h1>
              <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="sellermanagement" role="presentation">
                  <button
                    class={`nav-link ${activeTab === "list" ? "active" : ""}`}
                    onClick={() => setActiveTab("list")}
                  >
                    상품리스트
                  </button>
                </li>
                <li class="sellermanagement" role="presentation">
                  <button
                    class={`nav-link ${
                      activeTab === "orderlist" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("orderlist")}
                  >
                    주문관리
                  </button>
                </li>

                <li class="sellermanagement" role="presentation">
                  <button
                    class={`nav-link ${activeTab === "sell" ? "active" : ""}`}
                    onClick={() => setActiveTab("sell")}
                  >
                    상품등록
                  </button>
                </li>
              </ul>
              <div className="tab-content" id="nav-tabContent">
                {activeTab === "home" && <div></div>}
                {activeTab === "sell" && <CreateProduct />}
                {activeTab === "list" && <SellerProduct />}
                {activeTab === "orderlist" && <OrderProduct />}
              </div>
              {/* <Link to="/shop/seller/sell">상품등록</Link>
              <Link to="/shop/seller/list">상품리스트</Link> */}
            </div>
          }
        />
        <Route
          path="/shop/seller/*"
          element={
            <>
              <Preloader load={load} />
              <div className="App" id={load ? "no-scroll" : "scroll"}>
                <Routes>
                  <Route path="/sell" element={<CreateProduct />} />
                  <Route path="/list" element={<SellerProduct />} />
                  <Route path="/edit/:productId" element={<UpdateProduct />} />
                  <Route path="/orderlist" element={<OrderProduct />} />
                </Routes>
              </div>
            </>
          }
        />
        <Route
          path="/camp/*"
          element={
            <>
              <Preloader load={load} />
              <div className="App" id={load ? "no-scroll" : "scroll"}>
                <Navbar />
                <ScrollToTop />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/reservation" element={<Reservations />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/inquiry" element={<Inquiry />} />
                </Routes>
              </div>
            </>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/register/general" element={<GeneralRegister />} />
        <Route path="/register/manager" element={<ManagerRegister />} />
        <Route
          path="/register/general/email"
          element={<GeneralEmailRegister />}
        />
        <Route
          path="/register/manager/email"
          element={<ManagerEmailRegister />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/camp/board/add" element={<CampBoard />} />
        <Route path="/camp/board/all" element={<CampBoardAll />} />
        <Route path="/camp/board/get/:camp_id" element={<CampBoardDetail />} />
        <Route
          path="/camp/board/edit/:camp_id"
          element={<CampBoardUpdate />}
        />{" "}
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/myshopping" element={<MyShopping />} />
        <Route path="/mypage" element={<MypageupdateAnddelete />} />
        <Route path="/mylikelist" element={<MyLikeList />} />
        <Route path="/sellermypage" element={<SellerMypage />} />
        <Route path="/mypageupdate" element={<MypageupdateAnddelete />} />
        <Route path="/mypage/edit" element={<EditUser />} />
        <Route path="/camp/searchList" element={<CampSearch />} />
        <Route path="/camp/reserve" element={<CampReserve />} />
        <Route path="/camp/board/caravan" element={<CampBoardCaravan />} />
        <Route path="/camp/board/tent" element={<CampBoardTent />} />
        <Route path="/camp/board/glamping" element={<CampBoardGlamping />} />
        <Route path="/camp/board/site" element={<CampBoardSite />} />
        <Route path="/camp/board/pension" element={<CampBoardPension />} />
        <Route
          path="/shop/*"
          element={
            <>
              <ScrollToTop />
              <Routes>
                <Route path="/main" element={<ShopMain />} />
                <Route path="/detail/:productId" element={<ShopDetail />} />
                <Route path="/mypage" element={<ShopMyPage />} />
                <Route path="/cart" element={<ShopCart />} />
                <Route path="/tent" element={<Tent />} />
                <Route path="/chair" element={<Chair />} />
                <Route path="/sleeping" element={<Sleeping />} />
                <Route path="/kitchen" element={<Kitchen />} />
                <Route path="/lamp" element={<Lamp />} />
                <Route path="/fireplace" element={<BBQ />} />
              </Routes>
            </>
          }
        />
        <Route path="/shop/mycart/:userId" element={<CartList />} />
        <Route path="/shop/order/:productId" element={<OrderCart />} />
        <Route
          path="/shop/mypage/general/myorder/view:userId"
          element={<OrderList />}
        />
        <Route path="/shop/detail/:productId/more" element={<ShopMore />} />
        <Route path="/shop/detail/:productId/review" element={<ShopReview />} />
        <Route path="/shop/review/view/:reviewNo" element={<ReviewDetail />} />
        <Route path="/review/update/:reviewNo" element={<ReviewUpdate />} />
        <Route
          parh="/shop/detail/:productId/inquiry"
          element={<ShopInquiry />}
        />
        <Route
          path="/shop/question/view/:questionNo"
          element={<InquiryDetail />}
        />
        <Route path="/inquiry/update/:questionNo" element={<InquiryUpdate />} />
        <Route path="/inquiry/writer" element={<InquiryWriter />} />
        <Route path="/review/writer" element={<ReviewWriter />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
