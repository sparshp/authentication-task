import { loginFailure, loginStart, loginSuccess,ragisterFailure,ragisterStart,ragisterSuccess } from "./userRedux";
import { publicRequest } from "../requestMethods";

export const login = async (dispatch, user)=>{
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login", user);
        dispatch(loginSuccess(res.data));
    } catch (err) {
        dispatch(loginFailure())
    }

}

export const ragister = async (dispatch, user)=>{
    dispatch(ragisterStart());
    try {
        const res = await publicRequest.post("/auth/ragister", user);
        dispatch(ragisterSuccess(res.data));
    } catch (err) {
        dispatch(ragisterFailure())
    }

}