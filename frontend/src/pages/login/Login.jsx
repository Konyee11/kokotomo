import "./Login.scss";

export default function Login() {
    return (
        <div className="login">
            <div className="login__wrapper">
                <div className="login__left">
                    <h3 className="login__logo">Kokotomo</h3>
                    <div className="login__desc">
                        心をシェアする、ココトモ。
                    </div>
                </div>
                <div className="login__right">
                    <div className="login__box">
                        <p className="login__msg">ログインはこちら</p>
                        <input
                            type="text"
                            className="login__input"
                            placeholder="Eメール"
                        />
                        <input
                            type="text"
                            className="login__input"
                            placeholder="パスワード"
                        />
                        <button className="login__btn">ログイン</button>
                        <span className="login__forgot">
                            パスワードを忘れた方へ
                        </span>
                        <button className="login__registerBtn">新規登録</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
