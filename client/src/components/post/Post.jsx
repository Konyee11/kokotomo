import "./Post.scss";
import { useState, useEffect } from "react";
import { MoreVert } from "@mui/icons-material";
// import { Users } from "../../dummyData";
import PropTypes from "prop-types";
import axios from "axios";

export default function Post({ post }) {
    const PUBLIC_FOLDER = import.meta.env.VITE_PUBLIC_FOLDER;

    const [like, setLike] = useState(post.like);
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios.get(`api/users/${post.userId}`);
            console.log(response.data);

            setUser(response.data);
        };
        fetchUser();
    }, []);

    const handleLike = () => {
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
    };

    return (
        <div className="post">
            <div className="post__wrapper">
                <div className="post__top">
                    <div className="post__top__left">
                        <img
                            src={
                                user.profilePicture ||
                                PUBLIC_FOLDER + "/person/noAvatar.png"
                            }
                            alt=""
                            className="post__profileimg"
                        />
                        <span className="post__username">{user.username}</span>
                        <span className="post__date">{post.date}</span>
                    </div>
                    <div className="post__top__right">
                        <MoreVert />
                    </div>
                </div>
                <div className="post__center">
                    <span className="post__text">{post.desc}</span>
                    <img
                        src={PUBLIC_FOLDER + post.photo}
                        alt=""
                        className="post__img"
                    />
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
        id: PropTypes.number.isRequired,
        desc: PropTypes.string,
        photo: PropTypes.string,
        date: PropTypes.string,
        userId: PropTypes.number.isRequired,
        like: PropTypes.number,
        comment: PropTypes.number,
    }).isRequired,
};
