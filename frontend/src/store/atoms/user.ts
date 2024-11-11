import { atom } from "recoil";

export const userAtom = atom<{
    loading: boolean;
    user?: {
        email: string;
    };
}>({
    key: "userAtom", // This should be at the top level
    default: {
        loading: true, // Initial default value
    },
});
