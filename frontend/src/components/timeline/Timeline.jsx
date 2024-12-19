import "./Timeline.scss";
import Share from "../share/Share";
import Post from "../post/Post";

export default function Timeline() {
    return (
        <div className="timeline">
            <div className="timeline__wrapper">
                <Share />
                <Post />
            </div>
        </div>
    );
}
