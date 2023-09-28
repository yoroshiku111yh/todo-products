import { Product } from "../types/products.type";


export default function GroupProductsByCate(props: { category: string, data: Product[] }) {
    const { data, category } = props;
    const listItem = data.map(item => (
        <li key={item.id}>{item.title}</li>
    ))
    return (
        <div>
            <h4>{category}</h4>
            <ul>{listItem}</ul>
        </div>
    )
}