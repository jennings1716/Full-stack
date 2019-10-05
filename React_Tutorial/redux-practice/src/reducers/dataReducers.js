const  dataReducers=(state=[],action)=>{
    switch(action.type){
        case 'GET':
            return state
        case 'POST':
            return [...state,action.new_data]
        case 'PUT':
            let new_state =  state.map((data,index)=>{
                if(index==action.index){
                    console.log('mattched',index);
                    return action.new_data
                }
                return data
            })
            return new_state
        case 'DELETE':
            return state.filter((element,index) => index !== action.index);
        default:
            console.log("default")
            return [...state]
    }
}

export default dataReducers;