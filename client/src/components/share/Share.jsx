import { useContext } from "react";
import "./Share.scss";
import { Analytics, Face, GifBox, Image } from "@mui/icons-material";
import { AuthContext } from "../../state/AuthContext";

export default function Share() {
    const PUBLIC_FOLDER = import.meta.env.VITE_PUBLIC_FOLDER;

    const { user } = useContext(AuthContext);

    return (
        <div className="share">
            <div className="share__wrapper">
                <div className="share__top">
                    <img
                        src={
                            user.profilePicture
                                ? PUBLIC_FOLDER + user.profilePicture
                                : PUBLIC_FOLDER + "/person/noAvatar.png"
                        }
                        alt=""
                        className="share__profileimg"
                    />
                    <input
                        type="text"
                        placeholder="今の気持ちを投稿してみよう！"
                        className="share__input"
                    />
                </div>
                <hr className="share__hr" />
                <div className="share__buttons">
                    <div className="share__options">
                        <div className="share__option">
                            <Image
                                className="share__option__icon"
                                htmlColor="tomato"
                            />
                            <span className="share__option__text">写真</span>
                        </div>
                        <div className="share__option">
                            <GifBox
                                className="share__option__icon"
                                htmlColor="yellowgreen"
                            />
                            <span className="share__option__text">GIF</span>
                        </div>
                        <div className="share__option">
                            <Face
                                className="share__option__icon"
                                htmlColor="skyblue"
                            />
                            <span className="share__option__text">気持ち</span>
                        </div>
                        <div className="share__option">
                            <Analytics
                                className="share__option__icon"
                                htmlColor="gold"
                            />
                            <span className="share__option__text">投票</span>
                        </div>
                    </div>
                    <button className="share__button">投稿</button>
                </div>
            </div>
        </div>
    );
}
