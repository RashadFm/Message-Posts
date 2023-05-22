import { Post } from './post.model';
import { User } from './user.model';

export class UserToPost {
    id: number;
    website: string;
    name: string;
    title: string;
    body: string;
    userId?: number;

    static mapData(post: Post, user: User): UserToPost {
        return {
            id: post.id,
            userId: user.id,
            website: `http://${user.website}`,
            name: user.name,
            title: post.title,
            body: post.body,
        };
    }
}
