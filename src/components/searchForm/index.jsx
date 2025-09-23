/**
 * searchForm
 */
import { useState, useRef } from 'react';
import { Space } from 'antd';
import CustomForm, { FormItem, FormRenderComponent } from '@components/FormElements';
import AuthButton from '@components/authButton';
import { useStyle } from './useStyle';
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const SearchForm = ({ formSchema = [], collapseNum = 2, moreActionDom, formConfig, loading, reset }) => {
  const { styles, cx } = useStyle();
  const [expand, setExpand] = useState(true);
  const { className, ref, ...restProps } = formConfig;
  const initSearchFormRef = useRef();
  const searchFormRef = ref || initSearchFormRef;
  const trigger = collapseNum && Array.isArray(formSchema) && formSchema.length > collapseNum;
  if (trigger) {
    formSchema?.forEach((val, index) => {
      if (index + 1 > collapseNum) {
        const extraStyle = expand ? 'none' : 'block';
        val.style = val.style ? { ...val.style, display: extraStyle } : { display: extraStyle };
      }
    });
  }

  const handleReset = () => {
    searchFormRef.current.resetFields();
    reset && reset();
  };
  
  return (
    <CustomForm
      name="searchFormName"
      layout={'inline'}
      ref={searchFormRef}
      {...formItemLayout}
      {...restProps}
      className={cx(styles.searchForm, className)}
    >
      {formSchema?.map((val) => {
        const { fieldProps, hideField, className: classNameItem, ...restFiled } = val;
        return (
          !hideField && (
            <FormItem key={val?.name} className={cx(styles.serachFormItem, classNameItem)} {...restFiled}>
              <FormRenderComponent {...fieldProps} />
            </FormItem>
          )
        );
      })}
      <FormItem className={styles.searchFormBut}>
        <Space>
          <AuthButton loading={loading} type="primary" htmlType="submit">
            查询
          </AuthButton>
          <AuthButton onClick={handleReset}>重置</AuthButton>
          {moreActionDom}
          {trigger ? (
            <AuthButton
              type="link"
              onClick={() => {
                setExpand(!expand);
              }}
            >
              {expand ? '更多查询' : '收起'}
            </AuthButton>
          ) : null}
        </Space>
      </FormItem>
    </CustomForm>
  );
};

export default SearchForm;
