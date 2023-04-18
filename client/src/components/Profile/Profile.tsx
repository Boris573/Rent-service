import { Box } from "@mui/system";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "src/store";
import { getItemById, getItems } from "src/slices/item";
import { useParams } from "react-router-dom";
import { UserCircle as UserCircleIcon } from "../../assets/icons/user-circle";
import {
  Avatar,
  Button,
  Card,
  Divider,
  FormHelperText,
  Grid,
  Tab,
  TextField,
  Typography,
} from "@mui/material";
import { Image as ImageIcon } from "../../assets/icons/image";
import { useAuth } from "src/hooks/useAuth";
import HouseListItem from "../HouseListItem";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { getOrdersByUserId } from "src/slices/order";
import { PROFILE_TABS } from "./constants";
import { ORDER_TYPES, ORDER_TYPES_LABEL } from "src/types/order";
import { formatPrice } from "src/utils/price";
import moment from "moment";

const Profile = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState<string>(PROFILE_TABS.ORDERS);

  const { items } = useSelector((state) => state.item);
  const { orders } = useSelector((state) => state.order);
  const { user } = useAuth();
  const { username, fullName, id, avatar } = user;

  useEffect(() => {
    dispatch(getItems());
    dispatch(getOrdersByUserId(id));
  }, []);

  const orderedItems = useMemo(() => {
    return items.filter((item) =>
      orders.find((order) => order.item === item.id)
    );
  }, [items, orders]);

  const handleTabChange = (e: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      flexWrap="wrap"
      alignItems="flex-start"
      justifyContent="center"
      py={4}
      margin="auto"
    >
      <Box maxWidth="40%" margin="auto" display="flex" flexDirection="row">
        {avatar ? (
          <Box
            sx={{
              alignItems: "center",
              backgroundColor: "background.default",
              backgroundImage: `url(${avatar})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              borderRadius: 1,
              display: "flex",
              justifyContent: "center",
              overflow: "hidden",
              width: 120,
              height: 120,
            }}
          />
        ) : (
          <Avatar
            src="/static/mock-images/avatars/avatar-anika_visser.png"
            sx={{
              height: 120,
              width: 120,
            }}
          >
            <UserCircleIcon fontSize="large" />
          </Avatar>
        )}
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          ml={5}
        >
          <Typography mb={1} variant="h4">
            {fullName}
          </Typography>
          <Typography variant="h5">@{username}</Typography>
          <Typography color="text.secondary" variant="h6">
            {id}
          </Typography>
        </Box>
      </Box>
      <TabContext value={activeTab}>
        <Box
          sx={{ mt: 3, width: "100%", borderBottom: 1, borderColor: "divider" }}
        >
          <TabList onChange={handleTabChange} variant="fullWidth">
            <Tab
              label="Ваши заказы"
              value={PROFILE_TABS.ORDERS}
              sx={{ m: 0 }}
            />
            <Tab
              label="Ваши объвления"
              value={PROFILE_TABS.ITEMS}
              sx={{ mL: 0 }}
            />
          </TabList>
        </Box>
        <Box sx={{ width: "100%" }}>
          <TabPanel value={PROFILE_TABS.ORDERS}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="flex-start"
              p={4}
            >
              {orders.map((order) => {
                const {
                  id: orderId,
                  dateFrom,
                  dateTo,
                  orderType,
                  totalPrice,
                } = order;
                const orderItem = items.find((item) => item.id === order.item);

                return orderItem && (
                  <Card
                    elevation={16}
                    sx={{
                      width: "80%",
                      minHeight: 50,
                      p: 2,
                      mb: 2,
                      cursor: "pointer",
                    }}
                    key={orderId}
                  >
                    <Box
                      display="flex"
                      flexDirection="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                      >
                        {orderItem.image ? (
                          <Box
                            sx={{
                              alignItems: "center",
                              backgroundColor: "background.default",
                              backgroundImage: `url(${orderItem.image})`,
                              backgroundPosition: "center",
                              backgroundSize: "cover",
                              borderRadius: 1,
                              display: "flex",
                              justifyContent: "center",
                              overflow: "hidden",
                              width: 90,
                              height: 90,
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
                              width: 90,
                              height: 90,
                            }}
                          >
                            <ImageIcon />
                          </Box>
                        )}
                        <Box ml={2} display="flex" flexDirection="column">
                          <Box display="flex" flexDirection="row">
                            <Typography  color="primary" variant="h6">
                              {ORDER_TYPES_LABEL[orderType]}
                            </Typography>
                            <Typography
                              ml={1}
                              color="text.secondary"
                              variant="body2"
                            >
                              {orderType === ORDER_TYPES.RENT &&
                                `(${dateFrom} - ${dateTo})`}
                            </Typography>
                          </Box>
                          <Typography
                              color="text.secondary"
                              variant="body2"
                            >
                            {orderItem.city}, {orderItem.street}, {orderItem.houseNumber}
                          </Typography>
                          <Typography
                              color="text.secondary"
                              variant="body2"
                            >
                            {order.createdAt && moment(order.createdAt).format('DD/MM/YYYY')}
                          </Typography>
                        </Box>
                      </Box>
                      <Box justifySelf="flex-end">
                        <Typography variant="h6">
                          {formatPrice(totalPrice)}
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                );
              })}
            </Box>{" "}
          </TabPanel>
          <TabPanel value={PROFILE_TABS.ITEMS}>
            <Box
              display="flex"
              flexDirection="row"
              flexWrap="wrap"
              alignItems="flex-start"
              justifyContent="left"
              p={4}
            >
              {orderedItems.map((item) => (
                <HouseListItem key={item.id} item={item} />
              ))}
            </Box>{" "}
          </TabPanel>
        </Box>
      </TabContext>
    </Box>
  );
};

export default Profile;
