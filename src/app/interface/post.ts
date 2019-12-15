import {Picture} from './picture';
import {Category} from './category';
import {User} from './user';

export interface Post {
id?: number;
name: string;
content: string;
category: Category;
pictures: Picture[];
comments?: Comment[];
user: User;
}
