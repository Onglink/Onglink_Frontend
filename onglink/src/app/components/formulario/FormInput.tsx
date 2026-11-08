'use client';
import React from 'react';
import { FormikProps } from 'formik';
import { maskCnpj, maskCpf, maskTelefone, maskCep } from '@/app/utils/masks';

export type MaskType = 'cnpj' | 'cpf' | 'telefone' | 'cep';

interface FormInputProps {
  formik: FormikProps<any>;
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  readonly?: boolean;
  mask?: MaskType;
  maxLength?: number;
}

const applyMask = (value: string, mask?: MaskType): string => {
  if (!mask) return value;
  switch (mask) {
    case 'cnpj':
      return maskCnpj(value);
    case 'cpf':
      return maskCpf(value);
    case 'telefone':
      return maskTelefone(value);
    case 'cep':
      return maskCep(value);
    default:
      return value;
  }
};

const getDefaultMaxLength = (mask?: MaskType): number | undefined => {
  switch (mask) {
    case 'cnpj':
      return 18; // 00.000.000/0000-00
    case 'cpf':
      return 14; // 000.000.000-00
    case 'telefone':
      return 15; // (00) 00000-0000
    case 'cep':
      return 9; // 00000-000
    default:
      return undefined;
  }
};

const FormInput: React.FC<FormInputProps> = ({
  formik,
  name,
  label,
  type = 'text',
  placeholder,
  readonly,
  mask,
  maxLength,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (mask) {
      const masked = applyMask(e.target.value, mask);
      formik.setFieldValue(name, masked);
    } else {
      formik.handleChange(e);
    }
  };

  const calculatedMaxLength = maxLength ?? getDefaultMaxLength(mask);
  const errorMessage =
    formik.touched[name] && typeof formik.errors[name] === 'string'
      ? (formik.errors[name] as string)
      : null;

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block mb-1 font-medium">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={formik.values[name] ?? ''}
        onChange={handleChange}
        onBlur={formik.handleBlur}
        maxLength={calculatedMaxLength}
        className={`w-full border rounded p-2 ${
          errorMessage ? 'border-red-500' : 'border-black'
        }`}
        readOnly={readonly}
      />
      {errorMessage && (
        <div className="text-red-500 text-sm mt-1">{errorMessage}</div>
      )}
    </div>
  );
};

export default FormInput;
