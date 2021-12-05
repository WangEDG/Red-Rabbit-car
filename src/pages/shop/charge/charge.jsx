import React, { useState, useEffect,useMemo } from 'react';
import { Breadcrumb, Table, Button, Space, Dropdown, Menu, Form, Input, Select, DatePicker, Popover, message } from "antd"
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Link} from 'umi';
import { getCharge } from "../../../api/shop"

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
  useEffect(() => {
    getChargeDate(pageDate)
  }, [])

  const [form] = Form.useForm();
  const [status, setOpen] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const [total, setTotal] = useState("");
  const [pageDate, setPageDate] = useState({ pageNum: 1, pageSize: 10 });
  const [tableLoading,setTableLoading] = useState(false);
  // 电站数据
  const [chargeList, setchargeList] = useState([]);

  const onFinish = (values) => {
    console.log(values);
  };
  const onReset = () => {
    form.resetFields();
  };
  function open() {
    setOpen(!status)
  }

  let page = useMemo(() => {
    return pageDate
  },[pageDate])

  // 获取充电桩数据
  const getChargeDate = async (pageDate) => {
    setTableLoading(true);
    const res = await getCharge(pageDate)
    if (res) {
      setchargeList([...res.rows])
      setTotal(res.total)
      setTableLoading(false);
    }
    console.log(res);
  }
  // 后端翻页
  

  // 新增
  const setAgeSort = () => {
    message.error("请前往商家入驻进行添加！")
  }
  // 删除
  const clearFilters = async () => {
    if (selectedRows.length == 0) {
      message.error("请先选择要删除的数据！")
    } else {
      const res = await getChargeData()
      if (res) {
        setchargeList([...res.rows])
      }
      message.success("数据删除成功！")
    }
  }

  const handleMenuClick = () => {

  }

  // 表格翻页 
  const handleChange = (currentpage, pageSize) => {
    console.log(currentpage);
    console.log(pageSize);
    // setPageDate()
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
      title: '充电站名称',
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
      title: '负责人',
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
      filters: [
        {
          text: '审核中',
          value: '审核中',
        },
        {
          text: '通过',
          value: '通过',
        },
        {
          text: '拒绝',
          value: '拒绝',
        },
      ],
      filterMultiple: false,
      onFilter: (value, record) => record.status.includes(value),
      oktext: "确定",
      width: 110
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
      setSelectedRows([...selectedRows])
    },
  };


  return (
    <div>
      {/* 面包屑 */}
      <Breadcrumb style={{ marginBottom: "20px" }}>
        <Breadcrumb.Item>
          <Link to="/home">主页</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>店铺管理</Breadcrumb.Item>
        <Breadcrumb.Item>电站审核</Breadcrumb.Item>
      </Breadcrumb>

      {/* 搜索 */}
      <div style={{ marginBottom: "10PX" }}>
        <Form {...layout} form={form} layout="inline" name="control-hooks" onFinish={onFinish} >
          <Form.Item name="shopName" label="名称：" style={{ paddingLeft: 10 }}>
            <Input style={{ width: 220 }} />
          </Form.Item>

          <Form.Item name="tel" label="手机号：" style={{ paddingLeft: 10 }}>
            <Input style={{ width: 220 }} />
          </Form.Item>
          
          <Form.Item name="shopName" label="负责人：" style={{ paddingLeft: 10 }}>
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
              style={{ paddingLeft: 14, marginTop: 15 }}
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
            showTotal: ()=>{return (`共计 ${total} 条数据`)},
            total:total,
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: [5, 10, 15, 20],
            onChange:handleChange
          }}
          loading = {tableLoading}
          bordered= {true}
          scrollToFirstRowOnChange = {true}
          // scroll={{y: 300 }}
          columns={columns}
          dataSource={chargeList}
          rowKey="id"
          loading={chargeList ? false : true}
          rowSelection={{ ...rowSelection }}
        />
      </>
    </div>
  );
}
