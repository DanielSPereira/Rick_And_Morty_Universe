import { RootState } from "@/app/store";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const useAppStore: TypedUseSelectorHook<RootState> = useSelector;
