import { Box, Link, Typography } from "@mui/material";
import { Item, itemTypeOptions } from "src/types/item";
import { Image as ImageIcon } from "../../assets/icons/image";
import { formatPrice } from "src/utils/price";

interface Props {
  item: Item;
}

const HouseListItem = ({ item }: Props) => {
  const { id, title, type, rentPrice, buyPrice, country, city, image } = item;

  const itemType = itemTypeOptions.find((option) => option.value === type);

  return (
    <Link m={2} href={`/item/${id}`} underline="none" color="text">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="flex-start"
        maxWidth={300}
      >
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
              width: 300,
              height: 300,
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
              height: 300,
              width: 300,
            }}
          >
            <ImageIcon />
          </Box>
        )}
        <Box mt={1} display="flex" flexDirection="column" justifyContent="left">
          <Typography variant="h6">{title}</Typography>
          <Typography color="text.secondary" variant="subtitle2">
            {city}, {country}
          </Typography>
          <Typography color="text.secondary" variant="subtitle2">
            {itemType.label}
          </Typography>
          <Typography variant="subtitle2">Аренда: {formatPrice(rentPrice)}</Typography>
          <Typography variant="subtitle2">Покупка: {formatPrice(buyPrice)}</Typography>
        </Box>
      </Box>
    </Link>
  );
};

export default HouseListItem;
