import { GroupProductHeader, GroupProductList, GroupProductListItem } from "../style/groupProd";
import { Product } from "../types/products.type";
import ProductItem, { TypePropsProductItem } from "./ProductItem";
import { useState } from 'react';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

type TypeGroupProductByCate = Pick<TypePropsProductItem, "onUpdate" | "isUpdating" | "isError"> & { category: string, data: Product[] };

export default function GroupProductsByCate(props: TypeGroupProductByCate) {
    const { data, category, onUpdate, isUpdating, isError } = props;
    const [open, setOpen] = useState(data.length > 0 ? true : false);
    const handleClick = () => {
        if(data.length === 0) return false;
        setOpen(!open);
    };

    const listItem = data.map(item => (
        <GroupProductListItem key={item.id}>
            <ProductItem isUpdating={isUpdating} isError={isError} data={item} onUpdate={onUpdate} />
        </GroupProductListItem>
    ))
    return (
        <>
            <ListItemButton style={{ padding: "3px 2px", marginBottom : "7px" }} onClick={handleClick}>
                <GroupProductHeader>
                    {category}
                    <div style={{display : "inline-block", verticalAlign : "middle", marginLeft : "7px"}}>
                        ( {data.length} )
                    </div>
                </GroupProductHeader>
                {open
                    ? <ExpandLess style={{ position: "absolute", top: 0, bottom: 0, margin: "auto", right: 0 }} />
                    : <ExpandMore style={{ position: "absolute", top: 0, bottom: 0, margin: "auto", right: 0 }} />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <GroupProductList>{listItem}</GroupProductList>
                </List>
            </Collapse>
        </>
    )
}
