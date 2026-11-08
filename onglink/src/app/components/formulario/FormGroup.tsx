'use client';
import React from 'react';
import FormInput, { MaskType } from "@/app/components/formulario/FormInput";

export interface FieldConfig {
  name: string;
  label: string;
  placeholder?: string;
  width?: string; // largura flexível (ex: "w-1/3", "flex-1", "w-1/2")
  readonly?: boolean;
  mask?: MaskType;
  maxLength?: number;
}

interface FormGroupProps {
  formik: any;
  fields: FieldConfig[];
}

const FormGroup: React.FC<FormGroupProps> = ({ formik, fields }) => {
  return (
    <div className="w-full flex gap-2">
      {fields.map((field, index) => (
        <div key={index} className={field.width ?? "flex-1"}>
          <FormInput
            formik={formik}
            name={field.name}
            label={field.label}
            placeholder={field.placeholder}
            readonly={field.readonly}
            mask={field.mask}
            maxLength={field.maxLength}
          />
        </div>
      ))}
    </div>
  );
};

export default FormGroup;
