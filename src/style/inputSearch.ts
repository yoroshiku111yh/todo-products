import { styled } from "@mui/material";


export const SearchInput = styled("div")({
    position: "relative",
    "& input": {
        boxSizing : "border-box",
        width: '100%',
        height: "42px",
        border: "1px solid #B1B8C0",
        color: "#B1B8C0",
        lineHeight: 1.,
        padding: "3px",
        backgroundColor: "rgba(241, 241, 241, 0.75)",
        borderRadius : "20px",
        paddingLeft : "40px",
        paddingRight : "30px",
        "&:focus" : {
            outline : 'none'
        }
    }
});

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