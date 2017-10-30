import {
    GraphQLList
} from 'graphql';

import UserModel from '../../../models/user';
import { userType } from '../../types/user';

export default {
    type: new GraphQLList(userType),
    resolve() {
        const users = UserModel.find().exec();
        if(!users){
            throw new Error('Error while fetching users...');
        }
        return users;
    }
}
