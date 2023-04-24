import { Box } from "@mui/system";
import { FC } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { Order } from "src/types/order";
import { Admin } from "src/types/admin";
import { Item } from "src/types/item";
import { formatPrice } from "src/utils/price";
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
            <Box sx={{ mt: 2 }}>
              <TextField
                error={Boolean(formik.touched.phone && formik.errors.phone)}
                fullWidth
                helperText={formik.touched.phone && formik.errors.phone}
                label="Введите телефон для связи"
                name="phone"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.phone}
              />
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
