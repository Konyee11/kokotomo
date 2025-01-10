import "./Share.scss";
import { useContext, useState } from "react";
import { Analytics, Face, GifBox, Image } from "@mui/icons-material";
import { AuthContext } from "../../state/AuthContext";
import axios from "axios";

/**
 * 投稿コンポーネント
 */
export default function Share() {
    const { user } = useContext(AuthContext);

    // 投稿内容テキストのref
    // const descRef = useRef();

    const [desc, setDesc] = useState("");

    // 投稿するファイルを管理するstate
    const [file, setFile] = useState(null);

    /**
     * 画像アップロード専用の関数
     * @param {File} file アップロードするファイル
     * @returns アップロードされた画像のURL
     */
    const uploadImage = async (file) => {
        if (!file) return null;
        try {
            const formData = new FormData();
            formData.append("image", file);
            formData.append("folder", "post");
            formData.append("userId", user._id);

            const uploadRes = await axios.post("api/upload", formData);
            return uploadRes.data.imageUrl;
        } catch (error) {
            console.error("画像アップロードエラー:", error);
            throw error; // ここでエラーを投げて上位で処理
        }
    };

    /**
     * 投稿ボタン押下時の処理
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        // 1. 新規投稿データを作成
        const newPost = {
            userId: user._id,
            desc: desc,
        };

        // 2. 画像がある場合はアップロード
        if (file) {
            try {
                const imageUrl = await uploadImage(file);
                newPost.img = imageUrl;
            } catch {
                // アップロードエラー時は投稿処理を中断
                return;
            }
        }

        // 3. 投稿APIを呼び出し
        try {
            await axios.post("api/posts/", newPost);
            window.location.reload(); // 投稿後、ページをリロード
        } catch (error) {
            console.error("投稿エラー:", error);
        }
    };

    return (
        <div className="share">
            <div className="share__wrapper">
                <div className="share__top">
                    <img
                        src={
                            user.profilePicture
                                ? user.profilePicture
                                : "/images/noAvatar.png"
                        }
                        alt="プロフィール画像"
                        className="share__profileimg"
                    />
                    <input
                        type="text"
                        placeholder="今の気持ちを投稿してみよう！"
                        className="share__input"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                    />
                </div>
                <hr className="share__hr" />

                <form className="share__buttons" onSubmit={handleSubmit}>
                    <div className="share__options">
                        {/* 写真アップロード */}
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

                    <button
                        className="share__button"
                        type="submit"
                        disabled={!desc.trim()}
                    >
                        投稿
                    </button>
                </form>
            </div>
        </div>
    );
}
