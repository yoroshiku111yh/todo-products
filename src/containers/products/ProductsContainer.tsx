import { DataProductsGroupByCate, Product } from "../../types/products.type";
import { useGetCategoriesProduct, useGetProducts } from "../../queries/products..query";
import { useEffect, useState } from "react";
import GroupProductsByCate from "../../components/GroupProductsByCate";
import { useDebounce } from "use-debounce";
import SkeletonProducts from "../../components/skeletonProducts";
import { isIncludeInString } from "../../utils/helpers";


export default function ProductsContainer() {
    const productsResponse = useGetProducts(100, 0);
    const [groupData, setGroupData] = useState<DataProductsGroupByCate[]>([]);
    const [keywordSearchName, setKeyWordSearchName] = useState<string>("");
    const [valueSearchDebounce] = useDebounce(keywordSearchName, 1000);
    const categoriesProd = useGetCategoriesProduct();
    useEffect(() => {
        if (productsResponse.status === "success" && categoriesProd.status === "success") {
            const filteredData = productsResponse.data.products.filter(prod => isIncludeInString(keywordSearchName, prod.title));
            const groupProd = fnGroupProductsByCate(filteredData, categoriesProd.data);
            setGroupData(groupProd);
        }
    }, [productsResponse.data?.products, valueSearchDebounce, categoriesProd.data]);

    const searchName = (value: string) => {
        setKeyWordSearchName(value);
    }

    const listItem = groupData.map((item, index) => (
        <GroupProductsByCate category={item.category} data={item.data} key={"group-products-" + index} />
    ));

    if (productsResponse.status === "error") {
        return (
            <>Error...</>
        )
    }
    return (
        <>
            <div><input placeholder="search products..." value={keywordSearchName} onChange={(e) => { searchName(e.target.value) }} /></div>
            {productsResponse.status === "success" && <>{listItem}</>}
            {productsResponse.status === "loading" && <SkeletonProducts total={5} />}
        </>
    )
}

function fnGroupProductsByCate(products: Product[], categories:string[]) {
    let groupData: DataProductsGroupByCate[] = [];
    for(let i = 0 ; i < categories.length; i++){
        let cate = categories[i];
        const obj:DataProductsGroupByCate = {
            category : cate,
            data : []
        };
        groupData.push(obj);
        for(let k = 0 ; k < products.length; k++){
            const prod = products[k];
            if(prod.category === cate){
                groupData[i].data.push(prod);
            }
        }
    }
    return groupData;
}