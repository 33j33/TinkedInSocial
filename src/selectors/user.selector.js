import { createSelector } from "reselect";

export const user = state => state.user.entity;

export const userSelector = createSelector(
    [user,
    (state) => state.user.isLoggedIn,
    (state) => state.errors["user/fetch"],
    (state) => state.loaders["user/fetch"]],
    (entity, isLoggedIn, error, loader) => {
        const user = { entity, isLoggedIn, error, loader }
        return user
    }
)

export const userOnSaveSelector = createSelector(
    [user,
    (state) => state.errors["user/save"],
    (state) => state.loaders["user/save"]],
    (entity, error, loader) => {
        const user = { entity, error, loader }
        return user
    }
)