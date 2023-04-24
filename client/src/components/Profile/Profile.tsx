import { Box } from "@mui/system";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "src/store";
import { getItems } from "src/slices/item";
import { UserCircle as UserCircleIcon } from "../../assets/icons/user-circle";
import {
  Avatar,
  Tab,
  Typography,
} from "@mui/material";
import { useAuth } from "src/hooks/useAuth";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { getOrders, getOrdersByUserId } from "src/slices/order";
import { PROFILE_TABS } from "./constants";
import ItemOrderList from "./ItemOrderList";
import Order from "./Order";

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
    dispatch(getOrders());
  }, []);

  const userItems = useMemo(() => {
    return items.filter((item) => item.host === user.id);
  }, [items, user]);

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
                const orderItem = items.find((item) => item.id === order.item);

                return orderItem && <Order key={order.id} order={order} item={orderItem} />;
              })}
            </Box>
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
              {userItems.map((item) => {
                const itemOrders = orders.filter((order) => order.item === item.id);

                return <ItemOrderList key={item.id} orders={itemOrders} item={item} />
              })}
            </Box>{" "}
          </TabPanel>
        </Box>
      </TabContext>
    </Box>
  );
};

export default Profile;
