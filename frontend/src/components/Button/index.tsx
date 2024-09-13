import { ProductFormType, SaleFormType,
  UpdateProductFromSaleFormType } from '../../types/fetchButtonTypes';

type ButtonPropsType = {
  name: string,
  dispatch: (querie?: string | ProductFormType | SaleFormType |
  UpdateProductFromSaleFormType) => void;
  store?: string;
  btnType?: string;
  isDisabled?: boolean;
};

export default function Button({
  name, dispatch, store = '', btnType = 'neutral', isDisabled = false,
}: ButtonPropsType) {
  return (
    <button
      className={ `btn btn-outline btn-${btnType} uppercase m-1 
        ${store === name ? 'bg-black text-white  border-none' : ''}` }
      onClick={ () => dispatch(name) }
      disabled={ isDisabled }
    >
      {name}
    </button>
  );
}
