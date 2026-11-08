// src/app/utils/masks.ts

/**
 * Remove todos os caracteres não numéricos
 */
export const unmask = (value: string): string => {
  return (value || '').replace(/\D/g, '');
};

/**
 * Máscara de CNPJ: 00.000.000/0000-00 (máximo 14 dígitos)
 */
export const maskCnpj = (value: string): string => {
  let val = unmask(value);
  if (val.length > 14) val = val.substring(0, 14);

  val = val.replace(/^(\d{2})(\d)/, '$1.$2');
  val = val.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
  val = val.replace(/\.(\d{3})(\d)/, '.$1/$2');
  val = val.replace(/(\d{4})(\d)/, '$1-$2');

  return val;
};

/**
 * Máscara de CPF: 000.000.000-00 (máximo 11 dígitos)
 */
export const maskCpf = (value: string): string => {
  let val = unmask(value);
  if (val.length > 11) val = val.substring(0, 11);

  val = val.replace(/(\d{3})(\d)/, '$1.$2');
  val = val.replace(/(\d{3})(\d)/, '$1.$2');
  val = val.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

  return val;
};

/**
 * Máscara de Telefone: (00) 00000-0000 ou (00) 0000-0000 (máximo 11 dígitos)
 */
export const maskTelefone = (value: string): string => {
  let val = unmask(value);
  if (val.length > 11) val = val.substring(0, 11);

  if (val.length > 10) {
    return val.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
  } else if (val.length > 5) {
    return val.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
  } else if (val.length > 2) {
    return val.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
  }
  return val;
};

/**
 * Máscara de CEP: 00000-000 (máximo 8 dígitos)
 */
export const maskCep = (value: string): string => {
  let val = unmask(value);
  if (val.length > 8) val = val.substring(0, 8);

  if (val.length > 5) {
    val = val.replace(/^(\d{5})(\d)/, '$1-$2');
  }
  return val;
};

