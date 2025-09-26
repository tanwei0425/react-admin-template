/*
 * @Descripttion:
 * @Author: tanwei
 * @LastEditors: tanwei
 * @Date: 2020-02-15 16:22:42
 * @LastEditTime: 2020-05-21 09:22:55
 */
import Input from '@components/formElements/formRenderComponent/input';
import InputNumber from '@components/formElements/formRenderComponent/inputNumber';
import Select from '@components/formElements/formRenderComponent/select';
import Radio from '@components/formElements/formRenderComponent/radio';
import TreeSelect from '@components/formElements/formRenderComponent/treeSelect';
import Transfer from '@components/formElements/formRenderComponent/transfer';
import DatePicker from '@components/formElements/formRenderComponent/datePicker';
import Cascader from '@components/formElements/formRenderComponent/cascader';
import Upload from '@components/formElements/formRenderComponent/upload';
import SmsCode from '@components/formElements/formRenderComponent/smsCode';
const FormRenderComponent = ({ componentType, ...fieldProps }) => {
  switch (componentType) {
    case 'input':
      return <Input {...fieldProps} />;
    case 'password':
      return <Input.Password {...fieldProps} />;
    case 'textArea':
      return <Input.TextArea {...fieldProps} />;
    case 'inputSearch':
      return <Input.Search {...fieldProps} />;
    case 'inputGroup':
      return <Input.Group {...fieldProps} />;
    case 'inputNumber':
      return <InputNumber {...fieldProps} />;
    case 'smsCode':
      return <SmsCode {...fieldProps} />;
    case 'select':
      return <Select {...fieldProps} />;
    case 'treeSelect':
      return <TreeSelect {...fieldProps} />;
    case 'transfer':
      return <Transfer {...fieldProps} />;
    case 'radio':
      return <Radio {...fieldProps} />;
    case 'datePicker':
      return <DatePicker {...fieldProps} />;
    case 'rangePicker':
      return <DatePicker.RangePicker {...fieldProps} />;
    case 'cascader':
      return <Cascader {...fieldProps} />;
    case 'upload':
      return <Upload {...fieldProps} />;
    case 'dom':
      return fieldProps;
    default:
      return <span className="componentError">组件类型错误</span>;
  }
};
export default FormRenderComponent;
