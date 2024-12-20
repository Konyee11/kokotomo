import "./Friend.scss";
import PropTypes from "prop-types";

export default function Friend({ user }) {
    const PUBLIC_FOLDER = import.meta.env.VITE_PUBLIC_FOLDER;

    return (
        <li className="sidebar__friend">
            <img
                src={PUBLIC_FOLDER + user.profilePicture}
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
