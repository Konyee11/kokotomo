import "./Profile.scss";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Timeline from "../../components/timeline/Timeline";
import Rightbar from "../../components/rightbar/Rightbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

export default function Profile() {
    const PUBLIC_FOLDER = import.meta.env.VITE_PUBLIC_FOLDER;

    const [user, setUser] = useState({});
    const username = useParams().username; // /profile/:usernameのusernameを取得

    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios.get(`api/users/?username=${username}`);
            setUser(response.data);
        };
        fetchUser();
    }, [username]);

    useEffect(() => {
        // スクロール位置をリセットするためにページ遷移時にトップにスクロール
        window.scrollTo(0, 0);
    }, []);

    // console.log(user);

    return (
        <>
            <Topbar />
            <div className="profile">
                <Sidebar />
                <div className="profile__right">
                    <div className="profile__right__top">
                        <div className="profile__cover">
                            <img
                                src={PUBLIC_FOLDER + "/post/3.jpeg"}
                                alt=""
                                className="profile__cover__img"
                            />
                            <img
                                src={
                                    PUBLIC_FOLDER +
                                    (user.profilePicture ||
                                        "/person/noAvatar.png")
                                }
                                alt=""
                                className="profile__cover__user"
                            />
                        </div>
                        <div className="profile__info">
                            <h4 className="profile__info__name">
                                {user.username}
                            </h4>
                            <span className="profile__info__desc">
                                {user.desc}
                            </span>
                        </div>
                    </div>
                    <div className="profile__right__bottom">
                        <Timeline username={username} />
                        <Rightbar user={user} />
                    </div>
                </div>
            </div>
        </>
    );
}
