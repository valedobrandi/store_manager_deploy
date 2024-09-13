import { ReactNode } from 'react';

import createColumns from '../../utils/createColumns';
import ButtonDelete from '../ButtonDelete/ButtonDelete';
import useDispatchs from '../../Hooks/useDispatchs';

type TableProps = {
  data: Record<string, any>[];
  children?: ReactNode;
  close?: boolean;
  visible?: string;
  icon?: boolean;
};

export default function Table({ data, visible = '',
  children = null, close = false, icon = false }: TableProps) {
  const { onDispatch } = useDispatchs();
  return (
    <div className={ `${close ? 'hidden' : ''} m-4 ` }>
      <div className="mb-8">
        <div className="flex items-center justify-start">
          {children}
        </div>
        <table
          className={ `table table-fit ${visible}
        font-Poppins text-lg border-black border-x-4 border-b-4` }
        >
          <thead>
            <tr
              className="bg-black text-white"
            >
              {icon && <th aria-label="delete column" />}
              {createColumns(data).map((column, index) => (
                <th className=" text-lg" key={ index }>{column.toUpperCase()}</th>

              ))}
            </tr>
          </thead>
          <tbody className=" bg-slate-100">
            {data.map((row, index) => {
              const values = Object.values(row);
              const id = data[index].productId;
              return (
                <tr
                  className="text-black font-extrabold
                 border-1 border-gray-200"
                  key={ index }
                >
                  {icon && (
                    <ButtonDelete
                      handleClick={ () => onDispatch.deleteItemSaleList(id) }
                    />)}
                  {values.map((objValue: string, indexA) => (
                    <td key={ indexA }>{objValue}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
