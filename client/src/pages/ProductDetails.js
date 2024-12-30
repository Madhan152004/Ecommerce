import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProductDetailStyles.css"

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  //initalp details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="row container product-details">
        <div className="col-md-6">
        <div className="card m-2" style={{ width: "18rem" }}>
                  <img 
                    src={`/api/v1/product/product-photo/${product._id}`}
                    className="card-img-top"
                    alt={product.name}
                  />
                  
                </div>
        </div>
        <div className="col-md-6 product-details-info">
          <h1 className="text-center">Product Details</h1>
          <hr />
          <h4>Name : <span>{product.name}</span></h4>
          <h6></h6>
          <h4>Description : <span>{product.description}</span></h4>
          <h4>
            Price : <span> {product.price}</span>
            
           
          </h4>
          <h4>Category : <span>{product?.category?.name}</span></h4>
          <button class="btn btn-secondary ms-1">ADD TO CART</button>
        </div>
      </div>
      <hr />


      <div className="row container similar-products">
        <h4>Similar Products ➡️</h4>
        {relatedProducts.length <1 && <p className="text-center"> No Similar Products Found</p>}

        <div className='d-flex flex-wrap cards-style'>

         
          {relatedProducts?.map((p) => (
              
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
    </Layout>
  );
};

export default ProductDetails;
