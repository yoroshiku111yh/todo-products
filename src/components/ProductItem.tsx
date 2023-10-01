import { useState, useEffect } from "react";
import { ProductItemHeader, ProductItemSide, ProductItemSub, ProductItemThumb } from "../style/groupProd";
import { Product, ProductUpdateValue } from "../types/products.type";
import { InputFieldStyleWhite } from "../style/inputField";
import { Button, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import UpdateIcon from '@mui/icons-material/Update';
import Alert from '@mui/material/Alert';

export type TypePropsProductItem = {
    isUpdating: boolean,
    isError: boolean,
    data: Product,
    onUpdate: (prod: ProductUpdateValue, id: number) => void
}

export default function ProductItem(props: TypePropsProductItem) {
    const { data, onUpdate, isUpdating, isError } = props;
    const [showEditForm, setShowEditForm] = useState(false);
    const { id, ...rest } = Object.assign({}, data);
    const [valueInput, setValueInput] = useState<ProductUpdateValue>(rest);
    const [isChange, setChange] = useState(false);
    const [checkError, setCheckError] = useState<boolean>(false);
    useEffect(() => {
        if (!isUpdating && !isError) {
            setShowEditForm(false);
        }
        setCheckError(isError);
    }, [isUpdating])
    const toggleOpen = () => {
        setValueInput({
            ...{},
            ...valueInput,
            ...{
                title: data.title,
                price: data.price
            }
        });
        setShowEditForm(!showEditForm);
        setCheckError(false);
    }

    const onChangeData = function (value: ProductUpdateValue, fieldsToUpdate: Partial<ProductUpdateValue>) {
        const obj: ProductUpdateValue = { ...value, ...fieldsToUpdate };
        setChange(true);
        setValueInput(obj);
    }

    const handleUpdateValue = () => {
        if (!isChange) return false;
        onUpdate(valueInput, data.id)
        setChange(false);
    }
    return (
        <>
            <ProductItemThumb><img src={data.thumbnail} /></ProductItemThumb>
            <ProductItemSide>
                {showEditForm
                    ?
                    <>
                        <div style={{ marginBottom: "5px" }}>
                            <InputFieldStyleWhite value={valueInput.title} onChange={(e) => { onChangeData(valueInput, { title: e.target.value.toString() }) }} />
                        </div>
                        <div style={{ marginBottom: "5px" }}>
                            <InputFieldStyleWhite value={valueInput.price} onChange={(e) => { onChangeData(valueInput, { price: Number(e.target.value) || valueInput.price }) }} />
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
            {showEditForm &&
                <div style={{ marginTop: "7px", textAlign: "right" }}>
                    <Button onClick={handleUpdateValue} disabled={!isChange} variant="outlined" startIcon={<UpdateIcon />} style={{ marginRight: '7px' }}>
                        {isUpdating ? "Updating..." : "Update"}
                    </Button>
                    <Button onClick={toggleOpen} variant="outlined" color="error" startIcon={<CancelIcon />}>
                        Cancel
                    </Button>
                    <div style={{ marginTop: "5px" }}>
                        {checkError &&
                            <Alert severity="error">Error! please try again later. </Alert>
                        }
                    </div>
                </div>
            }
        </>
    )
}