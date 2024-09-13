import { ProductFormType, SaleFormType,
  UpdateProductFromSaleFormType } from '../../types/fetchButtonTypes';

type FetchButtonProps = {
  usefetchLazyData: (query: ProductFormType |
  SaleFormType | UpdateProductFromSaleFormType | undefined) => void;
  input?: ProductFormType | SaleFormType | UpdateProductFromSaleFormType | undefined;
  title: string;
  isDisabled?: boolean;
  btnType?: string;
  size?: string;
};

export default function FetchButton({
  usefetchLazyData, title, btnType = 'outline', size = 'btn-md',
  input = undefined, isDisabled = false }: FetchButtonProps) {
  return (
    <button
      className={ `btn btn-outline btn-${btnType} uppercase ml-2 ${size}` }
      onClick={ () => usefetchLazyData(input) }
      disabled={ isDisabled }
    >
      {title}
    </button>
  );
}
