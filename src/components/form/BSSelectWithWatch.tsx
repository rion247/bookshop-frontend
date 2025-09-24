import { Select } from "antd";
import FormItem from "antd/es/form/FormItem";
import React, { useEffect } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

type BSSelectProps = {
  label?: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean }[] | undefined;
  disabled?: boolean;
  onValueChange: React.Dispatch<React.SetStateAction<string>>;
  mode?: "multiple" | undefined;
};

const BSSelectWithWatch = ({
  label,
  name,
  options,
  disabled,
  mode,
  onValueChange,
}: BSSelectProps) => {
  const { control } = useFormContext();

  const inputValue = useWatch({ name, control });

  useEffect(() => {
    onValueChange(inputValue);
  }, [inputValue]);

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
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </FormItem>
      )}
    />
  );
};

export default BSSelectWithWatch;
