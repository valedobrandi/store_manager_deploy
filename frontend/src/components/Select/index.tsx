import useRoutesOptions from '../../Hooks/useRoutesOptions';
import '../../index.css';

type SelectTypeProps = {
  options: string[]
};

export default function Select({ options = [] }: SelectTypeProps) {
  const { request, dispatchSelectRequest } = useRoutesOptions();
  return (
    <select
      className="select select-info max-h-4 h-8 w-fit text-black uppercase m-4"
      value={ request }
      onChange={ (e) => dispatchSelectRequest(e.target.value) }
    >
      {options.map((option, index) => (
        <option key={ index } value={ option }>{option.toUpperCase()}</option>
      ))}
    </select>
  );
}
