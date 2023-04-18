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
import { Order, ORDER_TYPES } from "src/types/order";
import { Admin } from "src/types/admin";
import { Item } from "src/types/item";
import { checkIntervalsOverlapping } from "src/utils/check-intervals-overlapping";
import { formatPrice } from "src/utils/price";

interface RentFormProps {
  item: Item;
  user: Admin;
  orders: Order[];
  formik: any;
}

const RentForm: FC<RentFormProps> = ({ item, user, orders, formik }) => {
  const bookedPeriods = useMemo(() => orders.map((order) => ({dateFrom: order.dateFrom, dateTo: order.dateTo })), [orders])

  const { rentPrice, isRent } = item ?? {};

  console.log(formik)

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
        <Typography variant="body1">Цена за ночь:</Typography>
        <Typography variant="h6">{formatPrice(rentPrice)}</Typography>
      </Box>
      {user.id !== item?.host ? (
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <Box display="flex" flexDirection="row">
            <DatePicker
              sx={{
                mr: 1,
                mt: 3,
              }}
              minDate={moment(new Date())}
              slotProps={{
                textField: {
                  helperText:
                    formik.touched.dateFrom && formik.errors.dateFrom,
                  error: Boolean(
                    formik.touched.dateFrom && formik.errors.dateFrom
                  ),
                  name: "dateFrom",
                  onBlur: formik.handleBlur,
                },
              }}
              format="DD/MM/YYYY"
              label="Прибытие"
              shouldDisableDate={(date) => {
                const isBetween = orders.filter((order) => {
                  const dateFrom = moment(order.dateFrom, "DD/MM/YYYY");
                  const dateTo = moment(order.dateTo, "DD/MM/YYYY");

                  return date.isBetween(dateFrom, dateTo, "days", "[]")
                });

                return isBetween.length > 0;
              }}
              onChange={(value) =>
                formik.setFieldValue(
                  "dateFrom",
                  value.format("DD/MM/YYYY").toString()
                )
              }
              value={moment(formik.values.dateFrom, "DD/MM/YYYY")}
            />
            <DatePicker
              sx={{
                mt: 3,
              }}
              minDate={moment(formik.values.dateFrom, 'DD/MM/YYYY')}
              slotProps={{
                textField: {
                  helperText: formik.touched.dateTo && formik.errors.dateTo,
                  error: Boolean(
                    formik.touched.dateTo && formik.errors.dateTo
                  ),
                  name: "dateTo",
                  onBlur: formik.handleBlur,
                },
              }}
              disabled={!formik.values.dateFrom}
              shouldDisableDate={(date) => {
                const isBetween = orders.filter((order) => {
                  const dateFrom = moment(order.dateFrom, "DD/MM/YYYY");
                  const dateTo = moment(order.dateTo, "DD/MM/YYYY");

                  return date.isBetween(dateFrom, dateTo, "days", "[]")
                });

                const isBooked = checkIntervalsOverlapping([
                  {
                    dateFrom: formik.values.dateFrom,
                    dateTo: date.format("DD/MM/YYYY").toString(),
                  },
                  ...bookedPeriods,
                ])

                return isBetween.length > 0 || isBooked;
              }}
              format="DD/MM/YYYY"
              label="Выезд"
              onChange={(value) =>
                formik.setFieldValue(
                  "dateTo",
                  value.format("DD/MM/YYYY").toString()
                )
              }
              value={moment(formik.values.dateTo, "DD/MM/YYYY")}
            />
          </Box>
          {formik.values.dateFrom && formik.values.dateTo && (
            <Box
              mt={2}
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="flex-end"
            >
              <Typography variant="body1">Всего:</Typography>
              <Typography variant="h6">
                {formatPrice((moment(formik.values.dateTo, "DD/MM/YYYY").diff(
                  moment(formik.values.dateFrom, "DD/MM/YYYY"),
                  "days"
                ) +
                  1) *
                  item.rentPrice)}
              </Typography>
            </Box>
          )}
          <Button
            sx={{
              mt: 2,
              p: 1.5,
              width: "100%",
            }}
            onClick={() => formik.setFieldValue('type', ORDER_TYPES.RENT)}
            disabled={!rentPrice && !isRent}
            type="submit"
            variant="contained"
          >
            Забронировать
          </Button>
        </LocalizationProvider>
      ) : (
        <Typography mt={4} color="error">
          Вы не можете бронировать жилье, если являетесь его хозяином.
        </Typography>
      )}
    </Box>
  );
};

export default RentForm;
