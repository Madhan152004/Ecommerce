
import React,{useState,useEffect} from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import "../styles/CategoryProductStyles.css";
// import "../styles"
import Layout from '../components/Layout/Layout'
import axios from 'axios'
const CategoryProduct = () => {
    const params=useParams()
    const navigate=useNavigate()
    const[products,setProducts]=useState([])
    const[category,setCategory]=useState([])

    
useEffect(()=>{
    if(params?.slug)
    getProductsByCat();
},[params?.slug])

//get Product

    const getProductsByCat=async()=>{
        try{
            const{data}= await axios.get(`/api/v1/product/product-category/${params.slug}`)
            setProducts(data?.products)
            setCategory(data?.category)
        }
        catch(error){
            console.log(error)
        }
    }
  return (
   <Layout>
    <div className='container container-style mt-3'>
        <h2 className='text-center'> Category - {category?.name}</h2>
        <h5 className='text-center'>{products?.length} Result Found </h5>


        <div className='row'>
        <div className='d-flex flex-wrap cards-style mt-5 '>

         
        {products?.map((p) => (
    
      <div className="card m-2 "  style={{ width: "18rem" }}>
        <img
          src={`/api/v1/product/product-photo/${p._id}`}
          className="card-img-top"
          alt={p.name}
          style={{width:"100%",height:"200px"}}
        />
        <div className="card-body">
          <h5 className="card-title">{p.name}</h5>
          <p className="card-text">{p.description.substring(0,30)}...</p>
          <p className=" price card-text ">₹{p.price}</p>
           <button class="btn btn-primary ms-1" onClick={()=> navigate(`/product/${p.slug}`)}>More Details </button>
           <button class="btn btn-secondary ms-1">Add To Cart </button>
        </div>
      </div>
  
  ))}
</div>
        </div>
    </div>
   </Layout>
  )
}

export default CategoryProduct
