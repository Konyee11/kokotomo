import "./Timeline.scss";
import Share from "../share/Share";
import Post from "../post/Post";
import { useEffect, useState } from "react";
// import { Posts } from "../../dummyData";
import axios from "axios";

export default function Timeline() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await axios.get(
                "api/posts/timeline/675e4db9739c91b694fe66d6"
            );
            // console.log(response.data);

            setPosts(response.data);
        };
        fetchPosts();
    }, []);

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
