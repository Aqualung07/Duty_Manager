import { Row, Col, Button } from "antd";
import { FileAddOutlined, DeleteOutlined } from "@ant-design/icons";

export default DutyListFooter = ({ removeDuties, addDuty, canDelete }) => {
  return (
    <Row gutter={[16, 16]} justify="end">
      <Col>
        <Button type="primary" onClick={addDuty} icon={<FileAddOutlined />}>
          Add Duty
        </Button>
      </Col>
      <Col>
        <Button
          type="primary"
          onClick={removeDuties}
          danger
          icon={<DeleteOutlined />}
          disabled={!canDelete}
        >
          Remove Duties
        </Button>
      </Col>
    </Row>
  );
};
