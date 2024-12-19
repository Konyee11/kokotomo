import "./Post.scss";
import { MoreVert } from "@mui/icons-material";
import { Users } from "../../dummyData";
import PropTypes from "prop-types";

export default function Post({ post }) {
    const user = Users.filter((user) => user.id === post.userId);

    return (
        <div className="post">
            <div className="post__wrapper">
                <div className="post__top">
                    <div className="post__top__left">
                        <img
                            src={user[0].profilePicture}
                            alt=""
                            className="post__profileimg"
                        />
                        <span className="post__username">
                            {user[0].username}
                        </span>
                        <span className="post__date">{post.date}</span>
                    </div>
                    <div className="post__top__right">
                        <MoreVert />
                    </div>
                </div>
                <div className="post__center">
                    <span className="post__text">{post.desc}</span>
                    <img src={post.photo} alt="" className="post__img" />
                </div>
                <div className="post__bottom">
                    <div className="post__bottom__left">
                        <img
                            src="./assets/heart.png"
                            alt=""
                            className="post__likeIcon"
                        />
                        <span className="post__likeCounter">
                            {post.like}人がいいねを押しました
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
