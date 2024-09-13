import useRoutesOptions from '../../Hooks/useRoutesOptions';
import Button from '../Button';

export default function HTTPMethods() {
  const { btnRequests, request, dispatchSelectRequest } = useRoutesOptions();
  return (
    <div className="m-4">
      {
        btnRequests.map((value) => (
          <Button
            key={ value }
            dispatch={ dispatchSelectRequest }
            store={ request }
            name={ value }
          />
        ))
      }
    </div>
  );
}
