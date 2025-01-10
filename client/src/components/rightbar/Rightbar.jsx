import "./Rightbar.scss";
import Online from "../online/Online";
import Follow from "../follow/Follow";
import Button from "../btn/Button";
import { Users } from "../../dummyData";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { AuthContext } from "../../state/AuthContext";
import ProfileEditModal from "../modal/ProfileEditModal";

export default function Rightbar({ user }) {
    const { user: loginUser } = useContext(AuthContext);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const PUBLIC_FOLDER = import.meta.env.VITE_PUBLIC_FOLDER;

    const HomeRightbar = () => {
        return (
            <>
                <div className="event">
                    <img
                        src={PUBLIC_FOLDER + "/star.png"}
                        alt=""
                        className="event__star"
                    />
                    <span className="event__text">
                        <b>フォロワー限定</b>
                        イベント開催中！
                    </span>
                </div>
                <img
                    src={PUBLIC_FOLDER + "/event.jpeg"}
                    alt=""
                    className="event__img"
                />
                <h4 className="rightbar__title">オンラインの友達</h4>
                <ul className="rightbar__friendlist">
                    {Users.map((user) => (
                        <Online key={user._id} user={user} />
                    ))}
                </ul>
                <p className="promotion">プロモーション広告</p>
                <img
                    src={PUBLIC_FOLDER + "/promotion/promotion1.jpeg"}
                    alt=""
                    className="promotion__img"
                />
                <p className="promotion__name">ショッピング</p>
                <img
                    src={PUBLIC_FOLDER + "/promotion/promotion2.jpeg"}
                    alt=""
                    className="promotion__img"
                />
                <p className="promotion__name">カーショップ</p>
                <img
                    src={PUBLIC_FOLDER + "/promotion/promotion3.jpeg"}
                    alt=""
                    className="promotion__img"
                />
                <p className="promotion__name">株式会社XYZ</p>
            </>
        );
    };

    const ProfileRightbar = () => {
        return (
            <>
                {user._id !== loginUser._id && <Follow targetUser={user} />}
                {user._id === loginUser._id && (
                    <Button
                        title="プロフィール編集"
                        size="large"
                        onClick={() => setIsModalOpen(true)}
                    />
                )}
                <h4 className="rightbar__title">ユーザー情報</h4>
                <div className="rightbar__info">
                    <div className="rightbar__info__item">
                        <span className="rightbar__info__key">出身地:</span>
                        <span className="rightbar__info__value">
                            {user.place ? user.place : "未設定"}
                        </span>
                    </div>
                    <h4 className="rightbar__title">あなたの友達</h4>
                    <div className="rightbar__followings">
                        <div className="rightbar__following">
                            <img
                                src={PUBLIC_FOLDER + "/person/1.jpg"}
                                alt=""
                                className="rightbar__following__img"
                            />
                            <span className="rightbar__following__name">
                                Konyee
                            </span>
                        </div>
                        <div className="rightbar__following">
                            <img
                                src={PUBLIC_FOLDER + "/person/1.jpg"}
                                alt=""
                                className="rightbar__following__img"
                            />
                            <span className="rightbar__following__name">
                                Konyee
                            </span>
                        </div>
                        <div className="rightbar__following">
                            <img
                                src={PUBLIC_FOLDER + "/person/1.jpg"}
                                alt=""
                                className="rightbar__following__img"
                            />
                            <span className="rightbar__following__name">
                                Konyee
                            </span>
                        </div>
                        <div className="rightbar__following">
                            <img
                                src={PUBLIC_FOLDER + "/person/1.jpg"}
                                alt=""
                                className="rightbar__following__img"
                            />
                            <span className="rightbar__following__name">
                                Konyee
                            </span>
                        </div>
                        <div className="rightbar__following">
                            <img
                                src={PUBLIC_FOLDER + "/person/1.jpg"}
                                alt=""
                                className="rightbar__following__img"
                            />
                            <span className="rightbar__following__name">
                                Konyee
                            </span>
                        </div>
                    </div>
                </div>
            </>
        );
    };

    return (
        <div className="rightbar">
            <div className="rightbar__wrapper">
                {user ? <ProfileRightbar /> : <HomeRightbar />}
            </div>
            {isModalOpen && (
                <ProfileEditModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    user={user}
                />
            )}
        </div>
    );
}

Rightbar.propTypes = {
    user: PropTypes.shape({
        _id: PropTypes.string,
        username: PropTypes.string,
        email: PropTypes.string,
        profilePicture: PropTypes.string,
        coverPicture: PropTypes.string,
        followers: PropTypes.array,
        followings: PropTypes.array,
        desc: PropTypes.string,
        place: PropTypes.string,
        isAdmin: PropTypes.bool,
        createdAt: PropTypes.string,
    }),
};
