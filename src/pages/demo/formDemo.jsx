import CustomForm, { FormItem, FormList, FormRenderComponent } from '@components/formElements';
import { Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
const mockData = Array.from({ length: 20 }).map((_, i) => ({
  key: i.toString(),
  title: `content${i + 1}`,
  description: `description of content${i + 1}`,
}));
const Operate = ({ formRef, name }) => {
  const formSchema = [
    {
      name: 'name',
      label: '角色名称',
      rules: [
        { required: true, whitespace: true, message: '角色名称不能为空' },
        { min: 2, max: 18, message: '角色名称长度在2到18个字符' },
      ],
      fieldProps: {
        componentType: 'input',
        placeholder: '请输入角色名称',
      },
    },
    {
      name: 'status',
      label: '角色状态',
      rules: [{ required: true, message: '角色状态不能为空' }],
      initialValue: '1',
      fieldProps: {
        componentType: 'radio',
        options: [
          { key: '1', value: '111' },
          { key: '2', value: '222' },
          { key: '3', value: '333', disabled: true },
        ],
        placeholder: '请选择角色状态',
      },
    },
    {
      className: 'formItem',
      name: 'description',
      label: '角色描述',
      fieldProps: {
        componentType: 'textArea',
        placeholder: '请输入角色描述',
        maxLength: 30,
      },
    },
    {
      name: 'elementStatus',
      label: '元素状态',
      initialValue: '1',
      fieldProps: {
        componentType: 'select',
        options: [
          { key: '1', value: '111' },
          { key: '2', value: '222' },
          { key: '3', value: '333', disabled: true },
        ],
        isTooltip: true,
        placeholder: '请选择元素状态',
      },
    },
    {
      name: 'associateUser',
      label: '穿梭框',
      // 因为Transfer组件默认不是表单字段，我们需要将其与Form.Item配合，并使用Form.Item的valuePropName和getValueProps等属性来适配，
      // Form就会将Transfer组件的targetKeys属性作为表单项的值，并且在Transfer的onChange事件触发时，用新的targetKeys更新表单的值
      valuePropName: 'targetKeys',
      rules: [{ required: true, message: '穿梭框不能为空' }],
      fieldProps: {
        componentType: 'transfer',
        titles: [
          <span key={1} style={{ color: '#1890ff' }}>
            未关联用户
          </span>,
          <span key={2} style={{ color: '#87d068' }}>
            已关联用户
          </span>,
        ],
        dataSource: mockData,
        rowKey: (record) => record.key,
        render: (item) => item.title,
        operations: ['关联用户', '解除关联'],
        pagination: true,
      },
    },
    {
      name: 'formListDemo',
      initialValue: [{ key: '', value: '' }],
      title: '字典数据',
      formList: [
        {
          className: 'formItem',
          name: 'key',
          label: 'key',
          rules: [
            { required: true, whitespace: true, message: 'key不能为空' },
            { max: 15, message: 'key长度不能超过15个字符' },
          ],
          fieldProps: {
            componentType: 'input',
            placeholder: '请输入字典key',
          },
        },
        {
          className: 'formItem',
          name: 'value',
          label: 'value',
          rules: [
            { required: true, whitespace: true, message: 'value不能为空' },
            { max: 15, message: 'value长度不能超过15个字符' },
          ],
          fieldProps: {
            componentType: 'input',
            placeholder: '请输入字典value',
          },
        },
      ],
    },
  ];

  return (
    <>
      <CustomForm name={name} ref={formRef}>
        {formSchema?.map((val) => {
          const { fieldProps, title, formList, ...restFiled } = val;
          if (formList && Array.isArray(formList)) {
            return (
              <FormList key={val.name} {...restFiled}>
                {(fields, { add, remove }) => (
                  <>
                    {/* <Divider orientation="left">{title}</Divider> */}
                    <FormItem label={title}>
                      {fields.map((field) => (
                        <Space style={{ width: '100%' }} key={field.key} align="baseline">
                          {formList?.map((item) => {
                            const { fieldProps, name, label, ...restFiled } = item;
                            return (
                              <FormItem
                                {...field}
                                {...restFiled}
                                style={{ width: 300 }}
                                label={`${label}${field.name + 1}`}
                                name={[field.name, name]}
                                key={[field.fieldKey, name]}
                              >
                                <FormRenderComponent {...fieldProps} />
                              </FormItem>
                            );
                          })}
                          {fields.length > 1 && (
                            <MinusCircleOutlined
                              style={{ fontSize: 18, marginLeft: 10, color: 'red' }}
                              onClick={() => remove(field.name)}
                            />
                          )}
                        </Space>
                      ))}
                      {fields.length < 11 && (
                        <FormItem style={{ marginLeft: 55, width: '100%' }}>
                          <Button
                            style={{ width: 350 }}
                            type="dashed"
                            onClick={() => add()}
                            block
                            icon={<PlusOutlined />}
                          >
                            添加字典数据
                          </Button>
                        </FormItem>
                      )}
                    </FormItem>
                  </>
                )}
              </FormList>
            );
          } else {
            return (
              <FormItem key={val.name} {...restFiled}>
                <FormRenderComponent {...fieldProps} />
              </FormItem>
            );
          }
        })}
      </CustomForm>
    </>
  );
};

export default Operate;
