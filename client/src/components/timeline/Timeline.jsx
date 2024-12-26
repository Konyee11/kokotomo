import "./Timeline.scss";
import Share from "../share/Share";
import Post from "../post/Post";
import Switchbar from "../switchbar/Switchbar";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { AuthContext } from "../../state/AuthContext";

export default function Timeline({ username }) {
    const [posts, setPosts] = useState([]);
    const [activeTab, setActiveTab] = useState("timeline");

    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchPosts = async () => {
            let endpoint;
            if (username) {
                // ユーザーネームがある＝プロフィールページの場合
                endpoint = `api/posts/users/${username}`;
            } else if (activeTab === "timeline") {
                // ホームの場合
                endpoint = `api/posts/timeline/${user._id}`;
            } else if (activeTab === "recent") {
                // おすすめの場合
                endpoint = "api/recent-posts";
            }

            try {
                const response = await axios.get(endpoint);
                setPosts(
                    response.data.sort((p1, p2) => {
                        return new Date(p2.createdAt) - new Date(p1.createdAt);
                    })
                );
            } catch (error) {
                console.log(error);
            }
        };
        fetchPosts();
    }, [username, user, activeTab]);

    return (
        <div className="timeline">
            <div className="timeline__wrapper">
                <Share />
                {/* プロフィールページではSwitchbarを表示させない */}
                {!username && (
                    <Switchbar
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />
                )}
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
