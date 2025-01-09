import "./Post.scss";
import { useState, useEffect, useContext } from "react";
import { MoreVert } from "@mui/icons-material";
import PropTypes from "prop-types";
import axios from "axios";
import { format, register } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../state/AuthContext";

// 日本語ロケール登録を専用の関数化
const registerJaLocale = () => {
    const jaLocale = (number, index) =>
        [
            ["たった今", "すぐに"],
            ["%s秒前", "%s秒以内"],
            ["1分前", "1分以内"],
            ["%s分前", "%s分以内"],
            ["1時間前", "1時間以内"],
            ["%s時間前", "%s時間以内"],
            ["1日前", "1日以内"],
            ["%s日前", "%s日以内"],
            ["1週間前", "1週間以内"],
            ["%s週間前", "%s週間以内"],
            ["1ヶ月前", "1ヶ月以内"],
            ["%sヶ月前", "%sヶ月以内"],
            ["1年前", "1年以内"],
            ["%s年前", "%s年以内"],
        ][index];

    register("ja", jaLocale);
};

registerJaLocale();

export default function Post({ post }) {
    const PUBLIC_FOLDER = import.meta.env.VITE_PUBLIC_FOLDER;
    const { user: currentUser } = useContext(AuthContext);

    const [likeCount, setLikeCount] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({}); // 投稿したユーザー情報

    // ユーザー情報を取得
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(
                    `api/users?userId=${post.userId}`
                );
                setUser(response.data);
            } catch (error) {
                console.error("ユーザー情報の取得に失敗しました:", error);
            }
        };
        fetchUser();
    }, [post.userId]);

    // いいねボタンの処理
    const handleLike = async () => {
        try {
            await axios.put(`api/posts/${post._id}/like`, {
                userId: currentUser._id,
            });
            // 成功すればローカル状態を更新
            setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
            setIsLiked((prev) => !prev);
        } catch (error) {
            console.error("いいね処理に失敗しました:", error);
        }
    };

    return (
        <div className="post">
            <div className="post__wrapper">
                <div className="post__top">
                    <div className="post__top__left">
                        <Link to={`/profile/${user.username}`}>
                            <img
                                src={
                                    user.profilePicture
                                        ? user.profilePicture
                                        : "/images/noAvatar.png"
                                }
                                alt="アバター"
                                className="post__profileimg"
                            />
                        </Link>
                        <span className="post__username">{user.username}</span>
                        <span className="post__date">
                            {format(post.createdAt, "ja")}
                        </span>
                    </div>
                    <div className="post__top__right">
                        <MoreVert />
                    </div>
                </div>

                <div className="post__center">
                    <span className="post__text">{post.desc}</span>
                    {post.img && (
                        <img
                            src={post.img}
                            alt="投稿画像"
                            className="post__img"
                        />
                    )}
                </div>

                <div className="post__bottom">
                    <div className="post__bottom__left">
                        <img
                            src={`${PUBLIC_FOLDER}/heart.png`}
                            alt="like icon"
                            className="post__likeIcon"
                            onClick={handleLike}
                        />
                        <span className="post__likeCounter">
                            {likeCount}人がいいねを押しました
                        </span>
                    </div>
                    <div className="post__bottom__right">
                        <span className="post__commentText">
                            {post.comment}コメント
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

// PropTypes
Post.propTypes = {
    post: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        desc: PropTypes.string,
        img: PropTypes.string,
        createdAt: PropTypes.string,
        userId: PropTypes.string.isRequired,
        likes: PropTypes.array,
        comment: PropTypes.number,
    }).isRequired,
};
