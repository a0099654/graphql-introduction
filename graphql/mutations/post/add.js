import {
    GraphQLNonNull
} from 'graphql';

import { postType, postInputType } from '../../types/post';
import PostModel from '../../../models/post';

export default {
    type: postType,
    args: {
        data: {
            name: 'data',
            type: new GraphQLNonNull(postInputType)
        }
    },
    resolve(root, params) {
        const postModel = new PostModel(params.data);
        const newPost = postModel.save();

        if (!newPost) {
            throw new Error('Error adding post');
        }
        return newPost;
    }
}