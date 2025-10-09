import { FormRenderComponent, FormItem } from '@components/formElements';

const FormGroupItem = ({ groupList }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      {groupList.map((item, itemIndex) => {
        const { name, fieldProps, ...restFiled } = item;
        return (
          <FormItem key={name || itemIndex} name={name} {...restFiled}>
            <FormRenderComponent {...fieldProps} />
          </FormItem>
        );
      })}
    </div>
  );
};

export default FormGroupItem;
