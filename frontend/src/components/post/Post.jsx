import "./Post.scss";
import { MoreVert } from "@mui/icons-material";

export default function Post() {
    return (
        <div className="post">
            <div className="post__wrapper">
                <div className="post__top">
                    <div className="post__top__left">
                        <img
                            src="./assets/person/1.png"
                            alt=""
                            className="post__profileimg"
                        />
                        <span className="post__username">Konyee</span>
                        <span className="post__date">5分前</span>
                    </div>
                    <div className="post__top__right">
                        <MoreVert />
                    </div>
                </div>
                <div className="post__center">
                    <span className="post__text">Hello World!</span>
                    <img
                        src="./assets/post/1.jpeg"
                        alt=""
                        className="post__img"
                    />
                </div>
                <div className="post__bottom">
                    <div className="post__bottom__left">
                        <img
                            src="./assets/heart.png"
                            alt=""
                            className="post__likeIcon"
                        />
                        <span className="post__likeCounter">
                            5人がいいねを押しました
                        </span>
                    </div>
                    <div className="post__bottom__right">
                        <span className="post__commentText">4:コメント</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
