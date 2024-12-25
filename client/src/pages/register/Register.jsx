import { useRef } from "react";
import "./Register.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();

    const navigateToLogin = useNavigate(); // ログインページに遷移する関数

    const handleSubmit = async (e) => {
        e.preventDefault(); // ページ遷移を防ぐ
        if (passwordAgain.current.value !== password.current.value) {
            // パスワードと確認用パスワードが一致しない場合
            passwordAgain.current.setCustomValidity("パスワードが一致しません");
        } else {
            try {
                // registerAPIを呼び出す
                const user = {
                    username: username.current.value,
                    email: email.current.value,
                    password: password.current.value,
                };
                await axios.post("/api/auth/register", user);
                navigateToLogin("/login"); // ログインページに遷移
            } catch (error) {
                console.log(error);
            }
        }
    };
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
                    <form
                        className="register__box"
                        onSubmit={(e) => handleSubmit(e)}
                    >
                        <p className="register__msg">新規登録はこちら</p>
                        <input
                            type="text"
                            className="register__input"
                            placeholder="ユーザー名"
                            required
                            ref={username}
                        />
                        <input
                            type="email"
                            className="register__input"
                            placeholder="Eメール"
                            required
                            ref={email}
                        />
                        <input
                            type="password"
                            className="register__input"
                            placeholder="パスワード"
                            required
                            minLength={6}
                            ref={password}
                        />
                        <input
                            type="password"
                            className="register__input"
                            placeholder="確認用パスワード"
                            minLength={6}
                            required
                            ref={passwordAgain}
                        />
                        <button className="register__btn" type="submit">
                            サインアップ
                        </button>

                        <button
                            className="register__registerBtn"
                            onClick={() => navigateToLogin("/login")}
                        >
                            ログイン
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
