import { Search, Chat, Notifications } from "@mui/icons-material";
import "./Topbar.scss";
import { Link } from "react-router-dom";

export default function Topbar() {
    const PUBLIC_FOLDER = import.meta.env.VITE_PUBLIC_FOLDER;

    return (
        <div className="topbar">
            <div className="topbar__left">
                <Link to="/">
                    <span className="topbar__logo">Kokotomo</span>
                </Link>
            </div>
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
            <div className="topbar__right">
                <div className="topbar__iconItems">
                    <div className="topbar__iconItem">
                        <Chat />
                        <span className="topbar__iconBadge">1</span>
                    </div>
                    <div className="topbar__iconItem">
                        <Notifications />
                        <span className="topbar__iconBadge">2</span>
                    </div>
                    <img
                        src={PUBLIC_FOLDER + "/person/1.png"}
                        alt="User"
                        className="topbar__profileImg"
                    />
                </div>
            </div>
        </div>
    );
}