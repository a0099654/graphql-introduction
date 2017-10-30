import {
    GraphQLNonNull,
    GraphQLID
} from 'graphql';

import UserModel from '../../../models/user';
import { userType } from '../../types/user';

export default {
    type: userType,
    args : {
        id : {
            name: 'ID',
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve(root,params){
        return UserModel.findById(params.id).exec();
    }
}
