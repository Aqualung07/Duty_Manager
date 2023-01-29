// ** IMPORTS ** //

import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";

import Duty from "./Duty";
import ModalDutyForm from "./ModalDutyForm";
import DutyListFooter from "./DutyListFooter";
import { trimGQLDutiesTypeName } from "../utils";

import {
  CheckOutlined,
  EditOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import {
  Col,
  Row,
  Divider,
  List,
  Button,
  Form,
  notification,
  Modal,
  Spin,
} from "antd";

import {
  ADD_DUTY,
  REMOVE_DUTIES,
  UPDATE_DUTY,
  GET_DUTIES,
} from "../graphql/duty_queries";

// ** DUTY LIST FUNCTION COMPONENT ** //

const DutyList = () => {
  const title = "duties";

  // ** FORM API ** //

  const [form] = Form.useForm();

  // *** MODAL API *** //

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [dutyEditIndex, setDutyEditIndex] = useState(-1);

  const showDeleteConfirm = () => {
    Modal.confirm({
      title: `Delete Duties`,
      icon: <ExclamationCircleFilled />,
      content: `Are you sure you want to delete the selected items?
      This action can not be undone.`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        removeSelectedDuties();
      },
      onCancel: () => {
        return;
      },
    });
  };

  const openDutyModal = (duty) => {
    if (duty) {
      setDutyEditIndex(duties.indexOf(duty));
      form.setFieldValue("name", duty.name);
      form.setFieldValue("id", duty.id);
    }
    setOpen(true);
  };

  const saveDutyFormData = async () => {
    const newDuty = form.getFieldsValue();
    let dutyRequestData;

    const dutyRequestFn = dutyEditIndex > -1 ? updateDuty : addDuty;
    const dutyRequestName = dutyEditIndex > -1 ? "updateDuty" : "addDuty";
    setUpdatingList(true);

    try {
      dutyRequestData = (await dutyRequestFn({ variables: { duty: newDuty } }))
        .data;
      setDuties(trimGQLDutiesTypeName(dutyRequestData[dutyRequestName]));
    } catch (error) {
      showNotification({
        type: "error",
        title: "Connection error",
        content:
          "Error updating data. Server might be down or there is a problem with your internet connection.",
      });
    }

    setUpdatingList(false);
  };

  const isFormValid = async () => {
    let valid = true;
    await form.validateFields().catch((error) => {
      valid = false;
    });
    return valid;
  };

  const handleOk = async () => {
    if (!(await isFormValid())) return;
    setConfirmLoading(true);
    await saveDutyFormData();
    setOpen(false);
    setConfirmLoading(false);
    showNotification({
      type: "success",
      title: "Successful Update",
      content: "List values updated successfully",
    });
    resetForm();
  };

  const handleCancel = () => {
    resetForm();
    setOpen(false);
  };

  const resetForm = () => {
    form.resetFields();
    setDutyEditIndex(-1);
  };

  // *** NOTIFICATION API *** //

  const [notificationApi, contextHolder] = notification.useNotification();

  const showNotification = ({ type, title, content }) => {
    notificationApi[type]({
      message: title,
      description: content,
    });
  };

  // *** DUTIES LIST STATE *** //

  const [duties, setDuties] = useState([]);
  const [selectedDuties, setSelectedDuties] = useState([]);
  const [updatingList, setUpdatingList] = useState(false);

  const isSelected = (duty) => {
    return selectedDuties.indexOf(duty) > -1;
  };

  const removeSelectedDuties = async () => {
    if (selectedDuties.length === 0) return;
    setUpdatingList(true);
    try {
      const removeDutyData = (
        await removeDuties({ variables: { duties: selectedDuties } })
      ).data;
      setDuties(trimGQLDutiesTypeName(removeDutyData.removeDuties));
      showNotification({
        type: "success",
        title: "Successful Update",
        content: "List values updated successfully",
      });
    } catch (error) {
      showNotification({
        type: "error",
        title: "Connection error",
        content:
          "Error removing requested data. Server might be down or there is a problem with your internet connection.",
      });
    }
    setUpdatingList(false);
    setSelectedDuties([]);
  };

  const toggleSelectedDuty = (duty) => {
    if (selectedDuties.indexOf(duty) === -1) {
      return setSelectedDuties([...selectedDuties, duty]);
    }

    setSelectedDuties([
      ...selectedDuties.filter((_, index) => {
        return index !== selectedDuties.indexOf(duty);
      }),
    ]);
  };

  // *** APOLLO GRAPHQL API *** //

  const { loading, error, data, networkStatus } = useQuery(GET_DUTIES);
  const [addDuty] = useMutation(ADD_DUTY);
  const [removeDuties] = useMutation(REMOVE_DUTIES);
  const [updateDuty] = useMutation(UPDATE_DUTY);

  useEffect(() => {
    if (networkStatus === 8) {
      return showNotification({
        type: "error",
        title: "Connection error",
        content:
          "An error has ocurred when initially loading the data. Server might be down or there is a problem with your internet connection.",
      });
    }
    if (data?.getDuties) setDuties(trimGQLDutiesTypeName(data.getDuties));
  }, [data, networkStatus]);

  // *** RENDER FUNCTION *** //

  return (
    <>
      {contextHolder}
      <Row justify="center">
        <Col lg={20} xl={14} xxl={8} span={24}>
          {loading ? (
            <Spin size="large" />
          ) : (
            <>
              <Divider orientation="center">
                <h2>{title.toUpperCase()}</h2>
              </Divider>
              <List
                pagination={{
                  defaultPageSize: 5,
                  responsive: true,
                  total: duties.length,
                }}
                loading={updatingList}
                header={
                  <div>
                    <b>{`${title} list`.toUpperCase()}</b>
                  </div>
                }
                footer={
                  <DutyListFooter
                    removeDuties={showDeleteConfirm}
                    addDuty={() => openDutyModal(null)}
                    canDelete={selectedDuties.length > 0}
                  />
                }
                bordered
                dataSource={duties}
                renderItem={(duty) => (
                  <List.Item>
                    <Button
                      type="text"
                      onClick={() => toggleSelectedDuty(duty)}
                      style={{
                        width: "100%",
                        height: "auto",
                        marginRight: "16px",
                        backgroundColor: isSelected(duty) && "lightgrey",
                      }}
                    >
                      <Row justify="start" align="middle" gutter={[16, 16]}>
                        {isSelected(duty) ? (
                          <Col>
                            <CheckOutlined />
                          </Col>
                        ) : null}
                        <Col>
                          <Duty
                            dutyId={duty.id}
                            name={duty.name}
                            key={duty.id}
                          />
                        </Col>
                      </Row>
                    </Button>
                    <Button
                      icon={<EditOutlined />}
                      onClick={() => openDutyModal(duty)}
                    ></Button>
                  </List.Item>
                )}
              />
            </>
          )}
        </Col>
      </Row>
      <ModalDutyForm
        open={open}
        handleOk={handleOk}
        confirmLoading={confirmLoading}
        handleCancel={handleCancel}
        edit={dutyEditIndex > -1}
        form={form}
        currentIdList={duties.map((duty) => duty.id)}
      />
    </>
  );
};

export default DutyList;
