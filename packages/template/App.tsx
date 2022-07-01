// THIS ENTIRE FILE IS AN EXPERIMENT, DO NOT TREAT IT AS A PRODUCTION-READY CODE

import { useEffect, useRef } from "react";
import program from "./programs/000-start";
import * as PIXI from "pixi.js";

const wait = (delay: number, signal: AbortSignal) =>
  new Promise<void>((resolve) => {
    const timeout = setTimeout(() => {
      signal.removeEventListener("abort", abortHandler);
      resolve();
    }, delay);

    const abortHandler = () => {
      clearTimeout(timeout);
    };

    signal.addEventListener("abort", abortHandler, { once: true });
  });

export default function App(): JSX.Element {
  const appRef = useRef<PIXI.Application>();
  const spriteRef = useRef<PIXI.Sprite>();

  useEffect(() => {
    let stop = false;
    let abortController = new AbortController();

    const run = async () => {
      const instructions = program();

      if (!spriteRef.current) {
        return;
      }

      for await (const action of instructions) {
        if (stop) {
          abortController.abort();
          break;
        }

        await wait(500, abortController.signal);

        if (action.type === "wait") {
          await wait(action.delay, abortController.signal);
        } else if (action.type === "move") {
          if (action.direction === "right") {
            spriteRef.current.x += 50;
          } else if (action.direction === "left") {
            spriteRef.current.x -= 50;
          } else if (action.direction === "up") {
            spriteRef.current.y -= 50;
          } else if (action.direction === "down") {
            spriteRef.current.y += 50;
          }
        }
      }
    };

    run();

    return () => {
      stop = true;
    };
  }, []);

  const onSetup = (canvas: HTMLDivElement) => {
    if (appRef.current) {
      return;
    }
    appRef.current = new PIXI.Application({
      width: 640,
      height: 360,
      backgroundColor: 0xffffff,
    });

    // TODO: Use env variable or somehow pass to sandpack a link to assets
    spriteRef.current = PIXI.Sprite.from("http://localhost:3000/game/unit.png");
    appRef.current.stage.addChild(spriteRef.current);
    canvas.appendChild(appRef.current.view);
  };

  return <div ref={onSetup} />;
}
