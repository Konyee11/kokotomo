import axios from "axios";
import { LoginError, LoginStart, LoginSuccess } from "./state/AuthActions";

export const loginCall = async (user, dispatch) => {
    dispatch(LoginStart());
    try {
        const res = await axios.post("api/auth/login", user);
        dispatch(LoginSuccess(res.data));
    } catch (error) {
        dispatch(LoginError(error));
    }
};
