import { Box, Typography } from "@mui/material";
import { Item } from "src/types/item";

interface Props {
  item: Item;
}

const HouseListItem = ({ item }: Props) => {
  console.log(item)
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignContent="center"
      m={2}
    >
      <Box width={300} height={300} bgcolor="divider" borderRadius={2}/>
      <Box mt={1} display="flex" flexDirection="column" justifyContent="left">
        <Typography variant="h5">{item.address1}</Typography>
        <Typography variant="body2">{item.type}</Typography>
        <Box display="flex" flexDirection="row">
          <Typography variant="h6">{item.price}</Typography>
          <Typography variant="body2">for night</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default HouseListItem;
