import { Box, Link, Typography } from "@mui/material";
import { Item } from "src/types/item";
import { typeOptions } from "./constants";
import { Image as ImageIcon } from "../../assets/icons/image";

interface Props {
  item: Item;
}

const HouseListItem = ({ item }: Props) => {
  const { id, title, type, price, country, city, image } = item;

  const itemType = typeOptions.find((option) => option.value === type);

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
          <Typography variant="subtitle1">{price}р.</Typography>
        </Box>
      </Box>
    </Link>
  );
};

export default HouseListItem;
