import type { FC } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  Divider,
  FormHelperText,
  Grid,
  Link as MuiLink,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useMounted } from "../../hooks/useMounted";
import { Logo } from "../Layout/Logo";
import { AdminBody } from "src/types/admin";

export const Register: FC = (props) => {
  const isMounted = useMounted();
  const { register } = useAuth();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      fullName: "",
      username: "",
      password: "",
      avatar: '',
      submit: null,
    },
    validationSchema: VALIDATION_SCHEMA,
    onSubmit: async (values, helpers): Promise<void> => {
      const user: AdminBody = {
        fullName: values.fullName,
        username: values.fullName,
        password: values.password,
        avatar: values.avatar,        
      }
      try {
        await register(user);
        navigate("/");
      } catch (err) {
        console.error(err);

        if (isMounted()) {
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: (err as any).message });
          helpers.setSubmitting(false);
        }
      }
    },
  });

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: "background.default",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          py: {
            xs: "60px",
            md: "120px",
          },
        }}
      >
        <Card elevation={16} sx={{ p: 4 }}>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography variant="h4">Регистрация</Typography>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              mt: 3,
            }}
          >
            <form onSubmit={formik.handleSubmit} {...props}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    error={Boolean(formik.touched.fullName && formik.errors.fullName)}
                    fullWidth
                    helperText={formik.touched.fullName && formik.errors.fullName}
                    label="Ваше имя и фамилия"
                    margin="normal"
                    name="fullName"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.fullName}
                  />
                  <TextField
                    error={Boolean(formik.touched.avatar && formik.errors.avatar)}
                    fullWidth
                    helperText={formik.touched.avatar && formik.errors.avatar}
                    label="Фото"
                    margin="normal"
                    name="avatar"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.avatar}
                  />
                  <TextField
                    error={Boolean(formik.touched.username && formik.errors.username)}
                    fullWidth
                    helperText={formik.touched.username && formik.errors.username}
                    label="Имя аккаунт или почта"
                    margin="normal"
                    name="username"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.username}
                  />
                  <TextField
                    error={Boolean(
                      formik.touched.password && formik.errors.password
                    )}
                    fullWidth
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                    label="Пароль"
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
                  Зарегистрироваться
                </Button>
              </Box>
            </form>
          </Box>
          <Divider sx={{ my: 3 }} />
          <div>
            <MuiLink
              color="textSecondary"
              variant="body2"
              to={"/login"}
              component={Link}
            >
              У меня уже есть аккаунт
            </MuiLink>
          </div>
        </Card>
      </Container>
    </Box>
  );
};

const VALIDATION_SCHEMA = Yup.object({
  fullName: Yup.string()
    .max(255)
    .required("Требуется ваше имя и фамилия"),
  username: Yup.string()
    .max(255)
    .required("Требуется имя аккаунт"),
  password: Yup.string().min(7).max(255).required("Требуется пароль"),
  avatar: Yup.string(),
});
