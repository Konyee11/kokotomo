import "./Share.scss";
import { useContext, useRef, useState } from "react";
import { Analytics, Face, GifBox, Image } from "@mui/icons-material";
import { AuthContext } from "../../state/AuthContext";
import axios from "axios";

export default function Share() {
    const PUBLIC_FOLDER = import.meta.env.VITE_PUBLIC_FOLDER;

    const { user } = useContext(AuthContext);

    const desc = useRef(); // 投稿内容を取得するためのref

    // 投稿するファイルを取得するためのstate
    const [file, setFile] = useState(null);

    // 投稿ボタンをクリックしたときの処理
    const handleSubmit = async (e) => {
        e.preventDefault(); // ページ遷移を防ぐ

        // 新しい投稿を作成
        const newPost = {
            userId: user._id,
            desc: desc.current.value,
        };
        console.log(newPost);

        if (file) {
            // ファイルがある場合は，ファイルをアップロードする
            const data = new FormData(); // ファイルを送信するためのFormDataを作成
            data.append("image", file); // 画像を追加
            data.append("folder", "post"); // 画像を保存するフォルダをpostに指定

            try {
                // ファイルをアップロードするAPIをたたく
                const uploadRes = await axios.post("api/upload", data);
                newPost.img = uploadRes.data.imageUrl; // 画像のURLをnewPostに追加
            } catch (error) {
                console.log("画像アップロードエラー:", error);
                return;
            }
        }

        try {
            // 投稿のAPIをたたく
            await axios.post("api/posts/", newPost);
            window.location.reload(); // ページをリロード
        } catch (error) {
            console.log("投稿エラー:", error);
        }
    };

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
                        ref={desc}
                        id="desc"
                    />
                </div>
                <hr className="share__hr" />
                <form
                    className="share__buttons"
                    onSubmit={(e) => handleSubmit(e)}
                >
                    <div className="share__options">
                        <label className="share__option" htmlFor="file">
                            <Image
                                className="share__option__icon"
                                htmlColor="tomato"
                            />
                            <span className="share__option__text">写真</span>
                            <input
                                type="file"
                                id="file"
                                accept=".png, .jpeg, .jpg"
                                style={{ display: "none" }}
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </label>
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
                    <button className="share__button" type="submit">
                        投稿
                    </button>
                </form>
            </div>
        </div>
    );
}
