import { Skeleton } from "@mui/material";


export default function SkeletonProducts(props : {total: number}) {
    const {total} = props;
    const ar = Array.from({ length: total });
    const listItem = ar.map((_,index) => (
        <div style={{ marginBottom: "15px" }} key={index}>
            <Skeleton variant="rectangular" width={"30%"} height={20} style={{ marginBottom: "10px" }} />
            <Skeleton variant="rounded" width={"50%"} height={30} style={{ marginBottom: "10px" }} />
            <Skeleton variant="rounded" width={"70%"} height={30} style={{ marginBottom: "10px" }} />
            <Skeleton variant="rounded" width={"100%"} height={30} style={{ marginBottom: "10px" }} />
            <Skeleton variant="rounded" width={"40%"} height={30} style={{ marginBottom: "10px" }} />
            <Skeleton variant="rounded" width={"60%"} height={30} style={{ marginBottom: "10px" }} />
        </div>
    ))
    return (
        <>
            {listItem}
        </>
    )
}