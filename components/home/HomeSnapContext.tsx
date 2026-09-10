"use client";

import { createContext, useContext, type RefObject } from "react";

export const HomeSnapContext =
  createContext<RefObject<HTMLDivElement | null> | null>(null);

export function useHomeSnap() {
  const value = useContext(HomeSnapContext);
  if (!value) {
    throw new Error("useHomeSnap must be used inside HomeScrollCanvas");
  }
  return value;
}
