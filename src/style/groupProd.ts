import { styled } from "@mui/material";


export const GroupProductHeader = styled("h4")({
    color: "#353C49",
    fontSize: "18px",
    fontWeight: "600",
    lineHeight: 1.3,
    margin: 0,
    textTransform: "capitalize"
});

export const GroupProductList = styled("ul")({
    margin: 0,
    paddingLeft: "20px",
    marginBottom: "20px"
})

export const GroupProductListItem = styled("li")({
    listStyleType : "none",
    display: "block",
    margin: "15px 0px",
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #D1B8FA",
    transition: "all 0.25s ease-in-out",
    cursor: "pointer",
    position : "relative",
    "&:hover": {
        paddingLeft: "15px",
        "& h6": {
            backgroundColor: "#F2F4F6",
        }
    }
})

export const ProductItemSide = styled("div")({
    display: "inline-block",
    verticalAlign: "top",
    boxSizing: "border-box",
    paddingLeft: "10px",
    width: "calc(100% - 72px)"
})

export const ProductItemHeader = styled("h6")({
    fontSize: "16px",
    fontFamily: "'Inter', sans-serif",
    fontWeight: "500",
    margin: 0,
    padding: "5px 10px",
    display: "block",
    borderRadius: "5px",
    transition: "all 0.25s ease-in-out",
})

export const ProductItemSub = styled("p")({
    fontSize: "14px",
    color: '#676E7B',
    fontWeight: "400",
    display: "block",
    padding: "0px 10px",
    margin: 0,
    marginTop: "5px"
})

export const ProductItemThumb = styled("div")({
    display: "inline-block",
    verticalAlign: "top",
    width: "72px",
    height: "72px",
    borderRadius: "15px",
    overflow: "hidden",
    "& img": {
        width: "100%",
        height: "100%",
        objectFit: "cover"
    }
})
