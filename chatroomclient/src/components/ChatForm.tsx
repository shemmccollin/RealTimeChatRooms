import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import InputGroup from "react-bootstrap/InputGroup";
import { useState } from "react";
import { AiOutlineSend } from "react-icons/ai";

function ChatForm({ message, onSendMessage }: any) {
  const [chars, setChars] = useState(0);

  const initialValue = {
    message: message.message,
  };

  const validationSchema = Yup.object().shape({
    message: Yup.string().min(1).max(100).required().trim(),
  });

  return (
    <>
      <Formik
        initialValues={initialValue}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={async (values, { resetForm }) => {
          console.log(values);
          onSendMessage(values.message);
          resetForm();
          setChars(0);
        }}
      >
        {({ errors, touched, handleChange }) => (
          <Form className="">
            <InputGroup className="mb-3">
              <FloatingLabel
                className=""
                controlId="floatingMessage"
                label="Message"
              >
                <Field
                  id="floatingMessage"
                  name="message"
                  className="form-control"
                  placeholder="Message"
                  onChange={(e: any) => {
                    setChars(e.target.value.length);
                    handleChange(e);
                  }}
                ></Field>
              </FloatingLabel>

              <Button type="submit" variant="success">
                Send
                <AiOutlineSend className="ms-1" />
              </Button>
            </InputGroup>
          </Form>
        )}
      </Formik>
      <i>Character limit: [{chars}/100]</i>
    </>
  );
}

export default ChatForm;
