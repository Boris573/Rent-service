import { Box } from "@mui/system";
import { FC, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "src/store";
import * as Yup from "yup";
import { createItem, getItemById, updateItem } from "src/slices/item";
import { useParams } from "react-router-dom";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import OfferDialog from "../HouseDialog";
import { Image as ImageIcon } from "../../assets/icons/image";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { Trash as TrashIcon } from "../../assets/icons/trash";
import moment from "moment";
import { useAuth } from "src/hooks/useAuth";
import { Item, ItemBody } from "src/types/item";
import { Admin, ADMIN_ROLES } from "src/types/admin";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { Comment, CommentBody } from "src/types/comment";
import {
  updateComment,
  createComment,
  getCommentsByItemId,
  deleteComment,
} from "src/slices/comment";

interface CommentsProps {
  item: Item;
  user: Admin;
}

const Comments: FC<CommentsProps> = ({ item, user }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (item) {
      dispatch(getCommentsByItemId(item.id));
    }
  }, [item]);

  const comments = useSelector((state) =>
    state.comment.comments.filter((comment) => comment.item === item?.id)
  );

  const handleDelete = (id: string) => {
    dispatch(deleteComment(id));
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      text: '',
      submit: null,
    },
    validationSchema: Yup.object({
      text: Yup.string().max(255).required("Введите текст"),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        const data: CommentBody = {
          text: values.text,
          item: item?.id,
          userId: user?.id,
          username: user?.username,
        };
        console.log(data)

        await dispatch(createComment(data));
        toast.success("Объявление добавлено");

        formik.resetForm();
      } catch (err: any) {
        console.log(err);
        toast.error("Что-то пошло не так");
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  console.log(comments);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      justifyContent="flex-start"
    >
      <Typography mt={3} mb={2} variant="h5">
        Комментарии
      </Typography>
      {user?.id !== item?.host && (
        <Box width="100%" mb={2}>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              multiline
              sx={{
                my: 2,
                ".MuiInputBase-root": {
                  minHeight: 100,
                  display: "flex",
                  alignItems: "flex-start",
                },
              }}
              error={Boolean(formik.touched.text && formik.errors.text)}
              fullWidth
              helperText={formik.touched.text && formik.errors.text}
              label="Оставьте комментарий"
              name="text"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.text}
            />
            <Button disabled={formik.isSubmitting} type="submit">
              Добавить
            </Button>
          </form>
        </Box>
      )}
      {comments && comments.length > 0 ? (
        comments.map((comment) => (
          <Box
            key={comment?.id}
            sx={{
              width: "100%",
              p: 2,
              borderColor: "divider",
              borderStyle: "solid",
              borderWidth: 1,
              borderRadius: 1,
              mb: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Box display="flex" mb={2} width="100%" flexDirection="row" justifyContent="space-between">
              <Typography variant="h6">@{comment?.username}</Typography>
              {comment?.createdAt && (
                <Typography color="text.secondary" variant="body2">
                  {moment(comment.createdAt).format('DD/MM/YYYY, HH:mm')}
                </Typography>
              )}
            </Box>
            <Box display="flex" width="100%" flexDirection="row" justifyContent="space-between">
              <Typography>{comment?.text}</Typography>
              {(user?.id === comment?.userId || user?.role === ADMIN_ROLES.ADMIN) && (
                <IconButton onClick={() => handleDelete(comment.id)}>
                  <TrashIcon color="error" />
                </IconButton>
              )}
            </Box>
          </Box>
        ))
      ) : (
        <Typography mt={3}>Комментариев нет</Typography>
      )}
    </Box>
  );
};

export default Comments;
