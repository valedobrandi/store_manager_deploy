import { MdDeleteForever } from 'react-icons/md';

interface ButtonDeleteType {
  handleClick: () => void;
}

export default function ButtonDelete({ handleClick }: ButtonDeleteType) {
  return (
    <button
      aria-label="Deletar"
      className="flex items-center mt-3"
      onClick={ handleClick }
    >
      <MdDeleteForever size={ 20 } color="red" />
    </button>
  );
}
