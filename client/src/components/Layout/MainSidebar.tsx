// import { ReactNode, useEffect, useMemo, useRef } from 'react';
// import type { FC } from 'react';
// import { useLocation } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import { useTranslation, TFunction } from 'react-i18next';
// import { Link } from 'react-router-dom';
// import { Box, Divider, Drawer, Typography, useMediaQuery } from '@mui/material';
// import type { Theme } from '@mui/material';
// import WebIcon from '@mui/icons-material/Web';
// import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
// import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
// import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
// import BrunchDiningIcon from '@mui/icons-material/BrunchDining';
// import { Home as HomeIcon } from '../../assets/icons/home';
// import { Users as UsersIcon } from '../../assets/icons/users';
// import { Logo } from './Logo';
// import { Scrollbar } from './Scrollbar';
// import { MainSidebarSection } from './SidebarSection';
// import { useAuth } from '../../hooks/useAuth';
// import { useDispatch, useSelector } from '../../store';
// import { getLanding } from '../../slices/landing';

// interface MainSidebarProps {
//   onClose?: () => void;
//   open?: boolean;
// }

// interface Item {
//   title: string;
//   children?: Item[];
//   chip?: ReactNode;
//   icon?: ReactNode;
//   path?: string;
// }

// interface Section {
//   title: string;
//   items: Item[];
// }

// const getSections = (t: TFunction): Section[] => [
//   {
//     title: t('Management'),
//     items: [
//       {
//         title: t('Orders'),
//         icon: <ReceiptLongIcon fontSize="small" />,
//         path: '/orders',
//       },
//       {
//         title: t('Customers'),
//         path: '/customers/all',
//         icon: <UsersIcon fontSize="small" />,
//       },
//       {
//         title: t('Menu'),
//         path: '/menus',
//         icon: <RestaurantMenuIcon fontSize="small" />,
//       },
//       {
//         title: t('Products'),
//         path: '/products',
//         icon: <BrunchDiningIcon fontSize="small" />,
//       },
//       {
//         title: t('Tables'),
//         icon: <TableRestaurantIcon fontSize="small" />,
//         path: '/tables',
//       },
//       {
//         title: t('Locations'),
//         icon: <HomeIcon fontSize="small" />,
//         path: '/locations',
//       },
//       {
//         title: t('Landing'),
//         icon: <WebIcon fontSize="small" />,
//         path: '/landing',
//       },
//     ]
//   },
// ];

// export const MainSidebar: FC<MainSidebarProps> = (props) => {
//   const { onClose, open } = props;
//   const location = useLocation();
//   const { organization } = useAuth();
//   const { landing } = useSelector((state) => state.landing);
//   const { t } = useTranslation();
//   const dispatch = useDispatch();
//   const lgUp = useMediaQuery(
//     (theme: Theme) => theme.breakpoints.up('lg'),
//     {
//       noSsr: true
//     }
//   );
//   const sections = useMemo(() => getSections(t), [t]);
//   const organizationsRef = useRef<HTMLButtonElement | null>(null);

//   useEffect(
//     () => {
//       dispatch(getLanding());
//     },
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     []
//   );

//   const content = (
//     <Scrollbar
//       sx={{
//         height: '100%',
//         '& .simplebar-content': {
//           height: '100%'
//         }
//       }}
//     >
//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: 'column',
//           height: '100%'
//         }}
//       >
//         <div>
//           <Box sx={{ p: 3 }}>
//             <Link
//               to="/"
//             >
//               {landing?.logo ? (
//                 <Box
//                   sx={{
//                     backgroundImage: `url(${new URL(landing?.logo).href})`,
//                     backgroundPosition: 'center',
//                     backgroundSize: 'contain',
//                     backgroundRepeat: 'no-repeat',
//                     borderRadius: 1,
//                     height: 150,
//                     width: 'auto',
//                   }}
//                 />
//               ) : (
//                 <Logo
//                   sx={{
//                     height: 42,
//                     width: 42
//                   }}
//                 />
//               )}
//             </Link>
//           </Box>
//           <Box sx={{ px: 2 }}>
//             <Box
//               ref={organizationsRef}
//               sx={{
//                 alignItems: 'center',
//                 backgroundColor: 'rgba(255, 255, 255, 0.04)',
//                 cursor: 'pointer',
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 px: 3,
//                 py: '11px',
//                 borderRadius: 1
//               }}
//             >
//               <div>
//                 <Typography
//                   color="inherit"
//                   variant="subtitle1"
//                 >
//                   {organization?.name}
//                 </Typography>
//               </div>
//             </Box>
//           </Box>
//         </div>
//         <Divider
//           sx={{
//             borderColor: '#2D3748', // dark divider
//             my: 3
//           }}
//         />
//         <Box sx={{ flexGrow: 1 }}>
//           {sections.map((section) => (
//             <MainSidebarSection
//               key={section.title}
//               path={location?.pathname || '/'}
//               sx={{
//                 mt: 2,
//                 '& + &': {
//                   mt: 2
//                 }
//               }}
//               {...section}
//             />
//           ))}
//         </Box>
//       </Box>
//     </Scrollbar>
//   );

//   if (lgUp) {
//     return (
//       <Drawer
//         anchor="left"
//         open
//         PaperProps={{
//           sx: {
//             backgroundColor: 'neutral.900',
//             borderRightColor: 'divider',
//             borderRightStyle: 'solid',
//             borderRightWidth: (theme) => theme.palette.mode === 'dark' ? 1 : 0,
//             color: '#FFFFFF',
//             width: 280
//           }
//         }}
//         variant="permanent"
//       >
//         {content}
//       </Drawer>
//     );
//   }

//   return (
//     <Drawer
//       anchor="left"
//       onClose={onClose}
//       open={open}
//       PaperProps={{
//         sx: {
//           backgroundColor: 'neutral.900',
//           color: '#FFFFFF',
//           width: 280
//         }
//       }}
//       sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
//       variant="temporary"
//     >
//       {content}
//     </Drawer>
//   );
// };

// MainSidebar.propTypes = {
//   onClose: PropTypes.func,
//   open: PropTypes.bool
// };
