// import { FC, useEffect, useMemo } from 'react';
// import PropTypes from 'prop-types';
// import toast from 'react-hot-toast';
// import * as Yup from 'yup';
// import { useFormik } from 'formik';
// import {
//   Box,
//   Button,
//   Dialog,
//   Divider,
//   FormControlLabel,
//   Grid,
//   IconButton,
//   Switch,
//   TextField,
//   Typography
// } from '@mui/material';
// import { Trash as TrashIcon } from '../../assets/icons/trash';
// import { createItem, deleteItem, updateItem } from '../../slices/item';
// import { useDispatch, useSelector } from '../../store';
// import type { Item, ItemBody } from '../../types/item';
// import CommonSelect from '../Common/CommonSelect';

// interface HouseFormProps {
//   canDelete?: boolean;
//   item?: Item;
//   onAddComplete?: () => void;
//   onClose?: () => void;
//   onDeleteComplete?: () => void;
//   onEditComplete?: () => void;
//   open?: boolean;
// }

// interface FormValues {
//   name: string;
//   phone: string;
//   menu: string;
//   address1: string;
//   address2: string;
//   city: string;
//   country: string;
//   zip: string;
//   state: string;
//   workFrom: string;
//   workTo: string;
//   acceptOrders: boolean;
//   submit: string | null;
// }

// export const HouseDialog: FC<HouseFormProps> = (props) => {
//   const {
//     canDelete,
//     item,
//     onAddComplete,
//     onClose,
//     onDeleteComplete,
//     onEditComplete,
//     open,
//   } = props;
//   const dispatch = useDispatch();
//   const { menus } = useSelector((state) => state.menu);
//   const menuOptions = useMemo(() => menus.map(({ _id, name }) => ({ label: name, value: _id })), [menus]);

//   const initialValues = useMemo(
//     (): FormValues => {
//       if (item) {
//         return {
//           name: item.name || '',
//           phone: item.phone || '',
//           menu: item.menu?._id || '',
//           address1: item.address1 || '',
//           address2: item.address2 || '',
//           city: item.city || '',
//           country: item.country || '',
//           zip: item.zip || '',
//           state: item.state || '',
//           workFrom: item.workFrom || '',
//           workTo: item.workTo || '',
//           acceptOrders: item.acceptOrders || false,
//           submit: null
//         };
//       }
//       return {
//         name: '',
//         phone: '',
//         menu: '',
//         address1: '',
//         address2: '',
//         city: '',
//         country: '',
//         zip: '',
//         state: '',
//         workFrom: '',
//         workTo: '',
//         acceptOrders: false,
//         submit: null
//       };
//     },
//     [item]
//   );
//   const formik = useFormik({
//     enableReinitialize: true,
//     initialValues,
//     validationSchema: Yup.object({
//       name: Yup
//         .string()
//         .max(255)
//         .required(t('Title is required')),
//       acceptOrders: Yup.boolean(),
//     }),
//     onSubmit: async (values, helpers): Promise<void> => {
//       try {
//         const data: HouseBody = {
//           name: values.name,
//           phone: values.phone,
//           menu: values.menu,
//           address1: values.address1,
//           address2: values.address2,
//           city: values.city,
//           state: values.state,
//           country: values.country,
//           zip: values.zip,
//           workFrom: values.workFrom,
//           workTo: values.workTo,
//           acceptOrders: values.acceptOrders,
//           updatedAt: new Date().toString(),
//           createdAt: new Date().toString(),
//         };

//         if (item) {
//           await dispatch(updateHouse(item._id!, data));
//           toast.success(t('House updated!'));
//         } else {
//           await dispatch(createHouse(data));
//           toast.success(t('House added!'));
//         }

//         if (!item && onAddComplete) {
//           onAddComplete();
//         }

//         if (item && onEditComplete) {
//           onEditComplete();
//         }
//       } catch (err: any) {
//         toast.error(t('Something went wrong!'));
//         helpers.setStatus({ success: false });
//         helpers.setErrors({ submit: err.message });
//         helpers.setSubmitting(false);
//       }
//     }
//   });

//   const handleDelete = async (): Promise<void> => {
//     try {
//       if (!item) {
//         return;
//       }

