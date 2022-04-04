import { createContext, useContext } from "react";
import ReviewStore from "./reviewStore";

interface Store {
    reviewStore: ReviewStore;
}

export const store: Store = {
    reviewStore: new ReviewStore(),
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}