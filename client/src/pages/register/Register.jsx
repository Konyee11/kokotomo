import "./Register.scss";

export default function Register() {
    return (
        <div className="register">
            <div className="register__wrapper">
                <div className="register__left">
                    <h3 className="register__logo">Kokotomo</h3>
                    <div className="register__desc">
                        心をシェアする、ココトモ。
                    </div>
                </div>
                <div className="register__right">
                    <div className="register__box">
                        <p className="register__msg">新規登録はこちら</p>
                        <input
                            type="text"
                            className="register__input"
                            placeholder="ユーザー名"
                        />
                        <input
                            type="text"
                            className="register__input"
                            placeholder="Eメール"
                        />
                        <input
                            type="text"
                            className="register__input"
                            placeholder="パスワード"
                        />
                        <input
                            type="text"
                            className="register__input"
                            placeholder="確認用パスワード"
                        />
                        <button className="register__btn">サインアップ</button>

                        <button className="register__registerBtn">
                            ログイン
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
