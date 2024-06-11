import { useState } from 'react';
import type { FieldData } from 'rc-field-form/lib/interface';
import {
  Col,
  Row,
  ColorPicker,
  InputNumber,
  Form,
} from 'antd';
import './index.css';

const rules = [
  {
    required: true,
    message: 'Field is required!',
  },
]

const App = () => {
  const unit = 'px';
  const [fields, setFields] = useState<FieldData[]>([
    {
      name: ['color'],
      value: '#1677ff',
    },
    {
      name: ['font-size'],
      value: 16,
    },
    {
      name: ['padding'],
      value: 8,
    },
  ]);

  console.log(fields);

  const handleFormatter = (value: number|undefined) => `${value}${unit}`;
  const handleParser = (value: string|undefined) => {
    if (!value) {
      return 0;
    }

    return Number(value.replace(unit, ''))
  };

  return (
    <Row>
      <Col span={24} lg={8}>
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 15 }}
          name="generator_params"
          fields={fields}
          onFieldsChange={(_, allFields) => {
            setFields(allFields);
          }}
        >
          <Form.Item
            name="color"
            label="Color"
            rules={rules}
          >
            <ColorPicker disabledAlpha />
          </Form.Item>
          <Form.Item
            name="font-size"
            label="Font-size"
            rules={rules}
          >
            <InputNumber
              className="item-input"
              min={4}
              max={90}
              formatter={handleFormatter}
              parser={handleParser}
            />
          </Form.Item>
          <Form.Item
            name="padding"
            label="Padding"
            rules={rules}
          >
            <InputNumber
              className="item-input"
              min={0}
              max={50}
              formatter={handleFormatter}
              parser={handleParser}
            />
          </Form.Item>
        </Form>
      </Col>
      <Col span={24} lg={8}>
        Canvas
      </Col>
      <Col span={24} lg={8}>
        Export
      </Col>
    </Row>
  );
}

export default App;
