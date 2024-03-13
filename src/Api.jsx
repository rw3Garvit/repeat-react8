import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { base_url } from './constant'

const Api = () => {

    //api data
    const [data, setdata] = useState([])

    let productName = useRef()
    let price = useRef()
    let Desc = useRef()


    //add product api
    let addProduct =async ()=>{
        let product={
            productName:productName.current.value,
            price:price.current.value,
            desc:Desc.current.value
        }

      let result=  await axios.post(base_url,product)
      console.log(result.data);
      setdata([...data, result.data])
        
    }

    //get product api
    let getProduct =async ()=>{
      let res =  await axios.get(base_url)
      setdata(res.data)
    }


    let deleteProduct = async(id)=>{
        console.log(id);

      let res =  await axios.delete(base_url+`/${id}`)
      console.log(res);
      setdata(data.filter((val)=>val.id != id))
    }




    useEffect(()=>{
        getProduct()
    },[])

  return (
   <>
    <div>
        <input type="text" name="productName" ref={productName} />
        <input type="number" name='price' ref={price}/>
        <input type="text" name='desc' ref={Desc}/>
        <button onClick={addProduct}>Add</button>
    </div>

    <div className='row'>
    {
        data.map((val)=>{
                return(
                    <>
                        <p>{val.id}</p>
                        <h1>{val.productName}</h1>
                        <h2>{val.price}</h2>
                        <h3>{val.desc}</h3>
                        <button onClick={()=>deleteProduct(val.id)}>Delete</button>
                    </>
                )
            })
        }
    </div>


   </>
  )
}

export default Api