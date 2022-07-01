import { Action } from "./types";

export interface WaitAction extends Action<"wait"> {
  delay: number;
}

export const wait = (delay: number): WaitAction => ({
  type: "wait",
  delay: Math.max(Math.min(delay, 5000), 0),
});
