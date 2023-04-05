import type { FC } from 'react';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Box, Button, Card, Checkbox, Container, Divider, FormHelperText, Grid, Link as MuiLink, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useMounted } from '../../hooks/useMounted';
import { Logo } from '../Layout/Logo';

export const Register: FC = (props) => {
  const isMounted = useMounted();
  const { register } = useAuth();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      emailConfirm: '',
      password: '',
      submit: null
    },
    validationSchema: VALIDATION_SCHEMA,
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        if (values.email !== values.emailConfirm) {
          helpers.setFieldError('emailConfirm', 'Emails do not match');
          return;
        }
        await register(values.email, '', values.password);

        if (isMounted()) {
          // const returnUrl = (router.query.returnUrl as string | undefined) || '/dashboard';
          // router.push(returnUrl).catch(console.error);
        }
        navigate('/onboarding');
      } catch (err) {
        console.error(err);

        if (isMounted()) {
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: (err as any).message });
          helpers.setSubmitting(false);
        }
      }
    }
  });

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          py: {
            xs: '60px',
            md: '120px'
          }
        }}
      >
        <Card
          elevation={16}
          sx={{ p: 4 }}
        >
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <Typography variant="h4">
              Register
            </Typography>
            <Typography
              color="textSecondary"
              sx={{ mt: 2 }}
              variant="body2"
            >
              Register on the internal platform
            </Typography>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              mt: 3
            }}
          >
        <form
          noValidate
          onSubmit={formik.handleSubmit}
          {...props}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                error={Boolean(formik.touched.email && formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                label="Email Address"
                margin="normal"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="email"
                value={formik.values.email}
              />
              <TextField
                error={Boolean(formik.touched.emailConfirm && formik.errors.emailConfirm)}
                fullWidth
                helperText={formik.touched.emailConfirm && formik.errors.emailConfirm}
                label="Confirm email"
                margin="normal"
                name="emailConfirm"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.emailConfirm}
              />
              <TextField
                error={Boolean(formik.touched.password && formik.errors.password)}
                fullWidth
                helperText={formik.touched.password && formik.errors.password}
                label="Password"
                margin="normal"
                name="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="password"
                value={formik.values.password}
              />
            </Grid>
          </Grid>
          {formik.errors.submit && (
            <Box sx={{ mt: 3 }}>
              <FormHelperText error>
                {formik.errors.submit.toString()}
              </FormHelperText>
            </Box>
          )}
          <Box sx={{ mt: 2 }}>
            <Button
              disabled={formik.isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Register
            </Button>
          </Box>
        </form>
            </Box>
            <Divider sx={{ my: 3 }} />
            <div>
              <MuiLink
                color="textSecondary"
                variant="body2"
                to={'/login'}
                component={Link}
              >
                Having an account
              </MuiLink>
            </div>
          </Card>
        </Container>
      </Box>
  );
};

const VALIDATION_SCHEMA = Yup.object({
  email: Yup
    .string()
    .email('Must be a valid email')
    .max(255)
    .required('Email is required'),
  emailConfirm: Yup
    .string()
    .max(255)
    .required('Confirmation email is required'),
  password: Yup
    .string()
    .min(7)
    .max(255)
    .required('Password is required'),
  policy: Yup
    .boolean()
    .oneOf([true], 'This field must be checked')
})