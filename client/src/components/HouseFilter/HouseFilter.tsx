import { Box } from "@mui/system";
import { FC, useState } from "react";
import { Button, Chip } from "@mui/material";
import HouseFilterDialog from "./HouseFilterDialog";
import { Filter } from "src/types/filter";
import { ORDER_TYPES_LABEL } from "src/types/order";

interface HouseFilterProps {
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
}

const HouseFilter: FC<HouseFilterProps> = ({ filter, onFilterChange }) => {
  const [isFilterDialogOpen, setFilterDialogOpen] = useState(false);

  const handleOpenFilterDialog = (): void => {
    setFilterDialogOpen(true);
  };

  const handleCloseFilterDialog = (success: boolean, newFilter?: Filter): void => {
    setFilterDialogOpen(false);

    if (success) {
      console.log(newFilter)
      onFilterChange(newFilter)
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'left',
        p: 3,
        position: 'absolute',
        top: 0,
        right: -32,
        left: -32,
        background: 'white',
        borderTopColor: 'divider',
        borderTopStyle: 'solid',
        borderTopWidth: 1,
      }}
    >
      <Button
        variant="contained"
        onClick={() => handleOpenFilterDialog()}
      >
        Фильтры
      </Button>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        {filter.roomCount && filter.roomCount > 0 ? <Chip sx={{ml: 2}} size={'medium'} label={`Кол-во комнат: ${filter.roomCount}`} /> : null}
        {filter.priceFrom && filter.priceFrom > 0 ? <Chip sx={{ml: 2}} size={'medium'} label={`Цена от: ${filter.priceFrom}`} /> : null}
        {filter.priceTo && filter.priceTo > 0 && <Chip sx={{ml: 2}} size={'medium'} label={`Цена до: ${filter.priceTo}`} />}
        {filter.orderType && <Chip sx={{ml: 2}} size={'medium'} label={ORDER_TYPES_LABEL[filter.orderType]} />}
        {filter.hasImage && <Chip sx={{ml: 2}} size={'medium'} label="Только с фото" />}
      </Box>
      <HouseFilterDialog
        filter={filter}
        onFilterSubmit={(filter) => handleCloseFilterDialog(true, filter)}
        onClose={() => handleCloseFilterDialog(false)}
        open={isFilterDialogOpen}
      />
    </Box>
  );
};

export default HouseFilter;
