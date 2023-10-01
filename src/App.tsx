import ProductsPage from "./pages/Products.page"
import GitHubIcon from '@mui/icons-material/GitHub';

function App() {
    return (
        <>
            <ProductsPage />
            <a href="https://github.com/yoroshiku111yh/todo-products" style={{position : "fixed", bottom : "15px", right : "15px", width : "50px", height : "50px"}}>
                <GitHubIcon style={{width : "100%", height : "100%"}} />
            </a>
        </>
    )
}

export default App
