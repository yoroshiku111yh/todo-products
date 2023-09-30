import { styled } from "@mui/material";


export const InputField = styled("input")({
    boxSizing: "border-box",
    width: '100%',
    height: "42px",
    border: "1px solid #B1B8C0",
    color: "#B1B8C0",
    lineHeight: 1.,
    padding: "3px",
    backgroundColor: "rgba(241, 241, 241, 0.75)",
    borderRadius: "20px",
    paddingLeft: "40px",
    paddingRight: "30px",
    "&:focus": {
        outline: 'none'
    }
});

export const InputFieldStyleWhite = styled(InputField)({
    backgroundColor : "#fff",
    borderRadius : "5px",
    color : "#353C49",
    height : "32px",
    transition : "all 0.25s ease-in-out",
    paddingLeft : "10px",
    paddingRight : "10px",
    "&:focus" : {
        border : "1px solid #6713EF"
    }
})