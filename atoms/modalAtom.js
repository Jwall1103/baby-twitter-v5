import { atom } from "recoil";

export const modalState = atom({
    key: "modalState",
    default: false,
});

export const tweetIdState = atom({
    key: "postIdState",
    default: "",
});