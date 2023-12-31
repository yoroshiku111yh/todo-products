import { getCategoriesProduct, getProducts, getProductsByCate, putProduct } from "../apis/products.api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ProductUpdateValue } from "../types/products.type";


export function useGetProducts(limit: number, skip: number) {
    return useQuery({
        queryKey: ["products/get", { limit: limit, skip: skip }],
        queryFn: async () => { const response = await getProducts(limit, skip); return response.data },
        cacheTime: 7 * 60 * 1000, // 7 minute
        staleTime: 5 * 60 * 1000,
    })
}

export function useGetCategoriesProduct() {
    return useQuery({
        queryKey: ["products/categories"],
        queryFn: async () => { const response = await getCategoriesProduct(); return response.data },
        cacheTime: Infinity,
        staleTime: Infinity
    })
}

export function useGetProductsByCate(cate: string, limit: number, skip: number) {
    return useQuery({
        queryKey: ["products/category", cate],
        queryFn: async () => { const response = await getProductsByCate(cate, limit, skip); return response.data; },
        cacheTime: 7 * 60 * 1000, // 7 minute
        staleTime: 5 * 60 * 1000,
    })
}


export function usePutProduct() {
    return useMutation({
        mutationFn: async (props: { prod: ProductUpdateValue, id: number }) => { const response = await putProduct(props.prod, props.id); return response.data }
    })
}