import { styled } from "@mui/material";


export const SearchInputIcon = styled("span")({
    width: "20px",
    height: "20px",
    display: "block",
    position: "absolute",
    top : 0,
    left : "12px",
    bottom : 0,
    margin : "auto",
    "& svg": {
        width: "100%",
        height: "100%"
    }
})

export const SearchInputClear = styled(SearchInputIcon)({
    left : "auto",
    right : '12px',
    cursor : "pointer"
})