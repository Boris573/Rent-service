import { Box } from "@mui/system";
import { FC, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "src/store";
import { Grid, Tab, Typography } from "@mui/material";
import * as Yup from "yup";
import { TabContext, TabList, TabPanel } from '@mui/lab';
import moment from "moment";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { createOrder, getOrdersByItemId } from "src/slices/order";
import { OrderBody, ORDER_TYPES } from "src/types/order";
import { Admin } from "src/types/admin";
import { Item } from "src/types/item";
import RentForm from "./RentForm";
import BuyForm from "./BuyForm";

interface OrderPanelProps {
  item: Item;
  user: Admin;
}

export interface FormValues {
  type: ORDER_TYPES.RENT,
  dateFrom: '',
  dateTo: '',
  totalPrice: '',
  phone: '',
  submit: null,
}

const OrderPanel: FC<OrderPanelProps> = ({ item, user }) => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState<string>(item?.isSale ? ORDER_TYPES.BUY : ORDER_TYPES.RENT);

  const orders = useSelector((state) =>
    state.order.orders.filter((order) => order.item === item?.id)
  );

  const userOrders = useMemo(() => orders.filter((order) => order.user === user.id), [orders])

  useEffect(() => {
    if (item) {
      dispatch(getOrdersByItemId(item.id));
    }
  }, [item]);

  const handleTabChange = (e: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      type: ORDER_TYPES.BUY,
      dateFrom: '',
      dateTo: '',
      totalPrice: '',
      phone: '',
      submit: null,
    },
    validationSchema: Yup.object({
      type: Yup.string(),
      phone: Yup.string().required('Укажите телефон, чтобы хозяин смог с вами связаться'),
      dateFrom: Yup.string().when('type', {
        is: ORDER_TYPES.RENT,
        then: Yup.string().required("Укажите, когда вы прибудете")
      }),
      dateTo: Yup.string().when('type', {
        is: ORDER_TYPES.RENT,
        then: Yup.string()
        .required("Укажите, когда вы будете выезжать")
        .test(
          "is-greater",
          "Дата въезда должна быть раньше даты выезда",
          function (value) {
            const { dateFrom } = this.parent;

            return moment(value, "DD/MM/YYYY").isSameOrAfter(moment(dateFrom, "DD/MM/YYYY"));
          }
        )
      })
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        const totalPrice = values.type === ORDER_TYPES.BUY
          ? item.buyPrice
          : (moment(values.dateTo, "DD/MM/YYYY").diff(
            moment(values.dateFrom, "DD/MM/YYYY"),
            "days"
          ) +
            1) *
          item.rentPrice;

        const data: OrderBody = {
          orderType: values.type,
          dateFrom: values.type === ORDER_TYPES.RENT ? values.dateFrom : '',
          dateTo: values.type === ORDER_TYPES.RENT ? values.dateTo : '',
          totalPrice: totalPrice,
          phone: values.phone,
          item: item.id,
          user: user.id,
        };

        await dispatch(createOrder(data));
        toast.success("Заказ добавлен");

        formik.resetForm();
      } catch (err: any) {
        toast.error("Что-то пошло не так");
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <Grid
      item
      xs={4.5}
      sx={{
        marginTop: 1,
        position: "sticky",
        top: 100,
        boxShadow: "rgba(0, 0, 0, 0.12) 0px 6px 16px",
        border: 1,
        borderColor: "divider",
        borderRadius: 2,
        pt: 3,
        flexDirection: "column",
        justifyContent: "center",
        height: "fit-content",
      }}
    >
      <Box px={3} mb={3}>
        {userOrders &&
          userOrders.map((order) => moment(order.dateTo, 'DD/MM/YYYY').isSameOrAfter(moment(new Date())) && (
            <Typography color="error" mb={1} variant="h6">
              {order.orderType === ORDER_TYPES.RENT
                ? `Забронировано вами c ${order.dateFrom} по ${order.dateTo}.`
                : 'Подана заявка на покупку.'}
            </Typography>
          ))}
      </Box>
      {(item?.isRent || item?.isSale)
        ? (
          <form onSubmit={formik.handleSubmit}>
            <TabContext value={activeTab}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList onChange={handleTabChange} variant="fullWidth">
                  {item?.isSale && <Tab label="Купить" value={ORDER_TYPES.BUY} sx={{ m: 0 }} />}
                  {item?.isRent && <Tab label="арендовать" value={ORDER_TYPES.RENT} sx={{ mL: 0 }} />}
                </TabList>
              </Box>
              <Box sx={{ overflow: "auto", maxHeight: "70vh" }}>
                <TabPanel value={ORDER_TYPES.BUY}>
                  <BuyForm
                    item={item}
                    user={user}
                    orders={orders}
                    formik={formik}
                  />
                </TabPanel>
                <TabPanel value={ORDER_TYPES.RENT}>
                  <RentForm
                    item={item}
                    user={user}
                    orders={orders}
                    formik={formik}
                  />
                </TabPanel>
              </Box>
            </TabContext>
          </form>
        )
        : (
          <Typography mx={3} mb={3}>Это жилье нельзя купить или арендовать.</Typography>
        )
      }
    </Grid>
  );
};

export default OrderPanel;
