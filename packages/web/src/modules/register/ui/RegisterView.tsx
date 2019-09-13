import * as React from 'react';
import * as Antd from 'antd';
// import { Form, Icon, Input, Button } from 'antd';
import { withFormik, FormikErrors, FormikProps, Field, Form } from 'formik';
import { validUserSchema } from '@abb/common';
import { InputField } from '../../shared/InputField';

const { Form: AntdForm, Icon, Button } = Antd;
const FormItem = AntdForm.Item;

interface FormValues {
  email: string;
  password: string;
}

interface Props {
  submit: (values: FormValues) => Promise<FormikErrors<FormValues> | null>;
}

class C extends React.PureComponent<FormikProps<FormValues> & Props> {
  render() {
    const { handleSubmit } = this.props;
    return (
      <Form style={{ display: 'flex' }}>
        <div style={{ width: 400, margin: 'auto' }}>
          <Field
            name="email"
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Email"
            component={InputField}
          />
          <Field
            name="password"
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Password"
            component={InputField}
          />

          <FormItem>
            <FormItem>
              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
            </FormItem>
            <FormItem>
              Or <a href="">register now!</a>
            </FormItem>
          </FormItem>
        </div>
      </Form>
    );
  }
}

export const RegisterView = withFormik<Props, FormValues>({
  validationSchema: validUserSchema,
  // validateOnChange: false,
  mapPropsToValues: () => ({ email: '', password: '' }),
  handleSubmit: async (values, { props, setErrors }) => {
    const errors = await props.submit(values);
    if (errors) {
      setErrors(errors);
    }
  }
})(C);
