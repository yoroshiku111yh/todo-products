import { DataProductsGroupByCate, GetCategoriesApiResponse, Product, ProductUpdateValue } from "../../types/products.type";
import { useGetCategoriesProduct, useGetProducts, usePutProduct } from "../../queries/products.query";
import { useEffect, useState } from "react";
import GroupProductsByCate from "../../components/GroupProductsByCate";
import { useDebounce } from "use-debounce";
import { deepCloneObject, isIncludeInString } from "../../utils/helpers";
import SkeletonProducts from "../../components/SkeletonProducts";
import { SearchInputIcon, SearchInputClear } from "../../style/inputSearch";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { InputField } from "../../style/inputField";
import { queryClient } from "../../main";

import Alert from '@mui/material/Alert';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';

export default function ProductsContainer() {
    const productsResponse = useGetProducts(100, 0);
    const categoriesProd = useGetCategoriesProduct();
    const [groupData, setGroupData] = useState<DataProductsGroupByCate[]>([]);
    ////SEARCH
    const [keywordSearchName, setKeyWordSearchName] = useState<string>("");
    const [searching, setSearching] = useState(false);
    const [searchDebouced] = useDebounce(keywordSearchName, 500);
    ////
    const { mutate, isError, isLoading } = usePutProduct();
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

    const onUpdateProduct = (prod: ProductUpdateValue, id: number) => {
        mutate({
            prod: prod,
            id: id
        }, {
            onSuccess: (data) => {
                queryClient.setQueryData(["products/get", { limit: 100, skip: 0 }], (oldData) => {
                    const cloneProducts = deepCloneObject(oldData);
                    const updateProducts = cloneProducts.products.map((item: Product) => {
                        if (item.id === id) {
                            item = {
                                ...item,
                                ...data
                            }
                        }
                        return item;
                    });
                    return {
                        ...cloneProducts,
                        ...{ products: updateProducts }
                    };
                })
            },
            onError: (error) => {
                console.log(error);
            }
        });
    }

    const listItem = groupData.map((item, index) => (
        <GroupProductsByCate isUpdating={isLoading} isError={isError} onUpdate={onUpdateProduct} category={item.category} data={item.data} key={"group-products-" + index} />
    ));

    if (productsResponse.status === "error") {
        return (
            <>
                <Alert severity="error">Error! </Alert>
            </>
        )
    }
    return (
        <>
            <div style={{ width: "100%", position: "relative" }}>
                <InputField style={{ color: "rgb(71 71 71)" }} placeholder="Search..." value={keywordSearchName} onChange={(e) => searchName(e.target.value)} />
                <SearchInputIcon>
                    <SearchIcon />
                </SearchInputIcon>
                <SearchInputClear onClick={() => searchName("")} style={keywordSearchName.length !== 0 ? { opacity: 1 } : { opacity: 0 }}>
                    <CloseIcon />
                </SearchInputClear>
            </div>
            <div style={{ paddingTop: "15px" }}>
                {productsResponse.status === "success" && !searching
                    ?
                    <List
                        sx={{ width: '100%', padding: 0 }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        subheader={
                            <ListSubheader style={{ padding: 0, marginBottom: "7px" }} component="div" id="nested-list-subheader">
                                <h3 style={{ margin: 0, fontSize: "28px" }}>Products</h3>
                            </ListSubheader>
                        }
                    >
                        <>{listItem}</>
                    </List>
                    :
                    null}
            </div>
            <div>
                {productsResponse.status === "loading" || searching ? <div style={{ paddingTop: "25px" }}><SkeletonProducts total={5} /></div> : null}
            </div>
        </>
    )
}

function fnGroupProductsByCate(products: Product[], categories: GetCategoriesApiResponse) {
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