import { FC, useMemo } from 'react';
import toast from 'react-hot-toast';
import { useFormik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  Divider,
  FormControlLabel,
  Grid,
  TextField,
  Typography
} from '@mui/material';
import { itemTypeOptions } from '../../types/item';
import CommonSelect from '../Common/CommonSelect';
import { Filter } from 'src/types/filter';
import { ORDER_TYPES } from 'src/types/order';

interface OfferFormProps {
  filter?: Filter;
  onFilterSubmit?: (filter?: Filter) => void;
  onClose?: () => void;
  open?: boolean;
}

interface FormValues {
  hasImage?: boolean;
  type?: string;
  orderType: string;
  priceFrom: number;
  priceTo?: number;
  street?: string;
  city?: string;
  country?: string;
  roomCount?: number;
  hasKitchen?: boolean;
  hasWorkZone?: boolean;
  hasParking?: boolean;
  hasGym?: boolean;
  hasWifi?: boolean;
  hasTV?: boolean;
  hasIron?: boolean;
  hasPool?: boolean;
  hasElevator?: boolean;
  sort?: string;
  submit: string;
}

const orderTypeOptions = [
  {
    value: ORDER_TYPES.BUY,
    label: 'Купить'
  },
  {
    value: ORDER_TYPES.RENT,
    label: 'Арендовать'
  },
]

