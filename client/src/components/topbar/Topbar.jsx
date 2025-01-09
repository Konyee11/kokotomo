import { useContext } from "react";
import { Link } from "react-router-dom";
import { Search, Chat, Notifications } from "@mui/icons-material";
import "./Topbar.scss";
import { AuthContext } from "../../state/AuthContext";
import PropTypes from "prop-types";

const APP_TITLE = "Kokotomo";
const NO_AVATAR_IMAGE = "/images/noAvatar.png";

/**
 * トップバーコンポーネント
 */
export default function Topbar() {
    const { user } = useContext(AuthContext);

    // ユーザーのプロフィール画像を取得
    const userAvatar = user?.profilePicture || NO_AVATAR_IMAGE;

    return (
        <div className="topbar">
            {/* Left Section */}
            <div className="topbar__left">
                <Link to="/">
                    <span className="topbar__logo">{APP_TITLE}</span>
                </Link>
            </div>

            {/* Center Section */}
            <div className="topbar__center">
                <div className="searchbar">
                    <Search className="searchbar__icon" htmlColor="black" />
                    <input
                        type="text"
                        className="searchbar__input"
                        placeholder="探し物はなんですか？"
                    />
                </div>
            </div>

            {/* Right Section */}
            <div className="topbar__right">
                <div className="topbar__iconItems">
                    <IconItem icon={<Chat />} badge="2" />
                    <IconItem icon={<Notifications />} badge="3" />
                    <Link to={`/profile/${user?.username}`}>
                        <img
                            src={userAvatar}
                            alt="プロフィール画像"
                            className="topbar__profileImg"
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
}

/**
 * アイコンとバッジをまとめた小さなUIコンポーネント
 * @param {JSX.Element} icon アイコン要素 (例: <Chat />)
 * @param {string | number} badge バッジに表示する数値
 */
function IconItem({ icon, badge }) {
    return (
        <div className="topbar__iconItem">
            {icon}
            <span className="topbar__iconBadge">{badge}</span>
        </div>
    );
}

IconItem.propTypes = {
    icon: PropTypes.element.isRequired,
    badge: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
