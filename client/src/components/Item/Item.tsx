import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "src/store";
import { getItemById } from "src/slices/item";
import { useParams } from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material";
import { typeOptions } from "./constants";
import OfferDialog from "../HouseDialog";
import { Image as ImageIcon } from "../../assets/icons/image";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import moment from "moment";

const Item = () => {
  const [isOfferDialogOpen, setOfferDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const { itemId } = useParams();
  const item = useSelector((state) =>
    state.item.items.find((_item) => _item.id === itemId)
  );
  const { title, type, price, description, country, city, image } = item ?? {};

  const itemType = typeOptions.find((option) => option.value === type);

  useEffect(() => {
    dispatch(getItemById(itemId));
  }, []);

  const handleRowClick = (): void => {
    setOfferDialogOpen(true);
  };

  const handleLocationDialogClose = (success?: boolean): void => {
    setOfferDialogOpen(false);

    if (success) {
      getItemById(itemId);
    }
  };

  console.log(item);

  return (
    <Box
      display="flex"
      flexDirection="column"
      flexWrap="wrap"
      alignItems="flex-start"
      justifyContent="flex-start"
      py={4}
      px={10}
    >
      <Box
        width="100%"
        mt={1}
        mb={2}
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
      >
        <Typography variant="h5">{itemType?.label}</Typography>
        <Button
          onClick={() => {
            handleRowClick();
          }}
          variant="contained"
        >
          Редактировать
        </Button>
      </Box>
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
            width: "100%",
            height: 400,
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
            width: "100%",
            height: 400,
          }}
        >
          <ImageIcon />
        </Box>
      )}
      <Grid container mt={4} justifyContent="space-between">
        <Grid item xs={7}>
          <Box display="flex" flexDirection="column">
            <Typography variant="h4">{title}</Typography>
            <Typography color="text.secondary" variant="subtitle1">
              {city}, {country}
            </Typography>
            <Typography
              mt={3}
              style={{ whiteSpace: "pre-line" }}
              variant="body1"
            >
              {description}
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={4}
          sx={{
            marginTop: 1,
            position: "sticky",
            top: 100,
            boxShadow: "rgba(0, 0, 0, 0.12) 0px 6px 16px",
            border: 1,
            borderColor: "divider",
            borderRadius: 2,
            padding: 3,
            flexDirection: "column",
            height: "fit-content",
          }}
        >
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="flex-end"
          >
            <Typography variant="body1">Цена за ночь:</Typography>
            <Typography variant="h5">{price}р.</Typography>
          </Box>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DateRangePicker
              sx={{
                mt: 3,
              }}
              minDate={moment(new Date())}
              localeText={{ start: "Прибытие", end: "Выезд" }}
              // value={value}
              // onChange={(newValue) => setValue(newValue)}
            />
            <Button
              sx={{
                mt: 2,
                p: 1.5,
                width: '100%',
              }}
              onClick={() => {
                handleRowClick();
              }}
              variant="contained"
            >
              Забронировать
            </Button>
          </LocalizationProvider>
        </Grid>
      </Grid>
      <OfferDialog
        item={item}
        onAddComplete={() => handleLocationDialogClose(true)}
        onClose={() => handleLocationDialogClose()}
        onDeleteComplete={() => handleLocationDialogClose(true)}
        onEditComplete={() => handleLocationDialogClose(true)}
        open={isOfferDialogOpen}
      />
    </Box>
  );
};

export default Item;
