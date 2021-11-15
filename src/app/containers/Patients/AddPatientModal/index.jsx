import { Button, DatePicker, Form, Input, Modal, Select } from 'antd';
import './styles.scss';

export const AddPatientModal = ({ visible, onCancel, onOk }) => {
  const [form] = Form.useForm();

  const requiredRule = {
    required: true,
    message: 'Please input this field!',
  };

  const onFinish = (values) => {
    onOk(values);
    form.resetFields();
  };

  return (
    <Modal
      title="Add new patient"
      centered
      width={700}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          form="add-patient-form"
          key="submit"
          type="primary"
          htmlType="submit"
        >
          Add
        </Button>,
      ]}
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
    >
      <Form
        id="add-patient-form"
        layout="vertical"
        form={form}
        onFinish={onFinish}
        initialValues={{}}
      >
        <Form.Item name="name" label="Full Name" rules={[requiredRule]}>
          <Input />
        </Form.Item>
        <Form.Item name="gender" label="Gender" rules={[requiredRule]}>
          <Select>
            <Select.Option value="male">Male</Select.Option>
            <Select.Option value="female">Female</Select.Option>
            <Select.Option value="other">Other</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            requiredRule,
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="phone" label="Phone Number" rules={[requiredRule]}>
          <Input />
        </Form.Item>
        <Form.Item placeholder="" label="Date Of Birth" name="dob">
          <DatePicker showToday={false} className="w-full" />
        </Form.Item>
        <Form.Item label="Address" name="address">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddPatientModal;
