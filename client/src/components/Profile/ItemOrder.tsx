import { Box } from "@mui/system";
import { FC } from "react";
import { Card, IconButton, Link, Typography } from "@mui/material";
import { Trash as TrashIcon } from '../../assets/icons/trash';
import { ORDER_TYPES, ORDER_TYPES_LABEL, Order } from "src/types/order";
import { formatPrice } from "src/utils/price";
import moment from "moment";
import { Item } from "src/types/item";
import { useDispatch } from "src/store";
import { deleteOrder } from "src/slices/order";

interface OrderProps {
  order: Order;
  item: Item;
}

const ItemOrder: FC<OrderProps> = ({ order, item }) => {
  const dispatch = useDispatch();

  const { id: orderId, dateFrom, dateTo, orderType, totalPrice } = order;

  const handleDelete = () => {
    dispatch(deleteOrder(orderId));
  }

  return (
    <Card
      elevation={16}
      sx={{
        width: '100%',
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
          <Box ml={2} display="flex" flexDirection="column">
            <Box display="flex" flexDirection="row">
              <Link href={`/item/${item.id}`} underline="none" color="text">
                <Typography color="primary" variant="h6">
                  {ORDER_TYPES_LABEL[orderType]}
                </Typography>
              </Link>
              <Typography ml={1} color="text.secondary" variant="body2">
                {orderType === ORDER_TYPES.RENT && `(${dateFrom} - ${dateTo})`}
              </Typography>
            </Box>
            <Typography color="text.secondary" variant="body2">
              {order.phone || 'Телефон не указан'}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {order.createdAt && moment(order.createdAt).format("DD/MM/YYYY")}
            </Typography>
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" alignItems="flex-end">
          <Typography variant="h6">{formatPrice(totalPrice)}</Typography>
          <IconButton onClick={() => handleDelete()}>
            <TrashIcon color="error" />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
};

export default ItemOrder;
