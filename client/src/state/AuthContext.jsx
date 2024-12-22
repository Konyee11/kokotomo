import { createContext, useReducer } from "react";
import PropTypes from "prop-types";
import AuthReducer from "./AuthReducer";

// 最初のユーザー状態を定義
const initialState = {
    // user: null,
    user: {
        _id: "675e5219685e82187795f011",
        username: "Tanaka",

        email: "tanaka@gmail.com",

        password:
            "$2a$10$eXhOS4m5yMM32bW5c9b4D.skwhdJe/buDq9gQPqi2IB3dUW5VixiC",

        profilePicture: "/person/2.jpg",

        coverPicture: "",

        followers: [],

        followings: [],

        isAdmin: false,
    },
    isFetching: false,
    error: false,
};

// 状態をグローバルに管理するためのコンテキストを作成
export const AuthContext = createContext(initialState);

// ユーザー状態を提供するコンテキストプロバイダーを作成
export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState);
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
