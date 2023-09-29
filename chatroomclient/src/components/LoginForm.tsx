import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useSubmit } from "react-router-dom";
import { GiNotebook } from "react-icons/gi";
import { FiLogIn } from "react-icons/fi";

function LoginForm() {
  const submit = useSubmit();
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, "The Username is too short: 2 - 20 characters!")
      .max(20, "The Username is too long: 2 - 20 characters!")
      .required("Username is required!")
      .matches(
        /^[A-Za-z0-9 ]+$/,
        "Username can only be alpha-numeric characters"
      )
      .trim(),
    password: Yup.string()
      .min(6, "The password is too short: 6 - 40 characters!")
      .max(40, "The password is too long: 6 - 40 characters!")
      .required("Password is required!")
      .matches(/^[A-Za-z0-9@ ]+$/),
  });

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          submit(values, { method: "post" });
        }}
      >
        {({ errors, touched }) => (
          <Form
            style={{ height: "100ch" }}
            className="d-flex align-items-center justify-content-center"
          >
            <Card className="" style={{ width: "60ch" }}>
              <Card.Body>
                <Card.Title className="mb-3">
                  <GiNotebook className="mb-1" /> LogIn Form
                </Card.Title>
                <Card.Text as="div">
                  <FloatingLabel
                    className="mb-3"
                    controlId="floatingUsername"
                    label="Username"
                  >
                    <Field
                      id="floatingUsername"
                      name="username"
                      className="form-control"
                      placeholder="Username"
                    ></Field>
                    {errors.username && touched.username ? (
                      <p className="text-danger">{errors.username}</p>
                    ) : null}
                  </FloatingLabel>

                  <FloatingLabel
                    className="mb-5"
                    controlId="floatingPassword"
                    label="Password"
                  >
                    <Field
                      id="floatingPassword"
                      name="password"
                      className="form-control"
                      placeholder="Password"
                      type="password"
                    ></Field>
                    {errors.password && touched.password ? (
                      <p className="text-danger">{errors.password}</p>
                    ) : null}
                  </FloatingLabel>
                </Card.Text>
                <div className="row">
                  <Button type="submit" variant="primary">
                    <FiLogIn className="me-1" /> Login
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default LoginForm;
