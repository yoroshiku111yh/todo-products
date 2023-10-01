import { GetCategoriesApiResponse, GetProductsApiResponse, ProductUpdateValue } from "../types/products.type";
import http from "../utils/http";


export const getProducts = (limit: number, skip: number) => {
    return http.get<GetProductsApiResponse>("products", {
        params: {
            limit: limit,
            skip: skip,
            select: 'title,price,thumbnail,category'
        },
        responseType: "json"
    })
}

export const getCategoriesProduct = () => {
    return http.get<GetCategoriesApiResponse>("products/categories", {
        responseType: "json"
    })
}


export const getProductsByCate = (cate: string, limit: number, skip: number) => {
    return http.get<GetProductsApiResponse>(`products/category/${cate}`, {
        params: {
            limit: limit,
            skip: skip,
            select: 'title,price,thumbnail,category'
        },
        responseType: "json"
    })
}

export const putProduct = (prodUpdateValue: ProductUpdateValue, id : number) => {
    return http.put(`products/${id}`, prodUpdateValue)
}