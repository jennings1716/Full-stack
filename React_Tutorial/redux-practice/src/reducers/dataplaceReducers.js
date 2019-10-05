const  dataplaceReducers=(state=[],action)=>{
    switch(action.type){
        case 'PLACE':
            console.log("state[action.index]",state[action.index])
            return {data:state[action.index],index:action.index}
        default:
            return {data:[],index:null}
    }
}

export default dataplaceReducers;