const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');


const customers = [
    {id:'1', name:'Jane Doe', email: 'jdoe@example.com', age:25},
    {id:'2', name:'Sam Rankin', email: 'srankin@example.com', age:35},
    {id:'3', name:'John Doe', email: 'john-doe@example.com', age:18}
]

const CustomerType = new GraphQLObjectType({
    name: 'Customer',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        age: {type: GraphQLInt}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        customer: {
            type: CustomerType,
            args: {
                id: {type: GraphQLString}
            },
            resolve(parentValue, args){
                for(let i =0; i< customers.length; i++){
                    if(customers[i].id === args.id){
                        return customers[i];
                    }
                }
            }
        }
    }

});

module.exports = new GraphQLSchema({
    query: RootQuery
});