import { wait, move, Program } from "@code-rts/commands";

export default function* program(): Program {
  // This is your first program, feel free to change it.
  // Remember to `yield` your commands!

  // Delay next command by 5s (5000ms)
  yield wait(5000);

  // Don't worry about forever loops! They're safe to use here.
  while (true) {
    // Move the unit one block to the right
    yield move("right");
    // Move the unit down
    yield move("down");
    // Move the unit left
    yield move("left");
    // Move the unit up
    yield move("up");
  }
}
