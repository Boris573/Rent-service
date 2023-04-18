import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { commentApi } from '../api/comment';
import type { AppThunk } from '../store';
import type { Comment, CommentBody } from '../types/comment';

interface CommentState {
  comments: Comment[];
}

const initialState: CommentState = {
  comments: []
};

const slice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    getComments(
      state: CommentState,
      action: PayloadAction<Comment[]>
    ): void {
      state.comments = action.payload;
    },
    getCommentsByItemId(
      state: CommentState,
      action: PayloadAction<Comment[]>
    ): void {
      const comments = action.payload;

      state.comments = state.comments.length
        ? state.comments.map((_comment) => {
            const comment = comments.find((item) => item.id === _comment.id)

            return comment ? comment : _comment;
          })
        : action.payload;
    },
    createComment(
      state: CommentState,
      action: PayloadAction<Comment>
    ): void {
      state.comments.push(action.payload);
    },
    updateComment(
      state: CommentState,
      action: PayloadAction<Comment>
    ): void {
      const comment = action.payload;

      state.comments = state.comments.map((_comment) => {
        if (_comment.id === comment.id) {
          return comment;
        }

        return _comment;
      });
    },
    deleteComment(
      state: CommentState,
      action: PayloadAction<string>
    ): void {
      state.comments = state.comments.filter((comment) => comment.id !== action.payload);
    }
  }
});

export const { reducer } = slice;

export const getComments = (): AppThunk => async (dispatch): Promise<void> => {
  const data = await commentApi.getComments();

  dispatch(slice.actions.getComments(data));
};

export const getCommentsByItemId = (itemId: string): AppThunk => async (dispatch): Promise<void> => {
  const data = await commentApi.getCommentsByItemId(itemId);

  dispatch(slice.actions.getCommentsByItemId(data));
};

export const createComment = (createData: CommentBody): AppThunk => async (dispatch): Promise<void> => {
  const data = await commentApi.createComment(createData);

  dispatch(slice.actions.createComment(data));
};

export const updateComment = (
  commentId: string,
  update: CommentBody
): AppThunk => async (dispatch): Promise<void> => {

  const data = await commentApi.updateComment({
    commentId,
    update
  });

  dispatch(slice.actions.updateComment(data));
};

export const deleteComment = (commentId: string): AppThunk => async (dispatch): Promise<void> => {
  await commentApi.deleteComment(commentId);

  dispatch(slice.actions.deleteComment(commentId));
};
