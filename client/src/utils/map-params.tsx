import { Chip, Grid, Typography } from '@mui/material';
import { ITEM_PARAMS } from 'src/types/item';

export const mapParams = (params: any, size = 'menium') => {
  if (!params) return null;
  const paramKeys = Object.keys(params);
  const filteredParams = paramKeys.filter((key) => params[key]);
  return (
    <Grid container spacing={0.5}>
      {filteredParams.length > 0
        ? filteredParams.map((key) => (
          <Grid item key={key}>
            <Chip
              size={size as 'small' | 'medium'}
              label={ITEM_PARAMS[key]}
            />
          </Grid>
        ))
        : <Typography mt={1} ml={0.5}>К сожалению, удобств нет</Typography>
      }
    </Grid>
  );
};
