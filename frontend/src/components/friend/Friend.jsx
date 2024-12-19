import "./Friend.scss";
import PropTypes from "prop-types";

export default function Friend({ user }) {
    return (
        <li className="sidebar__friend">
            <img
                src={user.profilePicture}
                alt=""
                className="sidebar__friendimg"
            />
            <span className="sidebar__friendname">{user.username}</span>
        </li>
    );
}

Friend.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        profilePicture: PropTypes.string,
        username: PropTypes.string,
    }),
};
