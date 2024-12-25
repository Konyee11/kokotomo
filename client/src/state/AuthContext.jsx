import { createContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import AuthReducer from "./AuthReducer";

// 最初のユーザー状態を定義
const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isFetching: false,
    error: false,
};

// 状態をグローバルに管理するためのコンテキストを作成
export const AuthContext = createContext(initialState);

// ユーザー状態を提供するコンテキストプロバイダーを作成
export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user));
    }, [state.user]);

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                isFetching: state.isFetching,
                error: state.error,
                dispatch,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

AuthContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
