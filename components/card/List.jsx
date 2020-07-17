import CardItem from "./Item";

const CardList = ({ items }) => {
    return !items ? (
        <p>Loading...</p>
    ) : (
        <div className="p-4 grid grid-cols-1 gap-10">
            {items.map((item, idx) => (
                <CardItem key={item.id || idx} id={item.id} {...item} />
            ))}
        </div>
    );
};
export default CardList;
