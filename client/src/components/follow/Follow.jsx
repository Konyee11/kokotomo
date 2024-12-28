import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./Follow.scss";
import { AuthContext } from "../../state/AuthContext";
import axios from "axios";

export default function Follow({ targetUser }) {
    const [isFollowing, setIsFollowing] = useState(false);

    const { user: currentUser } = useContext(AuthContext);

    useEffect(() => {
        setIsFollowing(targetUser.followers.includes(currentUser._id));
    }, [targetUser.followers, currentUser._id]);

    const handleFollow = async () => {
        try {
            let response;
            if (isFollowing) {
                // フォロー済みなのでフォロー解除のAPIをたたく
                response = await axios.put(
                    `api/users/${targetUser._id}/unfollow`,
                    { userId: currentUser._id }
                );
                console.log(response.data);
            } else {
                // フォローしていないのでフォローのAPIをたたく
                response = await axios.put(
                    `api/users/${targetUser._id}/follow`,
                    { userId: currentUser._id }
                );
                console.log(response.data);
            }

            if (response.status === 200) {
                setIsFollowing(!isFollowing);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="follow">
            <div
                className={`follow__btn ${
                    isFollowing && "follow__btn--active"
                }`}
                onClick={handleFollow}
            >
                {isFollowing ? "フォロー中" : "フォロー"}
            </div>
        </div>
    );
}

Follow.propTypes = {
    targetUser: PropTypes.shape({
        _id: PropTypes.string,
        username: PropTypes.string,
        email: PropTypes.string,
        profilePicture: PropTypes.string,
        coverPicture: PropTypes.string,
        followers: PropTypes.array,
        followings: PropTypes.array,
        desc: PropTypes.string,
        isAdmin: PropTypes.bool,
        createdAt: PropTypes.string,
    }),
};
