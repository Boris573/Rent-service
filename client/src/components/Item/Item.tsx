import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "src/store";
import { deleteItem, getItemById } from "src/slices/item";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Divider, Grid, IconButton, Typography } from "@mui/material";
import { typeOptions } from "./constants";
import OfferDialog from "../HouseDialog";
import { Image as ImageIcon } from "../../assets/icons/image";
import * as Yup from "yup";
import { Trash as TrashIcon } from "../../assets/icons/trash";
import moment from "moment";
import { useAuth } from "src/hooks/useAuth";
import Comments from "../Comments";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { createOrder } from "src/slices/order";
import { OrderBody, ORDER_TYPES } from "src/types/order";
import OrderPanel from "./OrderPanel";
import { mapParams } from "src/utils/mapParams";

const Item = () => {
  const [isOfferDialogOpen, setOfferDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { itemId } = useParams();
  const item = useSelector((state) =>
    state.item.items.find((_item) => _item.id === itemId)
  );
  const { user } = useAuth();
  const { id, title, type, description, host, country, city, rentPrice, image, roomCount, params } = item ?? {};

  const itemType = typeOptions.find((option) => option.value === type);

  useEffect(() => {
    dispatch(getItemById(itemId));
  }, []);

  const handleRowClick = (): void => {
    setOfferDialogOpen(true);
  };

  const handleLocationDialogClose = (success?: boolean): void => {
    setOfferDialogOpen(false);

    if (success) {
      getItemById(itemId);
    }
  };

  const handleDelete = () => {
    dispatch(deleteItem(id));
    navigate('/');
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      type: ORDER_TYPES.RENT,
      dateFrom: "",
      dateTo: "",
      totalPrice: "",
      submit: null,
    },
    validationSchema: Yup.object({
      dateFrom: Yup.string().required("Укажите, когда вы прибудете"),
      dateTo: Yup.string()
        .required("Укажите, когда вы будете выезжать")
        .test(
          "is-greater",
          "Дата въезда должна быть раньше даты выезда",
          function (value) {
            const { dateFrom } = this.parent;
            if (!dateFrom) return true;
            return moment(value, "DD/MM/YYYY").isSameOrAfter(
              moment(dateFrom, "DD/MM/YYYY")
            );
          }
        ),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        const totalPrice =
          (moment(values.dateTo, "DD/MM/YYYY").diff(
            moment(values.dateFrom, "DD/MM/YYYY"),
            "days"
          ) +
            1) *
          rentPrice;

        const data: OrderBody = {
          orderType: values.type,
          dateFrom: values.dateFrom,
          dateTo: values.dateTo,
          totalPrice: totalPrice,
          item: id,
          user: user.id,
        };

        await dispatch(createOrder(data));
        toast.success("Бронь добавлена");

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

  return (
    <Box
      display="flex"
      flexDirection="column"
      flexWrap="wrap"
      alignItems="flex-start"
      justifyContent="flex-start"
      py={4}
      px={10}
    >
      {user?.id === host && (
        <Box
          width="100%"
          mt={1}
          mb={2}
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
        >
          <Button
            onClick={() => {
              handleRowClick();
            }}
            variant="contained"
          >
            Редактировать
          </Button>
          <IconButton onClick={() => handleDelete()}>
            <TrashIcon color="error" />
          </IconButton>
        </Box>
      )}

      {image ? (
        <Box
          sx={{
            alignItems: "center",
            backgroundColor: "background.default",
            backgroundImage: `url(${image})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            borderRadius: 1,
            display: "flex",
            justifyContent: "center",
            overflow: "hidden",
            width: "100%",
            height: 400,
          }}
        />
      ) : (
        <Box
          sx={{
            alignItems: "center",
            backgroundColor: "divider",
            borderRadius: 1,
            display: "flex",
            justifyContent: "center",
            width: "100%",
            height: 400,
          }}
        >
          <ImageIcon />
        </Box>
      )}
      <Grid container mt={4} justifyContent="space-between">
        <Grid item xs={7}>
          <Box display="flex" flexDirection="column">
            <Typography variant="h4">{title}</Typography>
            <Typography color="text.secondary" variant="subtitle1">
              {city}, {country}
            </Typography>
            <Typography color="text.secondary" variant="subtitle1">
              Тип жилья: {itemType?.label}
            </Typography>
            <Typography color="text.secondary" variant="subtitle1">
              Количество комнат: {roomCount}
            </Typography>
            <Divider sx={{ mt: 3 }} />
            <Box>
              <Typography mt={3} mb={2} variant="h5">
                Удобства
              </Typography>
              {params ? (
                mapParams(params)
              ) : (
                <Typography mt={3} mb={2} variant="body1">
                  К сожалению, удобств нет
                </Typography>
              )}
            </Box>
            <Divider sx={{ mt: 3, mb: 1 }} />
            <Typography
              mt={3}
              style={{ whiteSpace: "pre-line" }}
              variant="body1"
            >
              {description}
            </Typography>
          </Box>
          <Divider sx={{ mt: 3 }} />
          <Comments item={item} user={user} />
        </Grid>
        <OrderPanel item={item} user={user} />
      </Grid>
      <OfferDialog
        item={item}
        onAddComplete={() => handleLocationDialogClose(true)}
        onClose={() => handleLocationDialogClose()}
        onDeleteComplete={() => handleLocationDialogClose(true)}
        onEditComplete={() => handleLocationDialogClose(true)}
        open={isOfferDialogOpen}
      />
    </Box>
  );
};

export default Item;
