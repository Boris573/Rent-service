import { Box } from "@mui/system";
import { FC } from "react";
import { Card, Link, Typography } from "@mui/material";
import { Image as ImageIcon } from "../../assets/icons/image";
import { ORDER_TYPES, ORDER_TYPES_LABEL, Order as IOrder } from "src/types/order";
import { formatPrice } from "src/utils/price";
import moment from "moment";
import { Item } from "src/types/item";

interface OrderProps {
  order: IOrder;
  item: Item;
}

const Order: FC<OrderProps> = ({ order, item }) => {
  const { id: orderId, dateFrom, dateTo, orderType, totalPrice } = order;

  return (
    item && (
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
          <Box display="flex" flexDirection="row" alignItems="center">
            {item.image ? (
              <Box
                sx={{
                  alignItems: "center",
                  backgroundColor: "background.default",
                  backgroundImage: `url(${item.image})`,
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
                <Link href={`/item/${item.id}`} underline="none" color="text">
                  <Typography color="primary" variant="h6">
                    {ORDER_TYPES_LABEL[orderType]}
                  </Typography>
                </Link>
                <Typography ml={1} color="text.secondary" variant="body2">
                  {orderType === ORDER_TYPES.RENT &&
                    `(${dateFrom} - ${dateTo})`}
                </Typography>
              </Box>
              <Typography color="text.secondary" variant="body2">
                {item.city}, {item.street}, {item.houseNumber}
              </Typography>
              <Typography color="text.secondary" variant="body2">
                {order.createdAt &&
                  moment(order.createdAt).format("DD/MM/YYYY")}
              </Typography>
            </Box>
          </Box>
          <Box justifySelf="flex-end">
            <Typography variant="h6">{formatPrice(totalPrice)}</Typography>
          </Box>
        </Box>
      </Card>
    )
  );
};

export default Order;
