import { useState } from "react";
import { GroupProductHeader, GroupProductList, GroupProductListItem, ProductItemHeader, ProductItemSide, ProductItemSub, ProductItemThumb } from "../style/groupProd";
import { Product } from "../types/products.type";
import { InputFieldStyleWhite } from "../style/inputField";
import { Button, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import UpdateIcon from '@mui/icons-material/Update';

type dataProduct = Pick<Product, "title" | "price">;

export default function GroupProductsByCate(props: { category: string, data: Product[] }) {
    const { data, category } = props;

    const listItem = data.map(item => (
        <GroupProductListItem key={item.id}>
            <ProductItem data={item} />
        </GroupProductListItem>
    ))
    return (
        <div>
            <GroupProductHeader>{category}</GroupProductHeader>
            <GroupProductList>{listItem}</GroupProductList>
        </div>
    )
}

function ProductItem(props: { data: Product }) {
    const { data } = props;
    const [showEditForm, setShowEditForm] = useState(false);
    const [valueInput, setValueInput] = useState<dataProduct>({ title: data.title, price: data.price });
    const toggleOpen = () => {
        setValueInput({
            title: data.title,
            price: data.price
        });
        setShowEditForm(!showEditForm);
    }

    const onChangeData = function (value: dataProduct, fieldsToUpdate: Partial<dataProduct>) {
        const obj: dataProduct = { ...value, ...fieldsToUpdate };
        setValueInput(obj);
    }

    return (
        <>
            <ProductItemThumb><img src={data.thumbnail} /></ProductItemThumb>
            <ProductItemSide>
                {showEditForm
                    ?
                    <>
                        <div style={{ marginBottom: "5px" }}>
                            <InputFieldStyleWhite value={valueInput.title} onChange={(e) => { onChangeData(valueInput, { title: e.target.value }) }} />
                        </div>
                        <div style={{ marginBottom: "5px" }}>
                            <InputFieldStyleWhite value={valueInput.price} onChange={(e) => { onChangeData(valueInput, { price: Number(e.target.value) }) }} />
                        </div>
                        <div style={{ marginTop: "7px", textAlign: "right" }}>
                            <Button variant="outlined" startIcon={<UpdateIcon />} style={{ marginRight: '7px' }}>
                                Update
                            </Button>
                            <Button onClick={toggleOpen} variant="outlined" color="error" startIcon={<CancelIcon />}>
                                Cancel
                            </Button>
                        </div>
                    </>
                    :
                    <>
                        <ProductItemHeader>{data.title}</ProductItemHeader>
                        <ProductItemSub>${data.price}</ProductItemSub>
                        <div style={{ marginTop: "15px", textAlign: "right" }}>
                            <IconButton onClick={toggleOpen} color="primary" >
                                <EditIcon />
                            </IconButton>
                        </div>
                    </>
                }
            </ProductItemSide>
        </>
    )
}