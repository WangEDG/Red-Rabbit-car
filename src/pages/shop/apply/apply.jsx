import React, { useState, useEffect } from 'react';
import { Breadcrumb, Table, Button, Space, Dropdown, Menu, Form, Input, Select, DatePicker, Popover } from "antd"
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Link } from 'umi';
import query  from '../../../utils/toqueryString';
import { getAuditData } from "../../../api/shop"
const { RangePicker } = DatePicker;
const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 3,
    span: 16,
  },
};

export default function charge() {

  useEffect(async () => {
    const str = query({pageSize:100})
    console.log(str)

    const res = await getAuditData({params:str})

    if (res) {
      setapplyList([...res.rows])
      setTotal(res.total)
    }
    console.log(res);
  }, [])

  const [form] = Form.useForm();
  const [status, setOpen] = useState(true)
  const onGenderChange = (value) => {
    console.log(value, 12123);
  };
  const onFinish = (values) => {
    console.log(values);
  };
  const onReset = () => {
    form.resetFields();
  };
  function open() {
    setOpen(!status)
  }

  // 店铺数据
  const [applyList, setapplyList] = useState([]);
  const [total, setTotal] = useState("");

  const setAgeSort = () => {

  }
  const clearFilters = () => {

  }
  const clearAll = () => {

  }
  const handleMenuClick = () => {

  }

  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
  };

  // button按钮更多操作
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">
        导出Excell
      </Menu.Item>
    </Menu>
  );
  // 表格标题
  const columns = [
    {
      title: '店铺名称',
      dataIndex: 'shopName',
      key: 'shopName',
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
      ellipsis: true
    },
    {
      title: '申请人姓名',
      dataIndex: 'managerName',
      key: 'managerName',
      width: 110
    },
    {
      title: '联系方式',
      dataIndex: 'tel',
      key: 'tel',
      width: 120
    },
    {
      title: '身份证号码',
      dataIndex: 'idCard',
      key: 'idCard',
      ellipsis: true
    },
    {
      title: '营业执照编号',
      dataIndex: 'licenceNo',
      key: 'licenceNo',
      ellipsis: true
    },
    {
      title: '营业执照照片',
      dataIndex: 'idCardImg',
      key: 'idCardImg',
      render: (idCardImg) => { return <img src={idCardImg} alt="" style={{ width: "40px", height: "40px" }} /> },
      align: "center",
    },
    {
      title: '审核状态',
      dataIndex: 'status',
      key: 'status',
      align: "center",
      width: 100
    },
    {
      title: '操作',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <>
          {status == "审核中" ?
            <>
              <Button size="small" type="primary">通过</Button>&nbsp;&nbsp;
              <Button size="small" danger>驳回</Button>
            </>
            : null}
        </>
      )
    },
  ];

  // 表格选中
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name,
    }),
  };


  return (
    <div>
      <Breadcrumb style={{ marginBottom: "20px" }}>
        <Breadcrumb.Item>
          <Link to="/home">主页</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>店铺管理</Breadcrumb.Item>
        <Breadcrumb.Item>商铺审核</Breadcrumb.Item>
      </Breadcrumb>

      {/* 搜索 */}
      <div style={{ marginBottom: "10PX" }}>
        <Form {...layout} form={form} layout="inline" name="control-hooks" onFinish={onFinish} >
          <Form.Item
            name="shopName"
            label="店铺名称："
            style={{ paddingLeft: 10 }}
          >
            <Input style={{ width: 180 }} />
          </Form.Item>
          <Form.Item
            name="tel"
            label="申请人姓名："
          >
            <Input style={{ width: 180 }} />
          </Form.Item>
          <Form.Item
            name="shopName"
            label="申请人身份证号："
          >
            <Input style={{ width: 220 }} />
          </Form.Item>



          <Form.Item {...tailLayout} style={{ width: 290 }} className="btn">
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button htmlType="button" onClick={onReset} style={{ margin: "0 10px" }}>
              重置
            </Button>
            <a onClick={open}>{status ? '展开' : '收起'}{status ? <DownOutlined /> : <UpOutlined />}</a>
          </Form.Item>
          {status ? null :
            <Form.Item
              name="shopName"
              label="审核状态："
              style={{ paddingLeft: 14,marginTop:15  }}
            >
              <Input style={{ width: 280 }} />
            </Form.Item>}
        </Form>
      </div>

      {/* 数据表格 */}
      <>
        <Space style={{ marginBottom: 10, marginTop: 10 }}>
          <Button onClick={setAgeSort}>新增</Button>
          <Button onClick={clearFilters}>删除</Button>
          <Dropdown overlay={menu}>
            <Button>
              更多操作 <DownOutlined />
            </Button>
          </Dropdown>
        </Space>
        <Table
          pagination={{
            defaultPageSize: 5,
            defaultCurrent: 1,
            showTotal: ()=>{return (`共计 ${applyList.length} 条数据`)},
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: [5, 10, 15, 20],
          }}
          columns={columns}
          dataSource={applyList}
          rowKey="id"
          onChange={handleChange}
          rowSelection={{ ...rowSelection }}
        />
      </>
    </div>
  );
}
