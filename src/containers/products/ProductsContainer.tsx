import { DataProductsGroupByCate, Product } from "../../types/products.type";
import { useGetCategoriesProduct, useGetProducts } from "../../queries/products..query";
import { useEffect, useState } from "react";
import GroupProductsByCate from "../../components/GroupProductsByCate";
import { useDebounce } from "use-debounce";
import { isIncludeInString } from "../../utils/helpers";
import SkeletonProducts from "../../components/SkeletonProducts";
import { SearchInput, SearchInputIcon } from "../../style/inputSearch";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { SearchInputClear } from './../../style/inputSearch';

export default function ProductsContainer() {
    const productsResponse = useGetProducts(100, 0);
    const categoriesProd = useGetCategoriesProduct();
    const [groupData, setGroupData] = useState<DataProductsGroupByCate[]>([]);
    ////SEARCH
    const [keywordSearchName, setKeyWordSearchName] = useState<string>("");
    const [searching, setSearching] = useState(false);
    const [searchDebouced] = useDebounce(keywordSearchName, 500);
    ////
    useEffect(() => {
        if (productsResponse.status === "success" && categoriesProd.status === "success") {
            const filteredData = productsResponse.data.products.filter(prod => isIncludeInString(keywordSearchName, prod.title));
            const groupProd = fnGroupProductsByCate(filteredData, categoriesProd.data);
            setGroupData(groupProd);
            setSearching(false);
        }
    }, [productsResponse.data?.products, searchDebouced, categoriesProd.data]);

    const searchName = (value: string) => {
        setKeyWordSearchName(value);
        setSearching(true);
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
            <SearchInput style={{ width: "50%" }}>
                <input placeholder="Search..." value={keywordSearchName} onChange={(e) => searchName(e.target.value)} />
                <SearchInputIcon>
                    <SearchIcon />
                </SearchInputIcon>
                <SearchInputClear onClick={() => searchName("")} style={keywordSearchName.length !== 0 ? { opacity: 1 } : { opacity: 0 }}>
                    <CloseIcon />
                </SearchInputClear>
            </SearchInput>
            <div style={{ paddingTop: "15px" }}>
                {productsResponse.status === "success" && !searching ? <>{listItem}</> : null}
            </div>
            <div style={{paddingTop : "25px"}}>
                {productsResponse.status === "loading" || searching ? <SkeletonProducts total={5}/> : null}
            </div>
        </>
    )
}

function fnGroupProductsByCate(products: Product[], categories: string[]) {
    let groupData: DataProductsGroupByCate[] = [];
    for (let i = 0; i < categories.length; i++) {
        let cate = categories[i];
        const obj: DataProductsGroupByCate = {
            category: cate,
            data: []
        };
        groupData.push(obj);
        for (let k = 0; k < products.length; k++) {
            const prod = products[k];
            if (prod.category === cate) {
                groupData[i].data.push(prod);
            }
        }
    }
    return groupData;
}