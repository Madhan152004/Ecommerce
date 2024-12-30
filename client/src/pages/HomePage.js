import React,{useState,useEffect} from 'react'
import Layout from '../components/Layout/Layout'
import '../styles/Homepage.css'
import { useNavigate } from 'react-router-dom'

import axios from "axios"
import {Checkbox,Radio} from "antd"

import { Prices } from '../components/Price'
const HomePage = () => {
  const navigate=useNavigate();

  const [products,setProducts]=useState([])
  const [categories,setCategories]=useState([])
  const [checked,setChecked]=useState([])
  const [radio,setRadio]=useState([])
  const[total,setTotal]=useState(0)
  const[page,setPage]=useState(1)
  const [loading,setLoading]=useState(false)


 


  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{
    getAllCategory();
    getTotal();
  },[])



  // get All PRoduct

  const getAllProducts=async()=>{
    try{
      setLoading(true)
      const{data}= await axios.get(`/api/v1/product/product-list/${page}`)
      setLoading(false)
      setProducts(data.products)
    }
    catch(error){
      console.log(error)
      setLoading(false)
    }
  }



   //get Total Count
   const getTotal=async()=>{
    try{
      const {data}=await axios.get('/api/v1/product/product-count')
      setTotal(data?.total)
    }
    catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
    if(page===1) return;
    loadMore();
  },[page])

  //load More
  const loadMore =async()=>{
    try{
      setLoading(true)
      const {data}=await axios.get(`/api/v1/product/product-list/${page}`)
      setLoading(false)

      setProducts([...products,...data?.products])
    }catch(error){
      console.log(error)
      setLoading(false)
      


    }
  } 
  




 // filter by cat
 const handleFilter = (value, id) => {
  let all = [...checked];
  if (value) {
    all.push(id);
  } else {
    all = all.filter((c) => c !== id);
  }
  setChecked(all);
};
useEffect(() => {
  if (!checked.length || !radio.length) getAllProducts();
}, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);



  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"All Products - Best Offers"}>

<div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src="/images/Banner4.png"className="d-block w-100 h-10" alt="banner1" />
    </div>
    <div className="carousel-item">
      <img src="/images/Banner2.png" className="d-block w-100" alt="banner2" />
    </div>
    <div className="carousel-item">
      <img src="./images/Banner3.png" className="d-block w-100" alt="banner3" />
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true" />
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true" />
    <span className="visually-hidden">Next</span>
  </button>
</div>




<div className="container-fluid row mt-3 home-page">
        <div className='col-md-3 filters'>
        <h4 className="text-center"> Filter By Category</h4>
        <div className="d-flex flex-column">
        {categories?.map((c)=>(
          <Checkbox key={c._id} onChange={(e)=>
        handleFilter(e.target.checked,c._id)}>{c.name}
         </Checkbox>
        
        
        ))}
        </div>

        {/* price Filter */}

        
        <h4 className="text-center mt-4 "> Filter By Price</h4>
        <div className="d-flex flex-column">
        <Radio.Group onChange={(e) => setRadio(e.target.value)}>
          {Prices?.map((p) =>(
            <div key={p._id}>
            <Radio value={p.array}>{p.name}</Radio> 
            </div>
            
          ))}
        </Radio.Group>
        </div>
        <div className="d-flex flex-column">
        <button className='btn btn-danger mb-3' onClick={()=> window.location.reload()}>Reset Button</button>
        </div>
        </div>
        <div className='col-md-9'>
       
        <h1 className='text-center'> All Products</h1>
        <div className='d-flex flex-wrap cards-style'>

         
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
        <div className="m-2 p-3 load-more">
            {products && products.length < total && (
              <button style={{width:'80%'}}
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}>
          {loading ? "Loading...":"Load More"}
        </button>
       )} </div>
  
        </div>
       </div>
    </Layout>
  )
}

export default HomePage
