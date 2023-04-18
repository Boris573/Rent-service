export interface Comment {
    id: string;
    createdAt?: string;
    updatedAt?: string;
    text: string;
    item: string;
    userId: string;
    username: string;
}

export interface CommentBody extends Omit<Comment, 'id'> {}
