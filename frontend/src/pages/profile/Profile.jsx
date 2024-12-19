import "./Profile.scss";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Timeline from "../../components/timeline/Timeline";
import Rightbar from "../../components/rightbar/Rightbar";

export default function Profile() {
    return (
        <>
            <Topbar />
            <div className="profile">
                <Sidebar />
                <div className="profile__right">
                    <div className="profile__right__top">
                        <div className="profile__cover">
                            <img
                                src="assets/post/3.jpeg"
                                alt=""
                                className="profile__cover__img"
                            />
                            <img
                                src="assets/person/3.jpeg"
                                alt=""
                                className="profile__cover__user"
                            />
                        </div>
                        <div className="profile__info">
                            <h4 className="profile__info__name">Konyee</h4>
                            <span className="profile__info__desc">
                                はじめまして
                            </span>
                        </div>
                    </div>
                    <div className="profile__right__bottom">
                        <Timeline />
                        <Rightbar />
                    </div>
                </div>
            </div>
        </>
    );
}
