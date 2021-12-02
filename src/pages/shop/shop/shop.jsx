import React, { useState, useEffect } from 'react';
import { Breadcrumb, Table, Button, Space, Dropdown, Menu, Form, Input, Select, DatePicker, Popover } from "antd"
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Link } from 'umi';
import { getFindAll } from "../../../api/shop"

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
    const res = await getFindAll()
    if (res) {
      setshopList([...res.rows])
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
  const content = (
    <div>
      <p>重置密码</p>
      <p>导出Excel</p>
    </div>
  );

  // 门店数据
  const [shopList, setshopList] = useState([]);

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
      title: '荣誉积分',
      dataIndex: 'prestige',
      key: 'prestige',
      ellipsis: true
    },
    {
      title: '店铺转态',
      dataIndex: 'status',
      key: 'status',
      // render: (status) => { return {status== 1?"上架":"下架"} },
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
  // 表格数据总条数
  function showTotal() {
    return `共计 ${setshopList.length} 条数据`;
  }

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
        <Breadcrumb.Item>门店管理</Breadcrumb.Item>
      </Breadcrumb>

      {/* 搜索 */}
      <div style={{ marginBottom: "10PX" }}>
        <Form {...layout} form={form} layout="inline" name="control-hooks" onFinish={onFinish} >
          <Form.Item
            name="shopName"
            label="名称："
            style={{ paddingLeft: 10 }}
          >
            <Input style={{ width: 220 }} />
          </Form.Item>
          <Form.Item
            name="tel"
            label="手机号："
            style={{ paddingLeft: 10 }}
          >
            <Input style={{ width: 220 }} />
          </Form.Item>
          <Form.Item
            name="shopName"
            label="负责人："
            style={{ paddingLeft: 10}}
          >
            <Input style={{ width: 220 }} />
          </Form.Item>



          <Form.Item {...tailLayout} style={{ width: 300 }} className="btn">
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
              label="身份证号码："
              style={{paddingLeft: 14,marginTop:15}}
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
          {/* <Button onClick={clearAll}>更多操作</Button> */}
        </Space>
        <Table
          pagination={{
            defaultPageSize: 5,
            defaultCurrent: 1,
            showTotal: showTotal,
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: [5, 10, 15, 20],
          }}
          columns={columns}
          dataSource={shopList}
          rowKey="id"
          onChange={handleChange}
          rowSelection={{ ...rowSelection }}
        />
      </>
    </div>
  );
}
