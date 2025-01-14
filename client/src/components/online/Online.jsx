import "./Online.scss";
import PropTypes from "prop-types";

export default function Online({ user }) {
    const PUBLIC_FOLDER = import.meta.env.VITE_PUBLIC_FOLDER;

    return (
        <li className="rightbar__friend">
            <div className="rightbar__friend__container">
                <img
                    src={PUBLIC_FOLDER + user.profilePicture}
                    alt=""
                    className="rightbar__friend__img"
                />
                <span className="rightbar__friend__online"></span>
            </div>
            <span className="rightbar__friend__username">{user.username}</span>
        </li>
    );
}

// PropTypesを使用して型を定義
Online.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        profilePicture: PropTypes.string,
        username: PropTypes.string,
    }).isRequired,
};
