import React, { useState, useEffect, useContext, Fragment } from "react";
import { useInterval } from "./useInterval";

const FIELD_SIZE = 20;
const FIELD_ROW = [...new Array(FIELD_SIZE).keys()];
let foodItem = {
  x: Math.floor(Math.random() * FIELD_SIZE),
  y: Math.floor(Math.random() * FIELD_SIZE),
};
//четыре нарпавления змейки
const DIRECTION = {
  RIGHT: { x: 1, y: 0 },
  LEFT: { x: -1, y: 0 },
  TOP: { x: 0, y: -1 },
  BOTTOM: { x: 0, y: 1 },
};
function getItem(x, y, snakeDots) {
  if (foodItem.x === x && foodItem.y === y) {
    return <span style={{ color: "green" }}> X </span>;
  }
  for (const segment of snakeDots) {
    if (segment.x === x && segment.y === y)
      return <span style={{ color: "red" }}> O </span>;
  }
}
//ограничить движение змейки игровым полем
//функция принимает (j) и обнуляет его если змейка выходить за игровое поле
function limitByField(j) {
  if (j >= FIELD_SIZE) {
    return 0;
  }
  if (j < 0) {
    return FIELD_SIZE - 1;
  }
  return j;
}
//расчитать направление змейки(змейкины сигменты и напровление змейки)
function newSnakePosition(snakeDots, direction) {
  const [head] = snakeDots;
  const newHead = {
    x: limitByField(head.x + direction.x),
    y: limitByField(head.y + direction.y),
  };
  if (newHead.x === foodItem.x && newHead.y === foodItem.y) {
    foodItem = {
      x: Math.floor(Math.random() * FIELD_SIZE),
      y: Math.floor(Math.random() * FIELD_SIZE),
    };
    return [newHead, ...snakeDots];
  }
  return [newHead, ...snakeDots.slice(0, -1)];
}

export const IvanovRefactor = () => {
  const [snakeDots, setSnakeDots] = useState([
    { x: 8, y: 8 },
    { x: 8, y: 7 },
  ]);
  //нарпавление змейки
  const [direction, setDirection] = useState(DIRECTION.RIGHT);
  useEffect(() => {
    document.onkeydown = (e) => {
      e = e || window.event;
      switch (e.keyCode) {
        case 38:
          setDirection(DIRECTION.LEFT);
          break;
        case 40:
          setDirection(DIRECTION.RIGHT);
          break;
        case 37:
          setDirection(DIRECTION.TOP);
          break;
        case 39:
          setDirection(DIRECTION.BOTTOM);
          break;
        default:
      }
    };
  }, []);
  useInterval(() => {
    setSnakeDots((snakeDots) => newSnakePosition(snakeDots, direction));
  }, 200);

  return (
    <Fragment>
      <div style={{ display: "flex", paddingLeft: "400px" }}>
        <h1 style={{ color: "green" }}>Snake </h1>
        <h1 style={{ color: "blue" }}> -game</h1>
      </div>
      <div style={{ display: "blog" }}>
        <div style={{ display: "flex", paddingLeft: "400px" }}>
          <button onClick={() => setDirection(DIRECTION.BOTTOM)}>RIGHT</button>
          <button onClick={() => setDirection(DIRECTION.LEFT)}>TOP</button>
          <button onClick={() => setDirection(DIRECTION.RIGHT)}>BOTTOM</button>
          <button onClick={() => setDirection(DIRECTION.TOP)}>LEFT</button>
        </div>

        <div
          style={{
            display: "flex",
            position: "relative",
            margin: "50px auto",
            width: "400px",
            height: "430px",
            border: "2px solid #000",
          }}
        >
          {FIELD_ROW.map(y => 
          {
          return  <div key={y} style={{ padding: "4.5px", color: "white" }}>
              {FIELD_ROW.map((x) => (
                <div key={x}>{getItem(x, y, snakeDots) || "+"}</div>
              ))}
            </div>
}
          )}
        </div>
      </div>
    </Fragment>
  );
};
