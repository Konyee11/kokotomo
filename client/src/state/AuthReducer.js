// アクションのタイプに応じて状態を変更するためのReducer関数を定義
const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START": // ユーザーがログインしようとしているときに呼び出される
            return {
                user: null,
                isFetching: true,
                error: false,
            };
        case "LOGIN_SUCCESS": // ユーザーがログインに成功したときに呼び出される
            return {
                user: action.payload,
                isFetching: false,
                error: false,
            };
        case "LOGIN_ERROR": // ユーザーがログインに失敗したときに呼び出される
            return {
                user: null,
                isFetching: false,
                error: action.payload,
            };
        case "LOGOUT": // ユーザーがログアウトしたときに呼び出される
            return {
                user: null,
                isFetching: false,
                error: false,
            };

        default:
            return state;
    }
};

export default AuthReducer;
