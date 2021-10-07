import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Button, Modal, message, Input, Form } from "antd"
import { DeleteOutlined, QuestionCircleOutlined } from "@ant-design/icons"
import axios from 'axios'

const { confirm } = Modal

export default function NewsCategory() {
    const [dataSource, setDataSource] = useState([])
    const EditableContext = React.createContext(null);
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            render: (id) => {
                return <div>{id}</div>
            }
        }, {
            title: '栏目名称',
            dataIndex: 'title',
            onCell: (record) => ({
                record,
                editable: true,
                dataIndex: 'title',
                title: '栏目名称',
                handleSave: handleSave,
              }),
        }, {
            title: '操作',
            render: (item) => {
                return <div>
                    <Button
                        danger
                        shape="circle"
                        icon={<DeleteOutlined />}
                        onClick={() => confirmMessage(item)}
                    />
                </div>
            }
        },
    ]
    // 可编辑单元格事件
    const handleSave =  (record) => {
        setDataSource(dataSource.map(item=>{
            if(item.id === record.id){
                return {
                    id: item.id,
                    title: record.title,
                    value: record.title
                }
            }
            return item
        }))
        axios.patch(`categories/${record.id}`,{
            title: record.title,
            value: record.title
        })
    }
    // 获取分类列表
    useEffect(() => {
        axios.get("/categories").then(res => {
            const dataList = res.data;
            setDataSource(dataList)
        })
    }, [])
    // 确认删除权限提示框
    const confirmMessage = (item) => {
        confirm({
            title: '删除',
            icon: <QuestionCircleOutlined />,
            content: '您确认要删除吗？',
            okText: "确认",
            cancelText: '取消',
            onOk() {
                deleteMethod(item)
            }
        })
    }
    // 删除
    const deleteMethod = (item) => {
        setDataSource(dataSource.filter(data => data.id !== item.id))
        axios.delete(`/categories/${item.id}`).then(res => {
            message.success('删除成功！')
        })
    }
    const EditableRow = ({ index, ...props }) => {
        const [form] = Form.useForm();
        return (
            <Form form={form} component={false}>
                <EditableContext.Provider value={form}>
                    <tr {...props} />
                </EditableContext.Provider>
            </Form>
        );
    };
    const EditableCell = ({
        title,
        editable,
        children,
        dataIndex,
        record,
        handleSave,
        ...restProps
    }) => {
        const [editing, setEditing] = useState(false);
        const inputRef = useRef(null);
        const form = useContext(EditableContext);
        useEffect(() => {
            if (editing) {
                inputRef.current.focus();
            }
        }, [editing]);

        const toggleEdit = () => {
            setEditing(!editing);
            form.setFieldsValue({
                [dataIndex]: record[dataIndex],
            });
        };

        const save = async () => {
            try {
                const values = await form.validateFields();
                toggleEdit();
                handleSave({ ...record, ...values });
            } catch (errInfo) {
                console.log('Save failed:', errInfo);
            }
        };

        let childNode = children;

        if (editable) {
            childNode = editing ? (
                <Form.Item
                    style={{
                        margin: 0,
                    }}
                    name={dataIndex}
                    rules={[
                        {
                            required: true,
                            message: `${title} is required.`,
                        },
                    ]}
                >
                    <Input ref={inputRef} onPressEnter={save} onBlur={save} />
                </Form.Item>
            ) : (
                <div
                    className="editable-cell-value-wrap"
                    style={{
                        paddingRight: 24,
                    }}
                    onClick={toggleEdit}
                >
                    {children}
                </div>
            );
        }

        return <td {...restProps}>{childNode}</td>;
    };

    return (
        <div>
            <Table
                pagination={{ pageSize: 5 }}
                dataSource={dataSource}
                columns={columns}
                rowKey={item => item.id}
                components={{
                    body: {
                        row: EditableRow,
                        cell: EditableCell,
                    }
                }}
            />
        </div>
    )
}
