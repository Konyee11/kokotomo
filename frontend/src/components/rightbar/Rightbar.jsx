import "./Rightbar.scss";

export default function Rightbar() {
    return (
        <div className="rightbar">
            <div className="rightbar__wrapper">
                <div className="event">
                    <img
                        src="./assets/star.png"
                        alt=""
                        className="event__star"
                    />
                    <span className="event__text">
                        <b>フォロワー限定</b>
                        イベント開催中！
                    </span>
                </div>
                <img src="/assets/event.jpeg" alt="" className="event__img" />
                <h4 className="rightbar__title">オンラインの友達</h4>
                <ul className="rightbar__friendlist">
                    <li className="rightbar__friend">
                        <div className="rightbar__friend__container">
                            <img
                                src="./assets/person/1.png"
                                alt=""
                                className="rightbar__friend__img"
                            />
                            <span className="rightbar__friend__online"></span>
                        </div>
                        <span className="rightbar__friend__username">
                            Konyee
                        </span>
                    </li>
                    <li className="rightbar__friend">
                        <div className="rightbar__friend__container">
                            <img
                                src="./assets/person/2.jpeg"
                                alt=""
                                className="rightbar__friend__img"
                            />
                            <span className="rightbar__friend__online"></span>
                        </div>
                        <span className="rightbar__friend__username">John</span>
                    </li>
                </ul>
                <p className="promotion">プロモーション広告</p>
                <img
                    src="./assets/promotion/promotion1.jpeg"
                    alt=""
                    className="promotion__img"
                />
                <p className="promotion__name">ショッピング</p>
                <img
                    src="./assets/promotion/promotion2.jpeg"
                    alt=""
                    className="promotion__img"
                />
                <p className="promotion__name">カーショップ</p>
                <img
                    src="./assets/promotion/promotion3.jpeg"
                    alt=""
                    className="promotion__img"
                />
                <p className="promotion__name">株式会社XYZ</p>
            </div>
        </div>
    );
}
