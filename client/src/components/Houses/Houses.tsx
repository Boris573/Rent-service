import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "src/store";
import { getItems } from "src/slices/item";
import HouseListItem from "../HouseListItem";
import HouseFilter from "../HouseFilter";
import { defautFilter } from "../HouseFilter/constants";
import { Filter } from "src/types/filter";
import { Item } from "src/types/item";
import { filterItems } from "src/utils/filter-items";
import { Divider, Typography } from "@mui/material";

const Houses = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.item);
  const [filter, setFilter] = useState<Filter>(defautFilter);
  const [filteredItems, setFilteredItems] = useState<Item[] | null>(items);

  useEffect(() => {
    dispatch(getItems());
  }, []);

  const handleFilterChange = (newFilter: Filter) => {
    setFilter(newFilter);
  };

  useEffect(() => {
    const filteredElements = filterItems(items, filter);
    setFilteredItems(filteredElements);
  }, [filter, items]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      position="relative"
      p={3}
      pt={10}
    >
      <HouseFilter
        filter={filter}
        onFilterChange={(filter) => handleFilterChange(filter)}
      />
      <Box
        width="100%"
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        alignItems="flex-start"
        justifyContent="left"
      >
        {filteredItems && filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <HouseListItem key={item.id} item={item} />
          ))
        ) : (
          <Box mt={6} display="flex" flexDirection="column">
            <Typography variant="h4">Нет точных совпадений</Typography>
            <Typography mt={2} variant="h6">
              Попробуйте скорректировать или удалить некоторые фильтры.
            </Typography>
          </Box>
        )}
      </Box>
      <Divider sx={{ width: "100%", m: 2 }} />
      <Typography mb={2} alignSelf="flex-start" variant="h4">Все объявления</Typography>
      <Box
        width="100%"
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        alignItems="flex-start"
        justifyContent="left"
      >
        {items.map((item) => (
          <HouseListItem key={item.id} item={item} />
        ))}
      </Box>
    </Box>
  );
};

export default Houses;
