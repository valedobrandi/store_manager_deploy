import useDispatchs from './useDispatchs';

export default function useButtonStatus() {
  const { reduxStore } = useDispatchs();

  const isInputEmpty = (id: string) => id.trim() === '';
  const isArrayEmpty = (listItems: number) => listItems <= 0;
  const isSaleForm = () => [
    reduxStore.saleItem.productId !== '',
    reduxStore.saleItem.quantity !== '',
  ].every((check) => check === true);

  return { isInputEmpty, isArrayEmpty, isSaleForm };
}
