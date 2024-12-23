import "./Timeline.scss";
import Share from "../share/Share";
import Post from "../post/Post";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { AuthContext } from "../../state/AuthContext";

export default function Timeline({ username }) {
    const [posts, setPosts] = useState([]);

    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = username
                ? await axios.get(`api/posts/users/${username}`) // プロフィールの場合
                : await axios.get(`api/posts/timeline/${user._id}`); // ホームの場合

            setPosts(
                response.data.sort((p1, p2) => {
                    return new Date(p2.createdAt) - new Date(p1.createdAt);
                })
            );
        };
        fetchPosts();
    }, [username, user]);

    return (
        <div className="timeline">
            <div className="timeline__wrapper">
                <Share />
                {posts.map((post) => (
                    <Post key={post._id} post={post} />
                ))}
            </div>
        </div>
    );
}
Timeline.propTypes = {
    username: PropTypes.string,
};
