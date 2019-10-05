 const getAction = ()=>{
    return {
        type:"GET"
    }
}
const postAction = (data)=>{
    return {
        type:"POST",
        new_data:data
    }
}
const placeData= (alldata,index)=>{
    return {
        type:"PLACE",
        state:alldata,
        index:index
    }
}
const putAction = (index,new_data)=>{
    return {
        type:"PUT",
        index:index,
        new_data:new_data
    }
}
 const deleteAction = (index)=>{
    return {
        type:"DELETE",
        index:index
    }
}
export default {
    getAction,
    postAction,
    putAction,deleteAction,
    placeData

}