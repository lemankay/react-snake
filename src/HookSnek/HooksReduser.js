import React, {useState, useEffect,useContext, useReducer} from 'react';
import '../App.css';
import { useInterval } from './useInterval';
import {Context} from './context';

const FIELD_SIZE = 100;
const FIELD_ROW = [...new Array(FIELD_SIZE).keys()];
let foodItem = () => {
   let x= Math.floor(Math.random() * FIELD_SIZE);
   let y= Math.floor(Math.random() * FIELD_SIZE);
   return [x,y];
} 
 const RIGHT = 'RIGHT';
 const LEFT = 'LEFT';
 const UP = 'UP';
 const DOWN = 'DOWN';
 const PARAM = { speed: 100, rows: 30, cols: 50 }  	
 const Box = ({boxClass, id, row, col, selectBox}) => {
	const setSelectBox = () => {selectBox(row, col);}
		return (
			<div
				className={boxClass}
				id={id}
				onClick={setSelectBox}
			/>
		);
}

	 
export default function HooksReduser (){
	const[state,setState] = useState(
		{
		generation: 0,
		gridFull: Array(PARAM.rows).fill().map(() => Array(PARAM.cols).fill(false)),
		}		      
)
//const [state, dispatch] = useReducer(reducer,{});
const [direction,setDirection] = useState([]);	
const [snakeDots, setSnakeDots] = useState([[0,0]]);
const [food, setFood] = useState(foodItem()); 
const selectBox = (row, col) => {
	let gridCopy = arrayClone(state.gridFull);
	gridCopy[row][col] = !gridCopy[row][col];
	setState({
		gridFull: gridCopy
	});
}
const moveSnake = (snakeDots, direction) => {
	let dots = [...snakeDots];
	let head = dots[dots.length-1];
	switch(direction){
		case 'RIGHT':	head = [head[0] + 4, head[1]];	break;
		case 'LEFT':	head = [head[0] - 4, head[1]];	break;
		case 'DOWN':	head = [head[0], head[1] + 4];	break;
		case 'UP':		head = [head[0], head[1] - 4];	break;			
			default: 			    
	}
	if (head[0] >= 100)  {head[0] = 0} 
	if (head[1] >= 100)  {head[1] = 0}
	if (head[0] < 0  )   {head[0] = 96}
	if (head[1] < 0  )   {head[1] = 96} 
	dots.push(head);
	dots.shift();
	setSnakeDots(dots)
}
useInterval(()=>{setSnakeDots(snakeDots => moveSnake(snakeDots,direction))}, 100)  
	useEffect(() => {  	
	 document.onkeydown = (e) => {
			e = e || window.event;
			switch (e.keyCode) {
				case 38: setDirection('UP');break;
				case 40: setDirection('DOWN');	break;
				case 37: setDirection('LEFT');	break;
				case 39: setDirection('RIGHT');	break;
					default: 			
			}
				setSnakeDots(snakeDots);			
		}						
	}, [snakeDots]);
	
	//useEffect(() => { document.onclick = reducer;	}, []);
	// const reducer = (state, action) => {
	// 	switch (action.type) {
	// 		case RIGHT:
	// 			return addProduct(action.product, state);
	// 		case DOWN:
	// 			return setDirection('DOWN');
	// 		case LEFT:
	// 			return 	setDirection('LEFT'); 
	// 		case UP:	
	// 			return setDirection('UP');
	// 			default:
	// 				return state
	//     	}   
	// 		 setSnakeDots(snakeDots);
	// 	}
	// 	const addProduct = (product) => dispatch({type:RIGHT});
return (
		<>
       <div>
			   {/* <button onClick={()=>mov.d}>DOWN</button> 		  
			 <button onClick={()=>mov.r}>RIGHT</button> 		   */}
	   {/* <button onClick={()	=> s() }>STOP</button> 	 */}
	    {/* <button onClick={ dispatch({type: RIGHT}) }>RIGHT</button> */}
		
		 {/* <button onClick={()=> d}>DOWN</button>
		<button onClick={()	=> u}>UP</button>     */}
			 {/* <button onClick={() => dispatch({type: 'LEFT'})}>LEFT</button>
			 <button onClick={() => dispatch({type: 'UP'})}>UP</button>
		     <button onClick={() => dispatch({type:'DOWN'})} >DOWN</button>  */}
			   </div>
       
			   <div className="game-area">	
			   <div>					
                          {snakeDots.map((dot,i) => {
                            const style = {
								left: `${dot[0]}%`,
								top: `${dot[1]}%`,
								
							}
                            return(
                                <div className="snake-dot"
                                    key={i}
                                    style={style}     ></div>
                            )
                        })}  
						     {/* {snakeDots2.map((dot,i) => {
                            const style = {
                                left: `${dot[0]}%`,
                                top: `${dot[1]}%`
							}
                            return(
                                <div className="snake-dot"
                                    key={i}
                                    style={style}     ></div>
                            )
                        })}  
						 
                </div> 
                 {/* <div className="snake-food"
                   style= {{ left: `${food[0]}%`,
                             top: `${food[1]}%`
                     }}
                >
                
                
                </div> */}
		</div>
	
		</>
		);
}
function arrayClone(arr) {
	return JSON.parse(JSON.stringify(arr));
}