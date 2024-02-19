import { useParams } from "react-router-dom";

const DetaiProduct = () => {
    const {pid, title} = useParams()
    
    return ( <div>
        DetaiProduct
    </div> 
    );
}
 
export default DetaiProduct;