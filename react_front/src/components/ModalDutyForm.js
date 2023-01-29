import { Form, Input, Modal } from "antd";

export default ModalDutyForm = ({
  form,
  open,
  handleOk,
  confirmLoading,
  handleCancel,
  edit,
  currentIdList,
}) => {
  return (
    <Modal
      title="Add Duty"
      open={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      destroyOnClose={true}
    >
      <Form
        form={form}
        name="dutyForm"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 12,
        }}
        style={{
          maxWidth: 600,
        }}
        autoComplete="off"
      >
        <Form.Item
          label="ID"
          name="id"
          rules={[
            {
              required: true,
              message: "Every duty must contain an ID!",
            },
            {
              validator: (_, value) => {
                return new Promise((resolve, reject) => {
                  if (!value || value.length === 0) resolve();
                  if (currentIdList.indexOf(value) > -1 && !edit) {
                    reject("ID already exists.");
                  } else if (value?.length > 10) {
                    reject("ID must be 10 characters or less.");
                  } else if (!/^[a-zA-Z0-9-]+$/.test(value)) {
                    reject("ID must only contain alphanumeric characters.");
                  } else {
                    resolve();
                  }
                });
              },
            },
          ]}
        >
          <Input allowClear={true} disabled={edit} />
        </Form.Item>

        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Every duty must have a Name!",
            },
            {
              validator: (_, value) => {
                return new Promise((resolve, reject) => {
                  if (!value || value.length === 0) resolve();
                  if (value?.length > 15) {
                    reject("Name must be 15 characters or less.");
                  } else if (!/^[a-zA-Z0-9-]+$/.test(value)) {
                    reject("Name must only contain alphanumeric characters.");
                  } else {
                    resolve();
                  }
                });
              },
            },
          ]}
        >
          <Input allowClear={true} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
