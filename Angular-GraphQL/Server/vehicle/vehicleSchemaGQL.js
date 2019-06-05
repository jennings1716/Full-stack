const graphql = require('graphql');
const vehicle = require('./vehicle');//mongoose operations

const VehicleSchema = new graphql.GraphQLObjectType({
    name:'vehicle',
    description:'a vehicle to be sold',
    fields:{
        _id:{type: graphql.GraphQLString},
        carname: {type: graphql.GraphQLString},
        year: {type: graphql.GraphQLInt},
        transmission: {type: graphql.GraphQLString},
        fuelType: {type: graphql.GraphQLString},
        engineCapacity: {type: graphql.GraphQLInt}
    }
})

const query = new graphql.GraphQLObjectType({
    name: 'vehicleQuery',
    fields:{
        vehicle:{
            type: new graphql.GraphQLList(VehicleSchema),
            args:{
                _id:{type: graphql.GraphQLString},
                carname: {type: graphql.GraphQLString}
            },
            resolve:(_, {_id, carname})=>{
                let where;
                if (_id){
                    where = {_id: _id};
                }else if (carname){
                    where = {carname: carname};
                }else{
                    where = {};
                }
                return vehicle.find(where);
            }            
        },
        getAllCars:{
            type: new graphql.GraphQLList(VehicleSchema),
            args:{},
            resolve:(_,{}) =>{
                console.log("Allcars");
                return vehicle.find({});
            }
        },
        getByCapacity: {
            type: new graphql.GraphQLList(VehicleSchema),
            args: {
                capacity: {type: graphql.GraphQLInt}
            },
            resolve: (_, {capacity}) => {
                let where;
                if (capacity){
                    where = {engineCapacity: { $lt: capacity }};
                }else{
                    where = {};
                }
                return vehicle.find(where);
            }
        }
    }
})

const mutation = new graphql.GraphQLObjectType({
    name: 'vehicleMutations',
    fields: {
        create: {
            type: VehicleSchema,
            args: {
                carname: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
                year: {type: new graphql.GraphQLNonNull(graphql.GraphQLInt)},
                transmission: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
                fuelType: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
                engineCapacity: {type: new graphql.GraphQLNonNull(graphql.GraphQLInt)},
            },
            resolve: (_, {carname, year, transmission, fuelType, engineCapacity}) => {
                console.log("post")
                let v = new vehicle({carname, year, transmission, fuelType, engineCapacity});
                console.log("vehicle details",v);
                return v.save()
            }
        },
        update:{
            type:VehicleSchema,
            args: {
                id: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)},
                car_name: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)}
            },
            resolve: (_, {id,car_name}) => {
                console.log("id",id);
                console.log("name",car_name);
                vehicle.findOneAndUpdate({_id:id},{ $set: {carname:car_name}},(err,res)=>{
                    if(res){
                        console.log("Res",res);
                        return res
                    }
                    if(err){
                        console.log("Err",err);
                        return err
                    }
                
                })
            }

        },
        delete: {
            type: VehicleSchema,
            args: {
                _id: {type: new graphql.GraphQLNonNull(graphql.GraphQLString)}
            },
            resolve: (_, {_id}) => {
                console.log("Server",_id);
                return vehicle.findByIdAndRemove(_id,(err,res)=>{
                    if(res){
                        return _id
                    }
                    if(err){
                        return err
                    }
                });
            }
        }
    }
})

module.exports = new graphql.GraphQLSchema({
    query,
    mutation
})