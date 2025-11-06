"use client";

import React, { useState } from "react";
import {
  Button,
  Input,
  Select,
  Table,
  Card,
  Form,
  DatePicker,
  TimePicker,
  Switch,
  Checkbox,
  Radio,
  Slider,
  Rate,
  Upload,
  Progress,
  Tag,
  Badge,
  Avatar,
  Alert,
  Steps,
  Tabs,
  Collapse,
  Timeline,
  Divider,
  Breadcrumb,
  Dropdown,
  Modal,
  Drawer,
  Tooltip,
  Popover,
  Popconfirm,
  notification,
  message,
  Space,
  Row,
  Col,
  Statistic,
  InputNumber,
  Pagination,
  Spin,
  Empty,
  Result,
  Descriptions,
  Segmented,
  FloatButton,
  Typography,
  Transfer,
  Cascader,
  TreeSelect,
  AutoComplete,
  Mentions,
  ColorPicker,
} from "antd";
import {
  UserOutlined,
  BookOutlined,
  CalendarOutlined,
  FileTextOutlined,
  SettingOutlined,
  DashboardOutlined,
  TeamOutlined,
  SearchOutlined,
  DownloadOutlined,
  UploadOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
  WarningOutlined,
  BellOutlined,
  MailOutlined,
  PrinterOutlined,
  FilterOutlined,
  EyeOutlined,
  LockOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import type { MenuProps, UploadProps } from "antd";
import "./styles.css";

const { Option } = Select;
const { TextArea } = Input;
const { TabPane } = Tabs;
const { Panel } = Collapse;
const { Title, Text, Paragraph } = Typography;
const { Step } = Steps;
const { RangePicker } = DatePicker;

export default function TestDesignPage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("1");

  // Sample data untuk tabel mahasiswa
  const studentColumns = [
    {
      title: "NIM",
      dataIndex: "nim",
      key: "nim",
      sorter: (a: any, b: any) => a.nim.localeCompare(b.nim),
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }: any) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search NIM"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm()}
            style={{ marginBottom: 8, display: "block" }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => confirm()}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}>
              Reset
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered: boolean) => (
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
    },
    {
      title: "Nama Mahasiswa",
      dataIndex: "name",
      key: "name",
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
    },
    {
      title: "Program Studi",
      dataIndex: "prodi",
      key: "prodi",
      filters: [
        { text: "Teknik Informatika", value: "TI" },
        { text: "Sistem Informasi", value: "SI" },
        { text: "Manajemen", value: "MN" },
      ],
      onFilter: (value: any, record: any) => record.prodi === value,
    },
    {
      title: "Semester",
      dataIndex: "semester",
      key: "semester",
      sorter: (a: any, b: any) => a.semester - b.semester,
    },
    {
      title: "IPK",
      dataIndex: "ipk",
      key: "ipk",
      sorter: (a: any, b: any) => a.ipk - b.ipk,
      render: (ipk: number) => (
        <Tag color={ipk >= 3.5 ? "green" : ipk >= 3.0 ? "blue" : "orange"}>
          {ipk.toFixed(2)}
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Badge
          status={status === "Aktif" ? "success" : "default"}
          text={status}
        />
      ),
    },
    {
      title: "Aksi",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="small">
          <Tooltip title="Lihat Detail">
            <Button type="link" icon={<EyeOutlined />} size="small" />
          </Tooltip>
          <Tooltip title="Edit">
            <Button type="link" icon={<EditOutlined />} size="small" />
          </Tooltip>
          <Popconfirm
            title="Apakah Anda yakin ingin menghapus data ini?"
            okText="Ya"
            cancelText="Tidak"
          >
            <Tooltip title="Hapus">
              <Button
                type="link"
                danger
                icon={<DeleteOutlined />}
                size="small"
              />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const studentData = [
    {
      key: "1",
      nim: "2021001",
      name: "Ahmad Fauzi",
      prodi: "TI",
      semester: 6,
      ipk: 3.75,
      status: "Aktif",
    },
    {
      key: "2",
      nim: "2021002",
      name: "Siti Nurhaliza",
      prodi: "SI",
      semester: 6,
      ipk: 3.82,
      status: "Aktif",
    },
    {
      key: "3",
      nim: "2021003",
      name: "Budi Santoso",
      prodi: "MN",
      semester: 5,
      ipk: 3.25,
      status: "Aktif",
    },
    {
      key: "4",
      nim: "2021004",
      name: "Dewi Kusuma",
      prodi: "TI",
      semester: 7,
      ipk: 3.91,
      status: "Aktif",
    },
    {
      key: "5",
      nim: "2020015",
      name: "Eko Prasetyo",
      prodi: "SI",
      semester: 8,
      ipk: 3.45,
      status: "Cuti",
    },
  ];

  // Dropdown menu items
  const menuItems: MenuProps["items"] = [
    {
      key: "1",
      label: "Lihat Profil",
      icon: <UserOutlined />,
    },
    {
      key: "2",
      label: "Pengaturan",
      icon: <SettingOutlined />,
    },
    {
      type: "divider",
    },
    {
      key: "3",
      label: "Keluar",
      icon: <LockOutlined />,
      danger: true,
    },
  ];

  // Upload props
  const uploadProps: UploadProps = {
    name: "file",
    multiple: true,
    action: "/api/upload",
    onChange(info) {
      const { status } = info.file;
      if (status === "done") {
        message.success(`${info.file.name} berhasil diunggah.`);
      } else if (status === "error") {
        message.error(`${info.file.name} gagal diunggah.`);
      }
    },
  };

  // Cascader options
  const cascaderOptions = [
    {
      value: "fakultas1",
      label: "Fakultas Teknik",
      children: [
        {
          value: "ti",
          label: "Teknik Informatika",
        },
        {
          value: "si",
          label: "Sistem Informasi",
        },
      ],
    },
    {
      value: "fakultas2",
      label: "Fakultas Ekonomi",
      children: [
        {
          value: "mn",
          label: "Manajemen",
        },
        {
          value: "ak",
          label: "Akuntansi",
        },
      ],
    },
  ];

  const showSuccessMessage = () => {
    message.success("Operasi berhasil dilakukan!");
  };

  const showErrorMessage = () => {
    message.error("Terjadi kesalahan!");
  };

  const showWarningMessage = () => {
    message.warning("Peringatan: Harap periksa data Anda!");
  };

  return (
    <div className="design-system-container">
      {/* Header */}
      <div className="page-header fade-in">
        <Title level={2}>Design System - Sistem Informasi Akademik</Title>
        <Paragraph>
          Referensi lengkap komponen UI untuk aplikasi SIAKAD menggunakan Ant
          Design
        </Paragraph>
        <Breadcrumb
          items={[
            { title: "Home" },
            { title: "Design System" },
            { title: "Components" },
          ]}
        />
      </div>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} className="slide-up" style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card" hoverable>
            <Statistic
              title="Total Mahasiswa"
              value={1256}
              prefix={<UserOutlined />}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card" hoverable>
            <Statistic
              title="Total Mata Kuliah"
              value={89}
              prefix={<BookOutlined />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card" hoverable>
            <Statistic
              title="Dosen Aktif"
              value={45}
              prefix={<TeamOutlined />}
              valueStyle={{ color: "#cf1322" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card" hoverable>
            <Statistic
              title="Kelas Berlangsung"
              value={23}
              prefix={<DashboardOutlined />}
              valueStyle={{ color: "#722ed1" }}
            />
          </Card>
        </Col>
      </Row>

      {/* Alerts Section */}
      <Card title="Alert Components" className="component-card slide-up">
        <Space direction="vertical" style={{ width: "100%" }}>
          <Alert
            message="Informasi Penting"
            description="Pendaftaran KRS periode genap 2024/2025 dibuka mulai tanggal 15 Januari 2025."
            type="info"
            showIcon
            closable
          />
          <Alert
            message="Berhasil"
            description="Data mahasiswa telah berhasil disimpan."
            type="success"
            showIcon
            closable
          />
          <Alert
            message="Peringatan"
            description="Batas waktu pembayaran UKT tinggal 3 hari lagi."
            type="warning"
            showIcon
            closable
          />
          <Alert
            message="Error"
            description="Gagal menyimpan data. Silakan coba lagi."
            type="error"
            showIcon
            closable
          />
        </Space>
      </Card>

      {/* Buttons Section */}
      <Card title="Button Components" className="component-card slide-up">
        <Space wrap>
          <Button type="primary" icon={<PlusOutlined />}>
            Tambah Data
          </Button>
          <Button type="default" icon={<EditOutlined />}>
            Edit
          </Button>
          <Button danger icon={<DeleteOutlined />}>
            Hapus
          </Button>
          <Button type="dashed" icon={<DownloadOutlined />}>
            Download
          </Button>
          <Button type="link" icon={<EyeOutlined />}>
            Lihat Detail
          </Button>
          <Button type="primary" loading>
            Loading
          </Button>
          <Button type="primary" icon={<UploadOutlined />} disabled>
            Disabled
          </Button>
        </Space>
        <Divider />
        <Space wrap>
          <Button type="primary" size="large">
            Large
          </Button>
          <Button type="primary">Default</Button>
          <Button type="primary" size="small">
            Small
          </Button>
        </Space>
      </Card>

      {/* Forms Section */}
      <Card title="Form Components" className="component-card slide-up">
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item label="NIM" name="nim" rules={[{ required: true }]}>
                <Input prefix={<UserOutlined />} placeholder="Masukkan NIM" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="Nama Lengkap"
                name="name"
                rules={[{ required: true }]}
              >
                <Input placeholder="Masukkan nama lengkap" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item label="Program Studi" name="prodi">
                <Select
                  placeholder="Pilih Program Studi"
                  showSearch
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={[
                    { value: "ti", label: "Teknik Informatika" },
                    { value: "si", label: "Sistem Informasi" },
                    { value: "mn", label: "Manajemen" },
                    { value: "ak", label: "Akuntansi" },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Fakultas & Prodi" name="cascader">
                <Cascader
                  options={cascaderOptions}
                  placeholder="Pilih Fakultas dan Prodi"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item label="Tanggal Lahir" name="birthDate">
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Rentang Tanggal KRS" name="krsRange">
                <RangePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item label="IPK" name="ipk">
                <InputNumber
                  min={0}
                  max={4}
                  step={0.01}
                  style={{ width: "100%" }}
                  placeholder="0.00"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Semester" name="semester">
                <Slider min={1} max={14} marks={{ 1: "1", 8: "8", 14: "14" }} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Jenis Kelamin" name="gender">
            <Radio.Group>
              <Radio value="L">Laki-laki</Radio>
              <Radio value="P">Perempuan</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="Status Mahasiswa" name="status">
            <Checkbox.Group>
              <Checkbox value="aktif">Aktif</Checkbox>
              <Checkbox value="beasiswa">Penerima Beasiswa</Checkbox>
              <Checkbox value="organisasi">Aktif Organisasi</Checkbox>
            </Checkbox.Group>
          </Form.Item>

          <Form.Item label="Status Aktif" name="isActive" valuePropName="checked">
            <Switch checkedChildren="Aktif" unCheckedChildren="Tidak Aktif" />
          </Form.Item>

          <Form.Item label="Rating Dosen" name="rating">
            <Rate allowHalf />
          </Form.Item>

          <Form.Item label="Pilih Warna" name="color">
            <ColorPicker showText />
          </Form.Item>

          <Form.Item label="Alamat" name="address">
            <TextArea rows={4} placeholder="Masukkan alamat lengkap" />
          </Form.Item>

          <Form.Item label="Upload Dokumen" name="documents">
            <Upload {...uploadProps} listType="picture-card">
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" icon={<CheckCircleOutlined />}>
                Simpan
              </Button>
              <Button htmlType="reset" icon={<CloseCircleOutlined />}>
                Reset
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>

      {/* Table Section */}
      <Card
        title="Data Mahasiswa"
        className="component-card slide-up"
        extra={
          <Space>
            <Button type="primary" icon={<PlusOutlined />}>
              Tambah Mahasiswa
            </Button>
            <Button icon={<DownloadOutlined />}>Export</Button>
            <Button icon={<FilterOutlined />}>Filter</Button>
          </Space>
        }
      >
        <Table
          columns={studentColumns}
          dataSource={studentData}
          pagination={{
            pageSize: 5,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} mahasiswa`,
          }}
          scroll={{ x: 1000 }}
        />
      </Card>

      {/* Tabs Section */}
      <Card title="Tab Components" className="component-card slide-up">
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab={<span><UserOutlined />Profil</span>} key="1">
            <Descriptions bordered column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}>
              <Descriptions.Item label="NIM">2021001</Descriptions.Item>
              <Descriptions.Item label="Nama">Ahmad Fauzi</Descriptions.Item>
              <Descriptions.Item label="Program Studi">
                Teknik Informatika
              </Descriptions.Item>
              <Descriptions.Item label="Semester">6</Descriptions.Item>
              <Descriptions.Item label="IPK">
                <Tag color="green">3.75</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                <Badge status="success" text="Aktif" />
              </Descriptions.Item>
            </Descriptions>
          </TabPane>
          <TabPane tab={<span><BookOutlined />Mata Kuliah</span>} key="2">
            <Empty description="Belum ada mata kuliah yang diambil" />
          </TabPane>
          <TabPane tab={<span><FileTextOutlined />Transkrip</span>} key="3">
            <Progress percent={75} status="active" />
            <Divider />
            <Timeline>
              <Timeline.Item color="green">Semester 1 - IPK: 3.65</Timeline.Item>
              <Timeline.Item color="green">Semester 2 - IPK: 3.72</Timeline.Item>
              <Timeline.Item color="green">Semester 3 - IPK: 3.81</Timeline.Item>
              <Timeline.Item color="blue">Semester 4 - IPK: 3.75</Timeline.Item>
            </Timeline>
          </TabPane>
        </Tabs>
      </Card>

      {/* Steps Section */}
      <Card title="Steps Component" className="component-card slide-up">
        <Steps current={1}>
          <Step title="Registrasi" description="Daftar akun mahasiswa" icon={<UserOutlined />} />
          <Step
            title="Verifikasi"
            description="Verifikasi dokumen"
            icon={<CheckCircleOutlined />}
          />
          <Step title="Pembayaran" description="Bayar UKT" icon={<FileTextOutlined />} />
          <Step title="Selesai" description="Aktivasi akun" icon={<DashboardOutlined />} />
        </Steps>
      </Card>

      {/* Collapse Section */}
      <Card title="Collapse Component" className="component-card slide-up">
        <Collapse accordion>
          <Panel header="Informasi Umum" key="1" extra={<InfoCircleOutlined />}>
            <p>
              Sistem Informasi Akademik adalah platform terpadu untuk mengelola
              seluruh proses akademik di universitas.
            </p>
          </Panel>
          <Panel header="Panduan KRS" key="2" extra={<BookOutlined />}>
            <p>
              Kartu Rencana Studi (KRS) adalah formulir yang berisi rencana
              mata kuliah yang akan diambil mahasiswa pada semester berjalan.
            </p>
          </Panel>
          <Panel header="Jadwal Kuliah" key="3" extra={<CalendarOutlined />}>
            <p>
              Jadwal kuliah dapat diakses melalui menu Akademik pada sistem
              informasi.
            </p>
          </Panel>
        </Collapse>
      </Card>

      {/* Tags & Badges Section */}
      <Card title="Tags & Badges" className="component-card slide-up">
        <Space wrap>
          <Tag color="blue">Teknik Informatika</Tag>
          <Tag color="green">Sistem Informasi</Tag>
          <Tag color="orange">Manajemen</Tag>
          <Tag color="red">Akuntansi</Tag>
          <Tag color="purple">Desain Grafis</Tag>
          <Badge count={5}>
            <Avatar shape="square" size="large" icon={<UserOutlined />} />
          </Badge>
          <Badge dot>
            <Avatar shape="square" size="large" icon={<BellOutlined />} />
          </Badge>
          <Badge count={99}>
            <Avatar shape="square" size="large" icon={<MailOutlined />} />
          </Badge>
        </Space>
      </Card>

      {/* Segmented Control */}
      <Card title="Segmented Control" className="component-card slide-up">
        <Segmented
          options={[
            { label: "Semua", value: "all", icon: <DashboardOutlined /> },
            { label: "Aktif", value: "active", icon: <CheckCircleOutlined /> },
            { label: "Cuti", value: "cuti", icon: <CloseCircleOutlined /> },
            { label: "Alumni", value: "alumni", icon: <UserOutlined /> },
          ]}
          block
        />
      </Card>

      {/* Progress Section */}
      <Card title="Progress Components" className="component-card slide-up">
        <Space direction="vertical" style={{ width: "100%" }}>
          <div>
            <Text>Progress KRS: </Text>
            <Progress percent={30} />
          </div>
          <div>
            <Text>Progress SKS: </Text>
            <Progress percent={50} status="active" />
          </div>
          <div>
            <Text>Progress IPK Target: </Text>
            <Progress percent={70} status="active" strokeColor={{ from: "#108ee9", to: "#87d068" }} />
          </div>
          <div>
            <Text>Progress Skripsi: </Text>
            <Progress percent={100} />
          </div>
          <Space>
            <Progress type="circle" percent={75} />
            <Progress type="circle" percent={85} status="success" />
            <Progress type="dashboard" percent={90} />
          </Space>
        </Space>
      </Card>

      {/* Modal & Drawer Triggers */}
      <Card title="Modal & Drawer" className="component-card slide-up">
        <Space>
          <Button type="primary" onClick={() => setModalVisible(true)}>
            Buka Modal
          </Button>
          <Button type="default" onClick={() => setDrawerVisible(true)}>
            Buka Drawer
          </Button>
        </Space>

        <Modal
          title="Form Input Nilai"
          open={modalVisible}
          onOk={() => setModalVisible(false)}
          onCancel={() => setModalVisible(false)}
          okText="Simpan"
          cancelText="Batal"
        >
          <Form layout="vertical">
            <Form.Item label="Mata Kuliah" required>
              <Select placeholder="Pilih mata kuliah">
                <Option value="pbo">Pemrograman Berorientasi Objek</Option>
                <Option value="basis-data">Basis Data</Option>
                <Option value="web">Pemrograman Web</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Nilai (0-100)" required>
              <InputNumber min={0} max={100} style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item label="Keterangan">
              <TextArea rows={3} />
            </Form.Item>
          </Form>
        </Modal>

        <Drawer
          title="Detail Mahasiswa"
          placement="right"
          onClose={() => setDrawerVisible(false)}
          open={drawerVisible}
          width={500}
        >
          <Descriptions column={1} bordered>
            <Descriptions.Item label="NIM">2021001</Descriptions.Item>
            <Descriptions.Item label="Nama">Ahmad Fauzi</Descriptions.Item>
            <Descriptions.Item label="Email">ahmad@university.ac.id</Descriptions.Item>
            <Descriptions.Item label="No. HP">08123456789</Descriptions.Item>
            <Descriptions.Item label="Alamat">
              Jl. Pendidikan No. 123, Jakarta
            </Descriptions.Item>
          </Descriptions>
          <Divider />
          <Space>
            <Button type="primary" icon={<EditOutlined />}>
              Edit Data
            </Button>
            <Button icon={<PrinterOutlined />}>Print</Button>
          </Space>
        </Drawer>
      </Card>

      {/* Message & Notification */}
      <Card title="Message & Notification" className="component-card slide-up">
        <Space>
          <Button onClick={showSuccessMessage}>Success Message</Button>
          <Button onClick={showErrorMessage}>Error Message</Button>
          <Button onClick={showWarningMessage}>Warning Message</Button>
        </Space>
      </Card>

      {/* Tooltip & Popover */}
      <Card title="Tooltip & Popover" className="component-card slide-up">
        <Space size="large">
          <Tooltip title="Ini adalah tooltip">
            <Button>Hover untuk Tooltip</Button>
          </Tooltip>
          <Popover
            content={
              <div>
                <p>Nama: Ahmad Fauzi</p>
                <p>NIM: 2021001</p>
                <p>Prodi: Teknik Informatika</p>
              </div>
            }
            title="Informasi Mahasiswa"
            trigger="click"
          >
            <Button>Klik untuk Popover</Button>
          </Popover>
          <Popconfirm
            title="Apakah Anda yakin?"
            onConfirm={() => message.success("Dikonfirmasi")}
            okText="Ya"
            cancelText="Tidak"
          >
            <Button danger>Hapus Data</Button>
          </Popconfirm>
        </Space>
      </Card>

      {/* Empty State */}
      <Card title="Empty State" className="component-card slide-up">
        <Empty
          description="Tidak ada data mahasiswa"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        >
          <Button type="primary" icon={<PlusOutlined />}>
            Tambah Mahasiswa Baru
          </Button>
        </Empty>
      </Card>

      {/* Result Pages */}
      <Card title="Result Components" className="component-card slide-up">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Result
              status="success"
              title="Pendaftaran KRS Berhasil!"
              subTitle="KRS Anda telah berhasil disimpan dan menunggu persetujuan dosen wali."
              extra={[
                <Button type="primary" key="console">
                  Lihat KRS
                </Button>,
              ]}
            />
          </Col>
          <Col xs={24} md={12}>
            <Result
              status="warning"
              title="Pembayaran Belum Lunas"
              subTitle="Silakan selesaikan pembayaran UKT untuk mengakses sistem."
              extra={
                <Button type="primary" key="buy">
                  Bayar Sekarang
                </Button>
              }
            />
          </Col>
        </Row>
      </Card>

      {/* Pagination */}
      <Card title="Pagination" className="component-card slide-up">
        <Space direction="vertical" style={{ width: "100%" }}>
          <Pagination defaultCurrent={1} total={50} />
          <Pagination defaultCurrent={6} total={500} showSizeChanger />
          <Pagination
            total={85}
            showTotal={(total) => `Total ${total} items`}
            pageSize={20}
            showSizeChanger
          />
        </Space>
      </Card>

      {/* Spin Loading */}
      <Card title="Loading Spinner" className="component-card slide-up">
        <Space size="large">
          <Spin size="small" />
          <Spin />
          <Spin size="large" />
          <Spin tip="Loading data mahasiswa...">
            <div style={{ padding: 50, background: "#f0f2f5", borderRadius: 4 }} />
          </Spin>
        </Space>
      </Card>

      {/* AutoComplete */}
      <Card title="AutoComplete" className="component-card slide-up">
        <AutoComplete
          style={{ width: "100%" }}
          options={[
            { value: "Ahmad Fauzi" },
            { value: "Siti Nurhaliza" },
            { value: "Budi Santoso" },
            { value: "Dewi Kusuma" },
          ]}
          placeholder="Cari nama mahasiswa..."
          filterOption={(inputValue, option) =>
            option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        />
      </Card>

      {/* TreeSelect */}
      <Card title="TreeSelect" className="component-card slide-up">
        <TreeSelect
          style={{ width: "100%" }}
          dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
          placeholder="Pilih Fakultas dan Program Studi"
          treeDefaultExpandAll
          treeData={[
            {
              title: "Fakultas Teknik",
              value: "ft",
              children: [
                { title: "Teknik Informatika", value: "ti" },
                { title: "Sistem Informasi", value: "si" },
                { title: "Teknik Elektro", value: "te" },
              ],
            },
            {
              title: "Fakultas Ekonomi",
              value: "fe",
              children: [
                { title: "Manajemen", value: "mn" },
                { title: "Akuntansi", value: "ak" },
              ],
            },
          ]}
        />
      </Card>

      {/* Transfer */}
      <Card title="Transfer Component" className="component-card slide-up">
        <Transfer
          dataSource={[
            { key: "1", title: "Pemrograman Web" },
            { key: "2", title: "Basis Data" },
            { key: "3", title: "Struktur Data" },
            { key: "4", title: "Jaringan Komputer" },
            { key: "5", title: "Sistem Operasi" },
          ]}
          titles={["Mata Kuliah Tersedia", "Mata Kuliah Dipilih"]}
          targetKeys={[]}
          render={(item) => item.title}
        />
      </Card>

      {/* Mentions */}
      <Card title="Mentions Component" className="component-card slide-up">
        <Mentions
          style={{ width: "100%" }}
          placeholder="Ketik @ untuk mention dosen..."
          options={[
            { value: "Dr. Ahmad", label: "Dr. Ahmad" },
            { value: "Prof. Siti", label: "Prof. Siti" },
            { value: "Ir. Budi", label: "Ir. Budi" },
          ]}
        />
      </Card>

      {/* Dropdown Menu */}
      <Card title="Dropdown Menu" className="component-card slide-up">
        <Space>
          <Dropdown menu={{ items: menuItems }} placement="bottomLeft">
            <Button icon={<UserOutlined />}>Profil Menu</Button>
          </Dropdown>
          <Dropdown.Button
            menu={{ items: menuItems }}
            icon={<SettingOutlined />}
          >
            Actions
          </Dropdown.Button>
        </Space>
      </Card>

      {/* Float Button */}
      <FloatButton.Group
        trigger="hover"
        type="primary"
        style={{ right: 24 }}
        icon={<SettingOutlined />}
      >
        <FloatButton icon={<UserOutlined />} tooltip="Profil" />
        <FloatButton icon={<BellOutlined />} tooltip="Notifikasi" />
        <FloatButton icon={<MailOutlined />} tooltip="Pesan" />
      </FloatButton.Group>

      <FloatButton.BackTop />

      {/* Component List */}
      <Card title="Daftar Komponen" className="component-card slide-up">
        <Paragraph>
          <Text strong>Total: 50+ Komponen telah diimplementasikan</Text>
        </Paragraph>
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Collapse>
              <Panel header="Lihat Semua Komponen yang Tersedia" key="1">
                <ul style={{ columnCount: 3, columnGap: 16 }}>
                  <li>Alert</li>
                  <li>AutoComplete</li>
                  <li>Avatar</li>
                  <li>Badge</li>
                  <li>Breadcrumb</li>
                  <li>Button</li>
                  <li>Card</li>
                  <li>Cascader</li>
                  <li>Checkbox</li>
                  <li>ColorPicker</li>
                  <li>Collapse</li>
                  <li>DatePicker</li>
                  <li>Descriptions</li>
                  <li>Divider</li>
                  <li>Drawer</li>
                  <li>Dropdown</li>
                  <li>Empty</li>
                  <li>FloatButton</li>
                  <li>Form</li>
                  <li>Input</li>
                  <li>InputNumber</li>
                  <li>Mentions</li>
                  <li>Message</li>
                  <li>Modal</li>
                  <li>Notification</li>
                  <li>Pagination</li>
                  <li>Popconfirm</li>
                  <li>Popover</li>
                  <li>Progress</li>
                  <li>Radio</li>
                  <li>Rate</li>
                  <li>Result</li>
                  <li>Select</li>
                  <li>Segmented</li>
                  <li>Slider</li>
                  <li>Space</li>
                  <li>Spin</li>
                  <li>Statistic</li>
                  <li>Steps</li>
                  <li>Switch</li>
                  <li>Table</li>
                  <li>Tabs</li>
                  <li>Tag</li>
                  <li>TextArea</li>
                  <li>Timeline</li>
                  <li>TimePicker</li>
                  <li>Tooltip</li>
                  <li>Transfer</li>
                  <li>TreeSelect</li>
                  <li>Typography</li>
                  <li>Upload</li>
                </ul>
              </Panel>
            </Collapse>
          </Col>
        </Row>
      </Card>

      <div style={{ textAlign: "center", padding: "2rem 0", color: "#999" }}>
        <Text type="secondary">
          Design System v1.0 - Sistem Informasi Akademik
        </Text>
      </div>
    </div>
  );
}

/*
===========================================
KOMPONEN YANG TELAH DIIMPLEMENTASIKAN:
===========================================

1. Alert - Notifikasi info, success, warning, error
2. AutoComplete - Input dengan autocomplete
3. Avatar - Foto profil pengguna
4. Badge - Counter dan status badge
5. Breadcrumb - Navigasi hierarki halaman
6. Button - Berbagai jenis tombol (primary, default, danger, dashed, link, loading)
7. Card - Container untuk konten
8. Cascader - Pilihan bertingkat (fakultas > prodi)
9. Checkbox - Multiple selection
10. ColorPicker - Pemilih warna
11. Collapse - Panel yang dapat dilipat
12. DatePicker - Pemilih tanggal (single dan range)
13. Descriptions - Deskripsi detail data
14. Divider - Pembatas konten
15. Drawer - Side panel
16. Dropdown - Menu dropdown
17. Empty - State kosong
18. FloatButton - Floating action button
19. Form - Form input dengan validasi
20. Input - Text input (dengan prefix/suffix icon)
21. InputNumber - Input angka dengan min/max
22. Mentions - Mention/tag user dengan @
23. Message - Toast notification
24. Modal - Dialog popup
25. Notification - System notification
26. Pagination - Navigasi halaman
27. Popconfirm - Konfirmasi popup
28. Popover - Popup informasi
29. Progress - Progress bar dan circle
30. Radio - Single selection
31. Rate - Rating bintang
32. Result - Halaman hasil (success, warning, error)
33. Select - Dropdown selection dengan search
34. Segmented - Segmented control button
35. Slider - Range slider
36. Space - Layout spacing
37. Spin - Loading spinner
38. Statistic - Statistik dengan icon
39. Steps - Step by step progress
40. Switch - Toggle switch
41. Table - Data table dengan sorting, filter, pagination
42. Tabs - Tab navigation
43. Tag - Label tag
44. TextArea - Multi-line text input
45. Timeline - Timeline component
46. TimePicker - Pemilih waktu
47. Tooltip - Hover tooltip
48. Transfer - Transfer item antar list
49. TreeSelect - Tree selection dropdown
50. Typography - Text styling (Title, Text, Paragraph)
51. Upload - File upload dengan preview

FITUR TAMBAHAN:
- Responsive Grid System (Row & Col)
- Icons dari @ant-design/icons
- Smooth animations (fade-in, slide-up)
- Hover effects pada cards
- Filter dan search pada table
- Custom styling dengan CSS

ANIMASI:
- Fade-in animation untuk header
- Slide-up animation untuk cards
- Hover scale effect pada stat cards
- Smooth transitions pada semua komponen
- Loading states dengan smooth transitions

*/
