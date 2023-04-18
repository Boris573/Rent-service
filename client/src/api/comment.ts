import type { Comment, CommentBody } from '../types/comment';
import axiosInstance from './axiosInstance';

class CommentsApi {
  async getComments(): Promise<Comment[]> {
    const { data } = await axiosInstance.get(
      `/comments`
    );
  
    return data;
  }

  async getCommentsByItemId(id: string): Promise<Comment[]> {
    const { data } = await axiosInstance.get(
      `/comments/item/${id}`
    );
  
    return data;
  }

  async createComment(data: CommentBody): Promise<Comment> {
    const { data: comment } = await axiosInstance.post(
      `/comments`,
      data
    );
  
    return comment;
  }

  async updateComment({
    commentId,
    update
  }: {
    commentId: string;
    update: CommentBody;
  }): Promise<Comment> {
    const { data: comment } = await axiosInstance.put(
      `/comments`,
      { id: commentId, ...update }
    );
  
    return comment;
  }

  async deleteComment(commentId: string): Promise<Comment> {
    const { data: comment } = await axiosInstance.delete(
      `/comments/${commentId}`,
    );
  
    return comment;
  }
}

export const commentApi = new CommentsApi();
