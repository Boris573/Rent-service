import { Box } from "@mui/system";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'src/store';
import { getItems } from "src/slices/item";
import HouseListItem from "../HouseListItem";

const Houses = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.item)

  useEffect(() => {
    dispatch(getItems());
  }, [])

  return (
    <Box
      display="flex"
      flexDirection="row"
      flexWrap="wrap"
      alignItems="flex-start"
      justifyContent="left"
      p={4}
    >
      {
        items.map((item) => (
          <HouseListItem key={item.id} item={item} />
        ))
      }
    </Box>
  );
};

export default Houses;
