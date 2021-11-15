import { useState, useEffect } from 'react';
import { Button, Select, Modal, Input, Form, DatePicker, Row } from 'antd';
import { useHistory } from 'react-router-dom';
import './styles.scss';

export const AddPatientModal = ({
  visible,
  services,
  patients,
  initialPatient,
  onCancel,
  onOk,
}) => {
  const [total, setTotal] = useState(0);
  const [form] = Form.useForm();
  const history = useHistory();

  const requiredRule = {
    required: true,
    message: 'Please input this field!',
  };

  const onServicesChange = (ids) => {
    const total = ids
      .map((id) => {
        const currentService = services.find((service) => service.id === id);
        if (currentService) return currentService.price;
        return 0;
      })
      .reduce((acc, curr) => acc + curr, 0);

    setTotal(total);
  };

  const onFinish = (values) => {
    onOk({ ...values, total });
    form.resetFields();
  };

  const onChangePatient = (id) => {
    const patient = patients.find((item) => item.id === id);
    form.setFieldsValue({ ...patient });
  };

  useEffect(() => {
    if (initialPatient) {
      const patient = patients.find((item) => item.id === +initialPatient);
      form.setFieldsValue({ ...patient, patient: +initialPatient });

      return () =>
        history.replace({
          ...history.location,
          search: '',
        });
    }
  }, [form, history, initialPatient, patients]);

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
        <Form.Item name="patient" label="Patient" rules={[requiredRule]}>
          <Select
            className="w-full"
            showSearch
            optionFilterProp="children"
            onChange={onChangePatient}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {patients.length &&
              patients.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {`${item.name} ($${item.phone})`}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item name="name" label="Full Name">
          <Input disabled />
        </Form.Item>
        <Form.Item name="gender" label="Gender">
          <Select disabled>
            <Select.Option value="male">Male</Select.Option>
            <Select.Option value="female">Female</Select.Option>
            <Select.Option value="other">Other</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="email" label="E-mail">
          <Input disabled />
        </Form.Item>
        <Form.Item name="phone" label="Phone Number">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Date Of Birth" name="dob">
          <DatePicker
            placeholder=""
            showToday={false}
            className="w-full"
            disabled
          />
        </Form.Item>
        <Form.Item label="Address" name="address">
          <Input disabled />
        </Form.Item>
        <Form.Item name="illness" label="Illness" rules={[requiredRule]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="services" label="Services" rules={[requiredRule]}>
          <Select
            className="w-full"
            mode="multiple"
            allowClear
            onChange={onServicesChange}
          >
            {services.length &&
              services.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {`${item.name} ($${item.price})`}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Row justify="end">{`Total: $${total}`} </Row>
      </Form>
    </Modal>
  );
};

export default AddPatientModal;
