type ItemsListProps = {
  itemsList : string[]
};

export default function ItemsList({ itemsList }: ItemsListProps) {
  return (
    <div className="stats shadow">
      <div className="stat">
        {itemsList.map((item, index) => (
          <p
            className="stat-desc text-black text-lg m-1 font-Poppins"
            key={ index }
          >
            {item}
          </p>))}
      </div>
    </div>
  );
}
