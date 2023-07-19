import { createReducer, on } from "@ngrx/store";
import { getUser, setUser, setProfileImage } from "../actions/user.actions";

export const userStore = JSON.parse(localStorage.getItem('user') || '{}') || {};

export const userReducer = createReducer(
    userStore,
    on(setUser, (state: any, action: any) => {
        localStorage.setItem('user', JSON.stringify(action.user))
        return {
            ...state,
            user: action.user
        }
    }),
    on(getUser, (state) => state),
    on(setProfileImage, (state: any, action: any) => {
        
        return {
            ...state,
            img: action.url
        }
    })
);
