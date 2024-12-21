import { useContext, useRef } from "react";
import "./Login.scss";
import { loginCall } from "../../dispatch";
import { AuthContext } from "../../state/AuthContext";

export default function Login() {
    const email = useRef();
    const password = useRef();
    const { user, isFetching, error, dispatch } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault(); // ページ遷移を防ぐ
        loginCall(
            { email: email.current.value, password: password.current.value },
            dispatch
        );
    };

    console.log(user);

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
                    <form
                        className="login__box"
                        onSubmit={(e) => handleSubmit(e)}
                    >
                        <p className="login__msg">ログインはこちら</p>
                        <input
                            type="email"
                            className="login__input"
                            placeholder="Eメール"
                            required
                            ref={email}
                        />
                        <input
                            type="password"
                            className="login__input"
                            placeholder="パスワード"
                            required
                            minLength={6}
                            ref={password}
                        />
                        <button className="login__btn">ログイン</button>
                        <span className="login__forgot">
                            パスワードを忘れた方へ
                        </span>
                        <button className="login__registerBtn">新規登録</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
