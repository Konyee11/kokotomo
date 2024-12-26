import "./Switchbar.scss";
import PropTypes from "prop-types";

export default function Switchbar({ activeTab, setActiveTab }) {
    return (
        <div className="switchbar">
            <div className="switchbar__wrapper">
                <div
                    className={
                        activeTab === "recent" ? "switchbar__active" : ""
                    }
                    onClick={() => setActiveTab("recent")}
                >
                    おすすめ
                </div>
                <div
                    className={
                        activeTab === "timeline" ? "switchbar__active" : ""
                    }
                    onClick={() => setActiveTab("timeline")}
                >
                    フォロー中
                </div>
            </div>
        </div>
    );
}

Switchbar.propTypes = {
    activeTab: PropTypes.string.isRequired,
    setActiveTab: PropTypes.func.isRequired,
};
