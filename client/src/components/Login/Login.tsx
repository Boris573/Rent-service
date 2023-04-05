import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, FormHelperText, Link, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import { useAuth } from '../../hooks/useAuth';
import { useMounted } from '../../hooks/useMounted';

const Login = () => {
  const isMounted = useMounted();
  const { login } = useAuth();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      submit: null
    },
    validationSchema: VALIDATION_SCHEMA,
    onSubmit: async (values, helpers) => {
      try {
        await login(values.email, values.password);
        navigate('/');
      } catch (err) {
        console.error(err);

        if (isMounted()) {
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: 'Wrong credentials' });
          helpers.setSubmitting(false);
        }
      }
    }
  });

  return (
    <Box
      component="main"
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexGrow: 1,
        height: '100vh'
      }}
    >
      <Container maxWidth="sm">
        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ my: 3 }}>
            <Typography
              color="textPrimary"
              variant="h4"
            >
              Sign in
            </Typography>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              Sign in on the internal platform
            </Typography>
          </Box>
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
            variant="outlined"
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
            variant="outlined"
          />
          {formik.errors.submit && (
            <Box sx={{ mt: 3 }}>
              <FormHelperText error>
                {formik.errors.submit.toString()}
              </FormHelperText>
            </Box>
          )}
          <Box sx={{ py: 2 }}>
            <Button
              color="primary"
              disabled={formik.isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Sign In Now
            </Button>
          </Box>
          <Typography
            color="textSecondary"
            variant="body2"
          >
            Don't have an account?
            {' '}
            <Link
              href="/register"
              variant="subtitle2"
              underline="hover"
              sx={{
                cursor: 'pointer'
              }}
            >
              Sign Up
            </Link>
          </Typography>
        </form>
      </Container>
    </Box>
  );
};

export default Login;

const VALIDATION_SCHEMA = Yup.object({
  email: Yup
    .string()
    .email(
      'Must be a valid email')
    .max(255)
    .required(
      'Email is required'),
  password: Yup
    .string()
    .max(255)
    .required(
      'Password is required')
});
