import { FC, useMemo } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  TextField,
  Typography
} from '@mui/material';
import { Trash as TrashIcon } from '../../assets/icons/trash';
import { createItem, deleteItem, updateItem } from '../../slices/item';
import { useDispatch } from '../../store';
import { Item, ItemBody, itemTypeOptions } from '../../types/item';
import CommonSelect from '../Common/CommonSelect';
import { useAuth } from 'src/hooks/useAuth';

interface OfferFormProps {
  canDelete?: boolean;
  item?: Item;
  onAddComplete?: () => void;
  onClose?: () => void;
  onDeleteComplete?: () => void;
  onEditComplete?: () => void;
  open?: boolean;
}

interface FormValues {
  title: string;
  image: string | null;
  type: string;
  rentPrice: number;
  buyPrice: number;
  isRent: boolean;
  isSale: boolean;
  description: string | null;
  flatNumber: string;
  houseNumber: string;
  street: string;
  city: string;
  country: string;
  roomCount: number;
  host: string;
  hasKitchen: boolean;
  hasWorkZone: boolean;
  hasParking: boolean;
  hasGym: boolean;
  hasWifi: boolean;
  hasTV: boolean;
  hasIron: boolean;
  hasPool: boolean;
  hasElevator: boolean;
  submit: string | null;
}

