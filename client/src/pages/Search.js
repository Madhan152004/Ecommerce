import React from 'react'
import Layout from './../components/Layout/Layout';
import '../styles/Homepage.css'
import { useSearch } from '../context/search';

import { useNavigate } from 'react-router-dom';
const Search = () => {
    const [values,setValues]=useSearch()
    const navigate=useNavigate()
  return (
    <Layout title={"Search results"}>
      <div className="container">
        <div className="text-center search mt-2">
          <h1>Search Resuts</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found " 
              : `Found ${values?.results.length}`}
          </h6>

          <div className='d-flex flex-wrap cards-style mt-4 home-page'>

         
          {values?.results.map((p) => (
              
                <div className="card m-2 "  style={{ width: "18rem" }}>
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    style={{width:"100%",height:"300px"}}
                  />
                  <div className="card-body card-btn">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description.substring(0,30)}...</p>
                    <p className="card-text">₹{p.price}</p>
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

export default Search

