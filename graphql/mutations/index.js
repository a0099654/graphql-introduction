import UserMutation from './user';
import PostMutaton from './post';

export default {
    ...UserMutation,
    ...PostMutaton
}