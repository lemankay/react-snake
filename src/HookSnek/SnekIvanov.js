import React, {useState,useEffect, useContext} from 'react';
import { useInterval } from './useInterval';
// const ARROW_UP = "\u001B[A";
// const ARROW_DOWN = "\u001B[B";
// const ARROW_LEFT = "\u001B[D";
// const ARROW_RIGHT = "\u001B[C";
const FIELD_SIZE = 13;
const FIELD_ROW = [...new Array(FIELD_SIZE).keys()];
let foodItem = {
    x: Math.floor(Math.random() * FIELD_SIZE),
    y: Math.floor(Math.random() * FIELD_SIZE)
}
//четыре нарпавления змейки
const DIRECTION = {
    RIGHT:  {x: 1, y: 0},
    LEFT:   {x: -1, y: 0},
    TOP:    {x: 0, y: -1},
    BOTTOM: {x: 0, y: 1}
}
function getItem(x, y, arrSnakeSegments){
    if(foodItem.x === x && foodItem.y === y){
        return <div style={{color:"green"}}> X </div>
    }
    for(const segment of arrSnakeSegments){
        if(segment.x === x && segment.y === y)
        return <div style={{color:"red"}}> O </div>
    }
}
//ограничить движение змейки игровым полем
//функция принимает (j) и обнуляет его если змейка выходить за игровое поле
function limitByField(j) {
    if(j >= FIELD_SIZE) { return 0; }
    if(j < 0) { return FIELD_SIZE - 1; }
    return j;
}
//расчитать направление змейки(змейкины сигменты и напровление змейки)
function newSnakePosition(segments, direction) {
//расчитываем(return) новую позицию змейки из текущих сегментов и направлений
    const [head] = segments;
    const newHead = {
         x: limitByField(head.x + direction.x),
         y: limitByField(head.y + direction.y)
    };
    if(collidesWithFood(newHead, foodItem)) {
        foodItem = {
            x: Math.floor(Math.random() * FIELD_SIZE),
            y: Math.floor(Math.random() * FIELD_SIZE)
        };
        return [newHead, ...segments];
    }
   return [newHead, ...segments.slice(0, -1)]
}
function collidesWithFood(h, f) {
    return h.x === f.x && h.y === f.y
}
export const SnakIvanov = () => {   
    const [snakeSegments, setSnakeSegments] = useState([
        {x: 8, y: 8},
        {x: 8, y: 7},
        {x: 8, y: 6}
    ])
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
					default: setDirection(DIRECTION.RIGHT);					
			}
		}
    }, []);
    useInterval(() => {
        setSnakeSegments(segments => newSnakePosition(segments, direction))
    }, 200)
    return (
     
        
            <div style={{
               display:"flex",
               background: "black",
               position: "relative",
               margin: "50px auto",
               width: "300px",
               height: "300px",
               border: "2px solid #000"
                }}>
                {FIELD_ROW.map(y => (
                    <div key={y.id}style={{padding:"9px"}} >
                          { FIELD_ROW.map(x => (                
                            <div key={x.id}>{getItem(x, y, snakeSegments) || "."} </div>                     
                          ))}                      
                   </div>                 
                ))}
            </div>           
     
    )
}