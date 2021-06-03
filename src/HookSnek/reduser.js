
	
export default function(state1, action){
    switch (action.type){
        case 'add':
            return[
                ...state1,
                {
                    id: Date.now(),
                    title: action.payload,
                    completed: false
                }
            ]
            case 'toggle':
                return state1.map(todo =>{
                    if(todo.id === action.payload){
                        todo.completed = !todo.completed
                    }
                    return todo
                })
                case 'remove':
                    return state1.filter(todo => todo.id !== action.payload)
        default:
            return state1;
    }
}