//       await dispatch(deleteHouse(item._id!));
//       onDeleteComplete?.();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <Dialog
//       fullWidth
//       maxWidth="sm"
//       onClose={onClose}
//       open={!!open}
//     >
//       <form onSubmit={formik.handleSubmit}>
//         <Box sx={{ p: 3 }}>
//           <Typography
//             align="center"
//             gutterBottom
//             variant="h5"
//           >
//             {
//               item
//                 ? t('Edit House')
//                 : t('Add House')
//             }
//           </Typography>
//         </Box>
//         <Box sx={{ p: 3 }}>
//           <Grid container spacing={2}>
//             <Grid item xs={6}>
//               <TextField
//                 error={Boolean(formik.touched.name && formik.errors.name)}
//                 fullWidth
//                 helperText={formik.touched.name && formik.errors.name}
//                 label={t('Title')}
//                 name="name"
//                 onBlur={formik.handleBlur}
//                 onChange={formik.handleChange}
//                 value={formik.values.name}
//               />
//               <Box sx={{ mt: 2 }}>
//                 <TextField
//                   error={Boolean(formik.touched.phone && formik.errors.phone)}
//                   fullWidth
//                   helperText={formik.touched.phone && formik.errors.phone}
//                   label={t('Phone')}
//                   name="phone"
//                   onBlur={formik.handleBlur}
//                   onChange={formik.handleChange}
//                   value={formik.values.phone}
//                 />
//               </Box>
//               <Box>
//                 <CommonSelect
//                   label="Menu"
//                   name="menu"
//                   options={menuOptions}
//                   value={formik.values.menu}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   error={Boolean(formik.touched.menu && formik.errors.menu)}
//                   helperText={formik.touched.menu && formik.errors.menu}
//                 />
//               </Box>
//               <Box>
//                 <Typography>{t('Working Hours')}</Typography>
//                 <Grid container sx={{ mt: 2 }} alignItems={'center'}>
//                   <Grid item xs={5}>
//                     <TextField
//                       error={Boolean(formik.touched.workFrom && formik.errors.workFrom)}
//                       fullWidth
//                       helperText={formik.touched.workFrom && formik.errors.workFrom}
//                       label={t('From')}
//                       name="workFrom"
//                       onBlur={formik.handleBlur}
//                       onChange={formik.handleChange}
//                       value={formik.values.workFrom}
//                     />
//                   </Grid>
//                   <Grid item xs={2}>
//                     <Typography align="center">-</Typography>
//                   </Grid>
//                   <Grid item xs={5}>
//                     <TextField
//                       error={Boolean(formik.touched.workTo && formik.errors.workTo)}
//                       fullWidth
//                       helperText={formik.touched.workTo && formik.errors.workTo}
//                       label={t('To')}
//                       name="workTo"
//                       onBlur={formik.handleBlur}
//                       onChange={formik.handleChange}
//                       value={formik.values.workTo}
//                     />
//                   </Grid>
//                 </Grid>
//               </Box>
//               <Box sx={{ mt: 2 }}>
//                 <FormControlLabel
//                   control={(
//                     <Switch
//                       checked={formik.values.acceptOrders}
//                       name="acceptOrders"
//                       onChange={formik.handleChange}
//                     />
//                   )}
//                   label={t('Accept Orders')}
//                 />
//               </Box>
//             </Grid>
//             <Grid item xs={6}>
//               <Box>
//                 <TextField
//                   error={Boolean(formik.touched.address1 && formik.errors.address1)}
//                   fullWidth
//                   helperText={formik.touched.address1 && formik.errors.address1}
//                   label={t('Address 1')}
//                   name="address1"
//                   onBlur={formik.handleBlur}
//                   onChange={formik.handleChange}
//                   value={formik.values.address1}
//                 />
//               </Box>
//               <Box sx={{ mt: 2 }}>
//                 <TextField
//                   error={Boolean(formik.touched.address2 && formik.errors.address2)}
//                   fullWidth
//                   helperText={formik.touched.address2 && formik.errors.address2}
//                   label={t('Address 2')}
//                   name="address2"
//                   onBlur={formik.handleBlur}
//                   onChange={formik.handleChange}
//                   value={formik.values.address2}
//                 />
//               </Box>
//               <Box sx={{ mt: 2 }}>
//                 <TextField
//                   error={Boolean(formik.touched.city && formik.errors.city)}
//                   fullWidth
//                   helperText={formik.touched.city && formik.errors.city}
//                   label={t('City')}
//                   name="city"
//                   onBlur={formik.handleBlur}
//                   onChange={formik.handleChange}
//                   value={formik.values.city}
//                 />
//               </Box>
//               <Box sx={{ mt: 2 }}>
//                 <TextField
//                   error={Boolean(formik.touched.state && formik.errors.state)}
//                   fullWidth
//                   helperText={formik.touched.state && formik.errors.state}
//                   label={t('State')}
//                   name="state"
//                   onBlur={formik.handleBlur}
//                   onChange={formik.handleChange}
//                   value={formik.values.state}
//                 />
//               </Box>
//               <Box sx={{ mt: 2 }}>
//                 <TextField
//                   error={Boolean(formik.touched.country && formik.errors.country)}
//                   fullWidth
//                   helperText={formik.touched.country && formik.errors.country}
//                   label={t('Country')}
//                   name="country"
//                   onBlur={formik.handleBlur}
//                   onChange={formik.handleChange}
//                   value={formik.values.country}
//                 />
//               </Box>
//               <Box sx={{ mt: 2 }}>
//                 <TextField
//                   error={Boolean(formik.touched.zip && formik.errors.zip)}
//                   fullWidth
//                   helperText={formik.touched.zip && formik.errors.zip}
//                   label={t('Zip Code')}
//                   name="zip"
//                   onBlur={formik.handleBlur}
//                   onChange={formik.handleChange}
//                   value={formik.values.zip}
//                 />
//               </Box>
//             </Grid>
//           </Grid>
//         </Box>
//         <Divider />
//         <Box
//           sx={{
//             alignItems: 'center',
//             display: 'flex',
//             p: 2
//           }}
//         >
//           {item && canDelete && (
//             <IconButton onClick={(): Promise<void> => handleDelete()}>
//               <TrashIcon fontSize="small" />
//             </IconButton>
//           )}
//           <Box sx={{ flexGrow: 1 }} />
//           <Button onClick={onClose}>
//             {t('Cancel')}
//           </Button>
//           <Button
//             disabled={formik.isSubmitting}
//             sx={{ ml: 1 }}
//             type="submit"
//             variant="contained"
//           >
//             {t('Confirm')}
//           </Button>
//         </Box>
//       </form>
//     </Dialog>
//   );
// };

// HouseDialog.propTypes = {
//   // @ts-ignore
//   item: PropTypes.object,
//   onAddComplete: PropTypes.func,
//   onClose: PropTypes.func,
//   onDeleteComplete: PropTypes.func,
//   onEditComplete: PropTypes.func,
//   open: PropTypes.bool,
// };
