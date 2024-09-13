import useRoutesOptions from '../../Hooks/useRoutesOptions';
import Button from '../Button';

export default function EndPoints() {
  const { dispatchSelectRoute, route, btnRoutes } = useRoutesOptions();
  return (
    <div className="m-4">
      {
        btnRoutes.map((value) => (
          <Button
            key={ value }
            dispatch={ dispatchSelectRoute }
            store={ route }
            name={ value }
          />
        ))
      }
    </div>
  );
}