const OfferDialog: FC<OfferFormProps> = (props) => {
  const {
    canDelete,
    item,
    onAddComplete,
    onClose,
    onDeleteComplete,
    onEditComplete,
    open,
  } = props;
  const dispatch = useDispatch();
  const { user } = useAuth();

  const initialValues = useMemo(
    (): FormValues => {
      if (item) {
        return {
          title: item.title || '',
          image: item.image || '',
          type: item.type || '',
          flatNumber: item.flatNumber || '',
          houseNumber: item.houseNumber || '',
          street: item.street || '',
          city: item.city || '',
          country: item.country || '',
          rentPrice: item.rentPrice || 0,
          buyPrice: item.buyPrice || 0,
          isRent: item.isRent || false,
          isSale: item.isSale || false,
          description: item.description || '',
          roomCount: item.roomCount || 1,
          host: item.host || '',
          hasKitchen: item.params?.hasKitchen || false,
          hasWorkZone: item.params?.hasWorkZone || false,
          hasParking: item.params?.hasParking || false,
          hasGym: item.params?.hasGym || false,
          hasWifi: item.params?.hasWifi || false,
          hasTV: item.params?.hasTV || false,
          hasIron: item.params?.hasIron || false,
          hasPool: item.params?.hasPool || false,
          hasElevator: item.params?.hasElevator || false,
          submit: null
        };
      }
      return {
        title: '',
        image: '',
        type: '',
        flatNumber: '',
        houseNumber: '',
        street: '',
        city: '',
        country: '',
        rentPrice: 0,
        buyPrice: 0,
        isRent: false,
        isSale: false,
        description: '',
        roomCount: 1,
        host: '',
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
    [item]
  );
  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: Yup.object({
      title: Yup
        .string()
        .max(60, 'Максимум 60 символов')
        .required('Требуется название'),
      isSale: Yup.boolean(),
      isRent: Yup.boolean(),
      buyPrice: Yup.number().when('isSale', {
        is: true,
        then: Yup.number().min(10, "Минимальная цена - 10.00р").required('Укажите цену')
      }),
      rentPrice: Yup.number().when('isRent', {
        is: true,
        then: Yup.number().min(10, "Минимальная цена - 10.00р").required('Укажите цену')
      })
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        const data: ItemBody = {
          title: values.title,
          image: values.image,
          type: values.type,
          flatNumber: values.flatNumber,
          houseNumber: values.houseNumber,
          street: values.street,
          city: values.city,
          country: values.country,
          rentPrice: values.isRent ? values.rentPrice : 0,
          buyPrice: values.isSale ? values.buyPrice : 0,
          isRent: values.isRent,
          isSale: values.isSale,
          roomCount: values.roomCount,
          description: values.description,
          host: user.id,
          params: {
            hasKitchen: values.hasKitchen,
            hasWorkZone: values.hasWorkZone,
            hasParking: values.hasParking,
            hasGym: values.hasGym,
            hasWifi: values.hasWifi,
            hasTV: values.hasTV,
            hasIron: values.hasIron,
            hasPool: values.hasPool,
            hasElevator: values.hasElevator,
          },
        };
        formik.resetForm();


        if (item) {
          await dispatch(updateItem(item.id!, data));
          toast.success('Объявление обновлено');
        } else {
          await dispatch(createItem(data));
          toast.success('Объявление добавлено');
        }

        if (!item && onAddComplete) {
          onAddComplete();
        }

        if (item && onEditComplete) {
          onEditComplete();
        }
      } catch (err: any) {
        console.log(err)
        toast.error('Что-то пошло не так');
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  const handleDelete = async (): Promise<void> => {
    try {
      if (!item) {
        return;
      }

      await dispatch(deleteItem(item.id!));
      onDeleteComplete?.();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog fullWidth maxWidth="sm" onClose={onClose} open={!!open}>
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ p: 3 }}>
          <Typography align="center" gutterBottom variant="h5">
            {item ? "Редактировать объявление" : "Добавить объявление"}
          </Typography>
        </Box>
        <Box sx={{ p: 3 }}>
          <Typography mb={3} variant='h5'>
            Основная информация
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                error={Boolean(formik.touched.title && formik.errors.title)}
                fullWidth
                helperText={formik.touched.title && formik.errors.title}
                label="Название"
                name="title"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.title}
              />
              <Box sx={{ mt: 2 }}>
                <CommonSelect
                  label="Тип жилья"
                  name="type"
                  options={itemTypeOptions}
                  value={formik.values.type}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={Boolean(formik.touched.type && formik.errors.type)}
                  helperText={formik.touched.type && formik.errors.type}
                />
              </Box>
              <Box sx={{ mt: 2 }}>
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
              <Box sx={{ mt: 2 }}>
                <TextField
                  error={Boolean(formik.touched.image && formik.errors.image)}
                  fullWidth
                  helperText={formik.touched.image && formik.errors.image}
                  label="Ссылка на фото"
                  name="image"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.image}
                />
              </Box>
              <Box sx={{ mt: 2, minHeight: 56, display: 'flex', alignItems: 'center' }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formik.values.isSale}
                      name="isSale"
                      onChange={formik.handleChange}
                    />
                  }
                  label="Продажа"
                />
              </Box>
              <Box sx={{ mt: 2, minHeight: 56, display: 'flex', alignItems: 'center' }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formik.values.isRent}
                      name="isRent"
                      onChange={formik.handleChange}
                    />
                  }
                  label="Аренда"
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
              <Box sx={{ mt: 2.5 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={6}>
                    <TextField
                      error={Boolean(formik.touched.houseNumber && formik.errors.houseNumber)}
                      fullWidth
                      helperText={formik.touched.houseNumber && formik.errors.houseNumber}
                      label="Дом"
                      name="houseNumber"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.houseNumber}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      error={Boolean(formik.touched.flatNumber && formik.errors.flatNumber)}
                      fullWidth
                      helperText={formik.touched.flatNumber && formik.errors.flatNumber}
                      label="Квартира"
                      name="flatNumber"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.flatNumber}
                    />
                  </Grid>
                </Grid>
              </Box>
              <Box sx={{ mt: 2 }}>
                <TextField
                  error={Boolean(formik.touched.buyPrice && formik.errors.buyPrice)}
                  fullWidth
                  disabled={!formik.values.isSale}
                  type="number"
                  InputProps={{
                    inputProps: { min: 0 }
                  }}
                  helperText={formik.touched.buyPrice && formik.errors.buyPrice}
                  label="Цена, р."
                  name="buyPrice"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.buyPrice}
                />
              </Box>
              <Box sx={{ mt: 2 }}>
                <TextField
                  error={Boolean(formik.touched.rentPrice && formik.errors.rentPrice)}
                  fullWidth
                  disabled={!formik.values.isRent}
                  type="number"
                  InputProps={{
                    inputProps: { min: 0 }
                  }}
                  helperText={formik.touched.rentPrice && formik.errors.rentPrice}
                  label="Цена, р."
                  name="rentPrice"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.rentPrice}
                />
              </Box>
            </Grid>
            <Typography mx={2} mt={3} mb={2} variant='h5'>
              Удобства
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
              Описание
            </Typography>
            <Grid item xs={12}>
              <TextField
                multiline
                sx={{
                  '.MuiInputBase-root': {
                    minHeight: 200,
                    display: 'flex',
                    alignItems: 'flex-start'
                  }
                }}
                error={Boolean(formik.touched.description && formik.errors.description)}
                fullWidth
                helperText={formik.touched.description && formik.errors.description}
                label="Описание"
                name="description"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.description}
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
          {item && canDelete && (
            <IconButton onClick={(): Promise<void> => handleDelete()}>
              <TrashIcon fontSize="small" />
            </IconButton>
          )}
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

export default OfferDialog;
