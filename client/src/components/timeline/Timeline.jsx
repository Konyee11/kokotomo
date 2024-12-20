import "./Timeline.scss";
import Share from "../share/Share";
import Post from "../post/Post";
import { Posts } from "../../dummyData";

export default function Timeline() {
    return (
        <div className="timeline">
            <div className="timeline__wrapper">
                <Share />
                {Posts.map((post) => (
                    <Post key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
}
