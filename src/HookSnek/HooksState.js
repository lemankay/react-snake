import React, {useState, useEffect} from 'react';
import '../App.css';
import { useInterval } from './useInterval';
const FIELD_SIZE = 100;
const FIELD_ROW = [...new Array(FIELD_SIZE).keys()];
let foodItem = () => {
   let x= Math.floor(Math.random() * FIELD_SIZE)
   let y= Math.floor(Math.random() * FIELD_SIZE)
   return [x,y];
}
// const getRandomCoordinates = () => {
// 	let min = 1;
// 	let max = 50;
// 	let x = Math.floor((Math.random()*(max-min+1)+min)/4)*4;
//     let y = Math.floor((Math.random()*(max-min+1)+min)/4)*4;
//     return [x,y];
// }
export default function HooksState (){
    const [state, setState] = useState({food: foodItem()});
    const [direction,setDirection] = useState('')
	const [snakeDots,  setSnakeDots] =  useState([[0,0],[0,0]] )
	const [snakeDots2, setSnakeDots2] = useState([[0,0],[0,0],[0,0],[0,0]] )
	const [snakeDots3, setSnakeDots3] = useState([[0,0],[0,0]] )
	const [snakeDots4, setSnakeDots4] = useState([[30,30]] )
	const [snakeDots5, setSnakeDots5] = useState([[10,10]] )
	const [snakeDots6, setSnakeDots6] = useState([[0,0]] )
	const [snakeDots7, setSnakeDots7] = useState([[96,0]] )
	const [snakeDots8, setSnakeDots8] = useState([[96,96]] )
	const [snakeDots9, setSnakeDots9] = useState([[0,0]] )
	const [snakeDots10, setSnakeDots10] = useState([[50,60]] )
	const [snakeDots11, setSnakeDots11] = useState([[50,70]] )
	const [counter, setCounter] = useState(0)
	useEffect(() => {  	
		document.onkeydown = onKeyDown;
	}, [snakeDots]);

	 const onKeyDown = (e) => {
			e = e || window.event;
			switch (e.keyCode) {
				case 38: setDirection('UP');
					break;
				case 40: setDirection('DOWN');				
					break;
				case 37: setDirection('LEFT');			
					break;
				case 39: setDirection('RIGHT');					 	
					break;
					default: 			
			}
				setSnakeDots(snakeDots);			
		}
		const moveSnake = (snakeDots, direction) => {
			let dots = [...snakeDots];
			let head = dots[dots.length-1];
			switch(direction){
				case 'RIGHT':
					head = [head[0] + 4, head[1]];
					break;
				case 'LEFT':
					head = [head[0] - 4, head[1]];
					break;
				case 'DOWN':
					head = [head[0], head[1] + 4];
					break;
				case 'UP':
					head = [head[0], head[1] - 4];
					break;			
                    default: head = [head[0] + 4, head[1]];       
			}
			if (head[0] >= 100)  {head[0] = 0} 
			if (head[1] >= 100)  {head[1] = 0}
			if (head[0] < 0  )   {head[0] = 96}
			if (head[1] < 0  )   {head[1] = 96} 
			dots.push(head);
			dots.shift();
			setSnakeDots(dots)
        }
        useInterval(() => {
            setSnakeDots((snake=[...snakeDots]) => moveSnake(snake, direction))
		}, 300)  
	    
		const checkIfOutOfBorders = (snakeDots2, direction) => { //БОРДЮР
			let dots = [...snakeDots2];
			let head = dots[dots.length-1];	
			head = [head[0] + 4,head[1]]
			
			if (head[1] <= 0) {head = [head[0]-4, head[1]-4];} 
			

			if (head[0] > 100 ) {head = [head[0]-4, head[1]-4];} 
		 	if (head[0] < 100 ) {head = [head[0]-4, head[1]+4];} 				    	
	    	if (head[1] >= 100 ) {head = [head[0]+4, head[1]-4];}
			if (head[0] >= 100) {head = [head[0]-4, head[1]-4];}
					
			if (head[0] < 0 ) {head = [head[0]+4, head[1]+4];} 			
			dots.push(head);
			dots.shift();
		setSnakeDots2(dots);
		} 
		useInterval(() => {
		  setSnakeDots2((snake=[...snakeDots2]) => checkIfOutOfBorders(snake, direction))
		}, 300) 
		const checkIfOutOfBorders3 = (snakeDots3, direction) => { //БОРДЮР
			let dots = [...snakeDots3];
			let head = dots[dots.length-1];
		
			head = [head[0]+4, head[1]];       
			if (head[0] < 76 ) {head = [head[0]-4, head[1]+4];} 				    	
	    	if (head[1] >= 76) {head = [head[0]+4, head[1]-4];}
			if (head[0] >= 76) {head = [head[0]-4, head[1]-4];}
			if (head[1] <= 24)   {head = [head[0]-4, head[1]-4];} 	
			if (head[0] > 76 )  {head = [head[0]-4, head[1]-4];} 
			if (head[0] <=24 )  {head = [head[0]+4, head[1]+4];} 		
			//if(head[0] >= 100  && (head[0] = 0)){head = [head[1], head[1]];} 			
			dots.push(head);
			dots.shift();
			setSnakeDots3(dots);
		} 
		useInterval(() => {
		  setSnakeDots3((snake=[...snakeDots3]) => checkIfOutOfBorders3(snake, direction))
		}, 300) 
		const checkIfOutOfBorders4 = (snakeDots4, direction) => { //БОРДЮР
			let dots = [...snakeDots4];
			let head = dots[dots.length-1];
			head = [head[0], head[1]+4]; 	 				
      if (head[0] <=70 && head[1] >=70) {head = [head[0]+4, head[1]-4];}     
	  
	  if (head[0] >=70 && head[1] <=70) {head = [head[0], head[1]-4];}
	  if (head[0] >=70 && head[1] >=30) {head = [head[0], head[1]-4];} 

	  if (head[0] >=30 && head[1] <=30) {head = [head[0]-4, head[1]-4];}	  
			dots.push(head);
			dots.shift();
			setSnakeDots4(dots);
		} 
		useInterval(() => {
		  setSnakeDots4((snake=[...snakeDots4]) => checkIfOutOfBorders4(snake, direction))
		}, 300) 

		const checkIfOutOfBorders5 = (snakeDots5, direction) => { //БОРДЮР
			let dots = [...snakeDots5];
			let head = dots[dots.length-1];
			head = [head[0]+4, head[1]]; 
			if (head[1] <= 0) {head = [head[0]+4, head[1]+4];}	
			if (head[1] <= 0) {head = [head[0]+4, head[1]-4];}	
			if (head[1] >= 90) {head = [head[0]-4, head[1]+4];} 
			if (head[1] >= 90) {head = [head[0]-4, head[1]-4];} //ВЛЕВО ОТ 80/28 
			if (head[0] >= 90) {head = [head[0]-4, head[1]+4];} //ВНИЗ  ОТ 20/9
			if (head[0] <= 10) {head = [head[0]-4, head[1]-4];} //ВВЕРХ ОТ 80/20		
			dots.push(head);
			dots.shift();
			setSnakeDots5(dots);
		} 
		useInterval(() => {
		  setSnakeDots5((snake=[...snakeDots5]) => checkIfOutOfBorders5(snake, direction))
		}, 300) 
		const checkIfOutOfBorders6 = (snakeDots6, direction) => { //БОРДЮР
			let dots = [...snakeDots6];
			let head = dots[dots.length-1];
			head = [head[0]+4, head[1]+4]; 
			if (head[0] >= 100)  {head[0] = 0} 
			if (head[1] >= 100)  {head[1] = 0}		
			dots.push(head);
			dots.shift();
			setSnakeDots6(dots);
		} 
		useInterval(() => {
		  setSnakeDots6((snake=[...snakeDots6]) => checkIfOutOfBorders6(snake, direction))
		}, 300) 
		const checkIfOutOfBorders7 = (snakeDots7, direction) => { //БОРДЮР
			let dots = [...snakeDots7];
			let head = dots[dots.length-1];
			head = [ head[0]-4, head[1]+4]; 
			if (head[0] <= 0 && head[1] >= 100 ){
			 (head[0]=96); (head[1]=0) }		 
			dots.push(head);
			dots.shift();
			setSnakeDots7(dots);
		} 
		useInterval(() => {
		  setSnakeDots7((snake=[...snakeDots7]) => checkIfOutOfBorders7(snake, direction))
		}, 300) 
		const checkIfOutOfBorders8 = (snakeDots8, direction) => { //БОРДЮР
			let dots = [...snakeDots8];
			let head = dots[dots.length-1];
			head = [ head[0]-4, head[1]-4]; 		
			 if (head[0] <= 0 && head[1] <= 0){head = [head[0]+4, head[1]+4];}
			 if (head[0] <= 0 && head[1] <= 0){head = [head[0]+4, head[1]-4];}
			 if (head[0] <= 0 && head[1] <= 0){head = [head[0]-4, head[1]+4];}					 
			dots.push(head);
			dots.shift();
			setSnakeDots8(dots);
		} 
		useInterval(() => {
		  setSnakeDots8((snake=[...snakeDots8]) => checkIfOutOfBorders8(snake, direction))
		}, 300) 
				
	const right = (snakeDots9, snakeDots10,snakeDots11) => { //БОРДЮР
			let dots = [...snakeDots9];
			let head = dots[dots.length-1];
			let los = [...snakeDots10];	
			let lost = los[los.length-1];
			let los11 = [...snakeDots11];	
			let lost11 = los11[los11.length-1];
		
			head = [head[0]+4,head[1]];
					 dots.push(head);
					 dots.shift(head);		  
					 setSnakeDots9(dots);
					 setCounter(counter+1);	 
			if (head[0]>=100) { 
				head[0]=0;head[1]+=10; 			 
		    	  lost = [lost[0]-20,lost[1]];	
					    los.push(lost);
						los.shift();	
						setSnakeDots10(los); 
			}
			if (head[1]>=20 ){head[1]=100;}
				if (lost11[0]<=0 ) {lost11[0] = 96;
				    lost = [lost[0]+4,lost[1]];	
					    los.push(lost);
						los.shift();	
						setSnakeDots10(los);
				}
							lost11 = [lost11[0]-5,lost11[1]];	
							los11.push(lost11);
							los11.shift();	
							setSnakeDots11(los11);	
				if (lost[0]<=0 ) {lost[0] = 96;}
			}
		useInterval(() => {
			setSnakeDots9((snake=[...snakeDots9]) => right(snake, snakeDots10,snakeDots11))
		  }, 150) 
		
    //	const upAC = () => {type:UP};const downAC = () => {type:DOWN};
	//	const leftAC = () => {type:LEFT};const rightAC = () => {type:RIGHT};
		// function checkIfCollapsed(){  //ЕСЛИ СТОЛКНОВЕНИЕ С ХВОСТОМ
		// 	let snake = [...state.snakeDots];
		// 	let head = snake[snake.length - 1];
		// 	snake.pop();
		// 	snake.forEach((dot)=>{
		// 		if(head[0] === dot[0] && head[1] === dot[1]){
		// 			onGameOver();
		// 		}
		// 	})
        // }
     
		// function increaseSpeed(){
		// 	if(state.speed > 10){
		// 		setState({
		// 			speed: state.speed - 10
		// 		})
		// 	}
        // }
		// function onGameOver(){
		// 	alert(`Game Over, Snake length is ${this.state.snakeDots.length}`);
		// 	setState(state)
        // }
    
		return (
			<div className="game_area">
			  					
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


						     {snakeDots2.map((dot,i) => {
                            const style = {
                                left: `${dot[0]}%`,
                                top: `${dot[1]}%`
							}
                            return(
                                <div className="snakenext-dot"
                                    key={i}
									style={style}>
									</div>
                            )
                        })} 
			   	   {snakeDots3.map((dot,i) => {
                            const style = {
                                left: `${dot[0]}%`,
                                top: `${dot[1]}%`
							}
                            return(
                                <div className="snakenext-dot3"
                                    key={i}
                                    style={style}     ></div>
                            )
                        })} 
				      {snakeDots4.map((dot,i) => {
                            const style = {
                                left: `${dot[0]}%`,
                                top: `${dot[1]}%`
							}
                            return(
                                <div className="snakenext-dot4"
                                    key={i}
                                    style={style}     ></div>
                            )
                        })} 
						     {snakeDots5.map((dot,i) => {
                            const style = {
                                left: `${dot[0]}%`,
                                top: `${dot[1]}%`
							}
                            return(
                                <div className="snakenext-dot5"
                                    key={i}
                                    style={style}     ></div>
                            )
                        })} 
								     {snakeDots6.map((dot,i) => {
                            const style = {
                                left: `${dot[0]}%`,
                                top: `${dot[1]}%`
							}
                            return(
                                <div className="snakenext-dot6"
                                    key={i}
                                    style={style}     ></div>
                            )
                        })}
				   {snakeDots7.map((dot,i) => {
                            const style = {
                                left: `${dot[0]}%`,
                                top: `${dot[1]}%`
							}
                            return(
                                <div className="snakenext-dot7"
                                    key={i}
                                    style={style}     ></div>
                            )
                        })} 
						  				     {snakeDots8.map((dot,i) => {
                            const style = {
                                left: `${dot[0]}%`,
                                top: `${dot[1]}%`
							}
                            return(
                                <div className="snakenext-dot8"
                                    key={i}
                               style={style}></div>
                            )
                        })}  
						{snakeDots9.map((dot,i) => {
					    const left = {
							left: `${dot[0]}%`,
							top: `${dot[1]}%`
				    	}    	
                            return(
                                <div className="snakenext-dot9"
                                     key={i}
							style={left} >{counter}</div>
                            )
                        })}	
						{snakeDots10.map((dot,i) => {
					    const left = {
							left: `${dot[0]}%`,
							top: `${dot[1]}%`
				    	}    	
                            return(
                                <div className="snakenext-dot10"
                                    key={i}
			style={left} >55</div>
                            )
                        })}	
				{snakeDots11.map((dot,i) => {
					    const left = {
							left: `${dot[0]}%`,
							top: `${dot[1]}%`
				    	}    	
              return(
           <div className="snakenext-dot11"
                                    key={i}
			style={left} >44</div>
                            )
                        })}	
               
                <div className="snake-food"
                   style= {{ left: `${state.food[0]}%`,
                             top: `${state.food[1]}%`
                     }} > 
                </div>
			</div>
		);
}