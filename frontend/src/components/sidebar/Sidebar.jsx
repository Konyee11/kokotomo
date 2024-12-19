import {
    Bookmark,
    Home,
    Message,
    Notifications,
    Person,
    Search,
    Settings,
} from "@mui/icons-material";
import "./Sidebar.scss";

export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar__wrapper">
                <ul className="sidebar__list">
                    <li className="sidebar__item">
                        <Home className="sidebar__icon" />
                        <span className="sidebar__text">ホーム</span>
                    </li>
                    <li className="sidebar__item">
                        <Search className="sidebar__icon" />
                        <span className="sidebar__text">検索</span>
                    </li>
                    <li className="sidebar__item">
                        <Notifications className="sidebar__icon" />
                        <span className="sidebar__text">通知</span>
                    </li>
                    <li className="sidebar__item">
                        <Message className="sidebar__icon" />
                        <span className="sidebar__text">メッセージ</span>
                    </li>
                    <li className="sidebar__item">
                        <Bookmark className="sidebar__icon" />
                        <span className="sidebar__text">ブックマーク</span>
                    </li>
                    <li className="sidebar__item">
                        <Person className="sidebar__icon" />
                        <span className="sidebar__text">プロフィール</span>
                    </li>
                    <li className="sidebar__item">
                        <Settings className="sidebar__icon" />
                        <span className="sidebar__text">設定</span>
                    </li>
                </ul>
                <hr className="sidebar_hr" />
                <ul className="sidebar__friendlist">
                    <li className="sidebar__friend">
                        <img
                            src="/public/assets/person/2.jpeg"
                            alt=""
                            className="sidebar__friendimg"
                        />
                        <span className="sidebar__friendname">John Doe</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}
