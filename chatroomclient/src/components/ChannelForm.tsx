import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { MdModeEditOutline } from "react-icons/md";
import { GiNotebook } from "react-icons/gi";
import { GoDiffAdded } from "react-icons/go";

function ChannelForm({ initialValues, onSendMessage }: any) {
  const validationSchema = Yup.object().shape({
    channel: Yup.string()
      .min(4, "The Channel name is too short: 4 - 30 characters!")
      .max(30, "The Channel name is too long: 4 - 30 characters!")
      .required("The Channel name is required!")
      .matches(
        /^[A-Za-z0-9 ]+$/,
        "Channel name can only be alpha-numeric characters"
      )
      .trim(),
  });

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          onSendMessage(values);
          resetForm();
        }}
      >
        {({ errors, touched }: any) => (
          <Form
            style={{ height: "100ch" }}
            className="d-flex align-items-center justify-content-center"
          >
            <Card className="" style={{ width: "60ch" }}>
              <Card.Body>
                <Card.Title className="mb-3">
                  <GiNotebook className="mb-1" />
                  Channel Form
                </Card.Title>
                <Card.Text as="div">
                  <FloatingLabel
                    className="mb-3"
                    controlId="floatingChannel"
                    label="Channel"
                  >
                    <Field
                      id="floatingChannel"
                      name="channel"
                      className="form-control"
                      placeholder="Channel"
                    ></Field>
                    {errors.channel && touched.channel ? (
                      <p className="text-danger">{errors.channel}</p>
                    ) : null}
                  </FloatingLabel>
                </Card.Text>
                <div className="row">
                  <Button type="submit" variant="primary">
                    {initialValues.channel ? (
                      <>
                        <MdModeEditOutline className="mb-1" /> Edit Channel
                      </>
                    ) : (
                      <>
                        <GoDiffAdded className="mb-1" /> Add Channel
                      </>
                    )}
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

export default ChannelForm;
