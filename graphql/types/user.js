import {
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLList
} from 'graphql';

import PostModel from '../../models/post';
import { postType } from './post';

export const userType = new GraphQLObjectType({
    name: 'User',
    description: 'This is user API',
    fields: () => ({
        _id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        email: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        },
        posts: {
            type: new GraphQLList(postType),
            resolve(user) {
                const { _id } = userl
                return PostModel.find({ uid: _id }).exec();
            }
        }
    })
});

export const userInputType = new GraphQLInputObjectType({
    name: 'UserInput',
    description: 'Insert user to the database',
    fields: () => ({
        email: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        }
    })
});