// ユーザー入力に応じたアクションを定義
export const LoginStart = () => ({
    // ユーザーがログインしようとしているときに呼び出される
    type: "LOGIN_START",
});
export const LoginSuccess = (user) => ({
    // ユーザーがログインに成功したときに呼び出される
    type: "LOGIN_SUCCESS",
    payload: user,
});
export const LoginError = (error) => ({
    // ユーザーがログインに失敗したときに呼び出される
    type: "LOGIN_ERROR",
    payload: error,
});
