import "./Post.scss";
import { useState, useEffect, useContext } from "react";
import { MoreVert } from "@mui/icons-material";
import PropTypes from "prop-types";
import axios from "axios";
import { format, register } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../state/AuthContext";

export default function Post({ post }) {
    const PUBLIC_FOLDER = import.meta.env.VITE_PUBLIC_FOLDER;

    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({}); // 投稿したユーザー情報を取得

    const { user: currentUser } = useContext(AuthContext); // ログインユーザー情報を取得

    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios.get(`api/users?userId=${post.userId}`);

            setUser(response.data);
        };
        fetchUser();
    }, [post.userId]);

    const handleLike = async () => {
        try {
            // いいねのAPIをたたく
            const response = await axios.put(`api/posts/${post._id}/like`, {
                userId: currentUser._id,
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
    };

    // 日本語ロケールの定義
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

    // 日本語ロケールを登録
    register("ja", jaLocale);

    return (
        <div className="post">
            <div className="post__wrapper">
                <div className="post__top">
                    <div className="post__top__left">
                        <Link to={`/profile/${user.username}`}>
                            <img
                                src={
                                    PUBLIC_FOLDER +
                                    (user.profilePicture ||
                                        "/person/noAvatar.png")
                                }
                                alt=""
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
                    <img src={post.img} alt="" className="post__img" />
                </div>
                <div className="post__bottom">
                    <div className="post__bottom__left">
                        <img
                            src={PUBLIC_FOLDER + "/heart.png"}
                            alt=""
                            className="post__likeIcon"
                            onClick={() => handleLike()}
                        />
                        <span className="post__likeCounter">
                            {like}人がいいねを押しました
                        </span>
                    </div>
                    <div className="post__bottom__right">
                        <span className="post__commentText">
                            {post.comment}:コメント
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

// PropTypesを使用して型を定義
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
