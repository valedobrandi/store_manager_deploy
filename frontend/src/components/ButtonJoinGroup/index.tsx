interface ButtonJoinGroupType {
  color?: string;
  title: string;
  onHandleClick: () => void;
}

export default function ButtonJoinGroup(
  {
    color = 'btn-warning',
    title,
    onHandleClick,
  }: ButtonJoinGroupType,
) {
  const styles = [color].toString();
  return (
    <button
      className={ `btn btn-warning btn-md
          ${styles} my-4 mr-4` }
      onClick={ () => (onHandleClick()) }
    >
      {title}
    </button>
  );
}
