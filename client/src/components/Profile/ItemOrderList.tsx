import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Link,
  Typography,
} from "@mui/material";
import { Item } from "src/types/item";
import { Image as ImageIcon } from "../../assets/icons/image";
import { FC, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Order as IOrder } from "src/types/order";
import ItemOrder from "./ItemOrder";

interface Props {
  item: Item;
  orders: IOrder[]
}

const ItemOrderList: FC<Props> = ({ item, orders }) => {
  const { id, type } = item;
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="flex-start"
      width="100%"
      mb={2}
    >
      <Accordion
        sx={{ width: "100%", p: 2 }}
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
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
              <Link href={`/item/${id}`} underline="none" color="text">
                <Typography color="primary" variant="h6">
                  {item.title}
                </Typography>
              </Link>
              <Typography color="text.secondary" variant="body2">
                {item.city}, {item.street}, {item.houseNumber}
              </Typography>
            </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="flex-start"
          >
            {orders && orders.length > 0
              ? orders.map((order) => <ItemOrder key={order.id} order={order} item={item} />)
              : <Typography>Заказов нет</Typography>
            }
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default ItemOrderList;
