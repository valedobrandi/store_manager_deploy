import { SalerRegisterType } from '../types/responseApi';

export default function objectTostring(object: string | object | [] | SalerRegisterType) {
  if (Array.isArray(object)) [object] = object;
  if (typeof object === 'string') return object;
  if (!object) return '';

  if ('itemsSold' in object) {
    const items = object.itemsSold.reduce((prev, curr, index) => {
      const objectEntries = Object.entries(curr);
      const toUpperCaseKeys = objectEntries.map((obj) => obj.toString().toUpperCase());
      const toString = toUpperCaseKeys.join(' ').replaceAll(',', ': ');

      prev = { ...prev, [index]: toString };
      return prev;
    }, {});

    object = { saleId: object.id, ...items };
  }

  const objectEntries = Object.entries(object);
  const toUpperCaseKeys = objectEntries.map((obj) => [obj[0].toUpperCase(), obj[1]]);
  const joinEntries = toUpperCaseKeys.map((obj) => obj.join(': '));

  return joinEntries.join(' ');
}