const HouseFilterDialog: FC<OfferFormProps> = (props) => {
  const {
    filter,
    open,
    onFilterSubmit,
    onClose,
  } = props;

  const initialValues = useMemo(
    (): FormValues => {
      if (filter) {
        return {
          ...filter,
          submit: null
        };
      }
      return {
        hasImage: false,
        type: '',
        orderType: ORDER_TYPES.BUY,
        street: '',
        city: '',
        country: '',
        priceFrom: 0,
        priceTo: 1000000,
        sort: null,
        roomCount: 0,
        hasKitchen: false,
        hasWorkZone: false,
        hasParking: false,
        hasGym: false,
        hasWifi: false,
        hasTV: false,
        hasIron: false,
        hasPool: false,
        hasElevator: false,
        submit: null
      };
    },
    [filter]
  );
  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        const data: Filter = {
          hasImage: values.hasImage,
          type: values.type,
          orderType: values.orderType,
          street: values.street,
          city: values.city,
          country: values.country,
          priceFrom: values.priceFrom || 0,
          priceTo: values.priceTo,
          sort: values.sort,
          roomCount: values.roomCount,
          hasKitchen: values.hasKitchen,
          hasWorkZone: values.hasWorkZone,
          hasParking: values.hasParking,
          hasGym: values.hasGym,
          hasWifi: values.hasWifi,
          hasTV: values.hasTV,
          hasIron: values.hasIron,
          hasPool: values.hasPool,
          hasElevator: values.hasElevator,
        };

        if (onFilterSubmit) {
          onFilterSubmit(data);
        }

      } catch (err: any) {
        toast.error('Что-то пошло не так');
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  return (
    <Dialog fullWidth maxWidth="sm" onClose={onClose} open={!!open}>
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ p: 3 }}>
          <Typography align="center" gutterBottom variant="h5">
            Фильтры
          </Typography>
        </Box>
        <Box sx={{ p: 3 }}>
          <Typography mb={3} variant='h5'>
            Укажите, что вы ищите
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <CommonSelect
                label="Что вы хотите?"
                name="orderType"
                options={orderTypeOptions}
                value={formik.values.orderType}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(formik.touched.orderType && formik.errors.orderType)}
                helperText={formik.touched.orderType && formik.errors.orderType}
              />
              <Box sx={{ mt: 1.6 }}>
                <CommonSelect
                  label="Тип жилья"
                  name="type"
                  defaultValue=''
                  options={[...itemTypeOptions, { value: '', label: 'Все'}]}
                  value={formik.values.type}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={Boolean(formik.touched.type && formik.errors.type)}
                  helperText={formik.touched.type && formik.errors.type}
                />
              </Box>
              <Box sx={{ mt: 1.6 }}>
                <TextField
                  error={Boolean(formik.touched.roomCount && formik.errors.roomCount)}
                  fullWidth
                  type="number"
                  InputProps={{
                    inputProps: { min: 0 }
                  }}
                  helperText={formik.touched.roomCount && formik.errors.roomCount}
                  label="Количество комнат"
                  name="roomCount"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.roomCount}
                />
              </Box>
              <Box sx={{ mt: 2, minHeight: 56, display: 'flex', alignItems: 'center' }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formik.values.hasImage}
                      name="hasImage"
                      onChange={() => formik.setFieldValue('hasImage', !formik.values.hasImage)}
                    />
                  }
                  label="Показывать объявления только с фото"
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box>
                <TextField
                  error={Boolean(formik.touched.country && formik.errors.country)}
                  fullWidth
                  helperText={formik.touched.country && formik.errors.country}
                  label="Страна"
                  name="country"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.country}
                />
              </Box>
              <Box sx={{ mt: 2 }}>
                <TextField
                  error={Boolean(formik.touched.city && formik.errors.city)}
                  fullWidth
                  helperText={formik.touched.city && formik.errors.city}
                  label="Город"
                  name="city"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.city}
                />
              </Box>
              <Box sx={{ mt: 2 }}>
                <TextField
                  error={Boolean(formik.touched.street && formik.errors.street)}
                  fullWidth
                  helperText={formik.touched.street && formik.errors.street}
                  label="Улица"
                  name="street"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.street}
                />
              </Box>
            </Grid>
            <Typography mx={2} mt={3} mb={2} variant='h5'>
              Укажите, какие удобства вы хотите получить?
            </Typography>
            <Grid
              container
              xs={12}
            >
              <Grid item xs={6} px={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formik.values.hasKitchen}
                      name="hasKitchen"
                      onChange={formik.handleChange}
                    />
                  }
                  label="Кухня"
                />
              </Grid>
              <Grid item xs={6} px={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formik.values.hasWorkZone}
                      name="hasWorkZone"
                      onChange={formik.handleChange}
                    />
                  }
                  label="Рабочая зона"
                />
              </Grid>
              <Grid item xs={6} px={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formik.values.hasGym}
                      name="hasGym"
                      onChange={formik.handleChange}
                    />
                  }
                  label="Спортзал"
                />
              </Grid>
              <Grid item xs={6} px={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formik.values.hasParking}
                      name="hasParking"
                      onChange={formik.handleChange}
                    />
                  }
                  label="Парковка"
                />
              </Grid>
              <Grid item xs={6} px={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formik.values.hasPool}
                      name="hasPool"
                      onChange={formik.handleChange}
                    />
                  }
                  label="Бассейн"
                />
              </Grid>
              <Grid item xs={6} px={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formik.values.hasWifi}
                      name="hasWifi"
                      onChange={formik.handleChange}
                    />
                  }
                  label="Wi-Fi"
                />
              </Grid>
              <Grid item xs={6} px={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formik.values.hasTV}
                      name="hasTV"
                      onChange={formik.handleChange}
                    />
                  }
                  label="Телевизор"
                />
              </Grid>
              <Grid item xs={6} px={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formik.values.hasIron}
                      name="hasIron"
                      onChange={formik.handleChange}
                    />
                  }
                  label="Утюг"
                />
              </Grid>
              <Grid item xs={6} px={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formik.values.hasElevator}
                      name="hasElevator"
                      onChange={formik.handleChange}
                    />
                  }
                  label="Лифт"
                />
              </Grid>
            </Grid>
            <Typography mx={2} mt={3} mb={2} variant='h5'>
              Укажите ценовой диапозон
            </Typography>
            <Grid
              item
              xs={12}
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <TextField
                error={Boolean(formik.touched.priceFrom && formik.errors.priceFrom)}
                fullWidth
                type="priceFrom"
                InputProps={{
                  inputProps: { min: 0 }
                }}
                helperText={formik.touched.priceFrom && formik.errors.priceFrom}
                label="От"
                name="priceFrom"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.priceFrom}
                sx={{
                  width: '45%'
                }}
              />
              -
              <TextField
                error={Boolean(formik.touched.priceTo && formik.errors.priceTo)}
                fullWidth
                type="number"
                InputProps={{
                  inputProps: { min: 0 }
                }}
                helperText={formik.touched.priceTo && formik.errors.priceTo}
                label="До"
                name="priceTo"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.priceTo}
                sx={{
                  width: '45%'
                }}
              />
            </Grid>
          </Grid>
        </Box>
        <Divider />
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            p: 2,
          }}
        >
          <Box sx={{ flexGrow: 1 }} />
          <Button onClick={onClose}>Отмена</Button>
          <Button
            disabled={formik.isSubmitting}
            sx={{ ml: 1 }}
            type="submit"
            variant="contained"
          >
            Подтвердить
          </Button>
        </Box>
      </form>
    </Dialog>
  );
};

export default HouseFilterDialog;
