import { Box } from "@mui/system";
import { FC, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "src/store";
import { getItemById } from "src/slices/item";
import { useParams } from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material";
import { Image as ImageIcon } from "../../../../assets/icons/image";
import * as Yup from "yup";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { FormikProps, useFormik } from "formik";
import toast from "react-hot-toast";
import { createOrder, getOrdersByItemId } from "src/slices/order";
import { Order } from "src/types/order";
import { Admin } from "src/types/admin";
import { Item } from "src/types/item";
import { checkIntervalsOverlapping } from "src/utils/check-intervals-overlapping";
import { formatPrice } from "src/utils/price";
import { FormValues } from "../OrderPanel";
import { ORDER_TYPES } from "../constants";

interface BuyFormProps {
  item: Item;
  user: Admin;
  orders: Order[];
  formik: any;
}

const BuyForm: FC<BuyFormProps> = ({ item, user, orders, formik }) => {
  const { buyPrice, isSale } = item ?? {};

  const isBlocked = orders.some((order) => order.item === item.id && order.orderType === ORDER_TYPES.BUY)

  return (
    <Box
      sx={{
        marginTop: 1,
        display: 'flex',
        flexDirection: "column",
      }}
    >
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="flex-end"
        mb={2}
      >
        <Typography variant="body1">Цена:</Typography>
        <Typography variant="h6">{formatPrice(buyPrice)}</Typography>
      </Box>
      {
        isBlocked
        ? null
        : user?.id !== item?.host ? (
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <Box display="flex" flexDirection="row">
  
            </Box>
            <Button
              sx={{
                mt: 2,
                p: 1.5,
                width: "100%",
              }}
              onClick={() => formik.setFieldValue('type', ORDER_TYPES.BUY)}
              disabled={!buyPrice && !isSale}
              type="submit"
              variant="contained"
            >
              Купить
            </Button>
          </LocalizationProvider>
        ) : (
          <Typography mt={4} color="error">
            Вы не можете купить жилье, если являетесь его хозяином.
          </Typography>
        )
      }
    </Box>
  );
};

export default BuyForm;
