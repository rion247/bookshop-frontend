import { Select } from "antd";
import FormItem from "antd/es/form/FormItem";
import { Controller } from "react-hook-form";

type BSSelectProps = {
  label?: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean }[] | undefined;
  disabled?: boolean;
  mode: "multiple" | undefined;
};

const BSSelect = ({ label, name, options, disabled, mode }: BSSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormItem label={label}>
          <Select
            style={{ width: "100%" }}
            {...field}
            options={options}
            mode={mode}
            disabled={disabled}
          />{" "}
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </FormItem>
      )}
    />
  );
};

export default BSSelect;
