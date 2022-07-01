import { Action } from "./types";

export interface MoveAction extends Action<"move"> {
  direction: "up" | "left" | "right" | "down";
}

export const move = (direction: MoveAction["direction"]): MoveAction => {
  return { type: "move", direction };
};
