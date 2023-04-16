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
      username: '',
      password: '',
      submit: null
    },
    validationSchema: VALIDATION_SCHEMA,
    onSubmit: async (values, helpers) => {
      try {
        await login(values.username, values.password);
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
              Войти в аккаунт
            </Typography>
          </Box>
          <TextField
            error={Boolean(formik.touched.username && formik.errors.username)}
            fullWidth
            helperText={formik.touched.username && formik.errors.username}
            label="Имя пользователя или почта"
            margin="normal"
            name="username"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="username"
            value={formik.values.username}
            variant="outlined"
          />
          <TextField
            error={Boolean(formik.touched.password && formik.errors.password)}
            fullWidth
            helperText={formik.touched.password && formik.errors.password}
            label="Пароль"
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
              Войти в аккаунт
            </Button>
          </Box>
          <Typography
            color="textSecondary"
            variant="body2"
          >
            Нет аккаунта?
            {' '}
            <Link
              href="/register"
              variant="subtitle2"
              underline="hover"
              sx={{
                cursor: 'pointer'
              }}
            >
              Зарегистрироваться
            </Link>
          </Typography>
        </form>
      </Container>
    </Box>
  );
};

export default Login;

const VALIDATION_SCHEMA = Yup.object({
  username: Yup
    .string()
    .max(255)
    .required(
      'Требуется имя пользователя'),
  password: Yup
    .string()
    .max(255)
    .required(
      'Требуется пароль')
});
