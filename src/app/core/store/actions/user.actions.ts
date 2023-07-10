import { createAction, props } from "@ngrx/store";

export const setUser = createAction("SET_USER", props<{ user: any }>());
export const getUser = createAction("GET_USER");
export const setProfileImage = createAction("SET_PROFILE_IMAGE", props<{ url: string }>());

