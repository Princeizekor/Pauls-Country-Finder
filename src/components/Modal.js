import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function Modal({dark, setDark}) {
    const [data, setData] = useState()
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)
    const Param = useParams()

    useEffect(() => {
        axios.get(`https://restcountries.com/v2/name/${Param.country}`)
        .then(res => {
            setData(res.data)
            setError(false)
            setLoading(false)
        })
        .catch(error => {
            console.log(error)
            setError(true)
            setLoading(false)
        })
        setDark(dark)
    }, [])
    return (
        <div className={dark ? 'dark' : null}>
            <Link to="/"><button className="back">Back</button></Link>
            <div className="Modal">
        {
            loading ? <div className="loader">
            <img src="../img/Spinner-1s-24px (2).svg" alt="Loader image" className="spin"/>
            <p>Loading</p>
            </div>  : data?.map?.((items, i) => (
                <div key={i} className="firstModal">
            <img src={items?.flag} alt="country flag image"/>
        </div>
            ))
        }
        {
            data?.map?.((item, i) => (
                <div key={i} className="secondModal">
            <h1>{item?.name}</h1>
            <div className="Modalinfo">
            <div className="modalText">
                <p><strong>Native Name:</strong> <span className="popullation">{item?.nativeName}</span></p>
                <p><strong>population:</strong> <span className="reg">{item?.population}</span></p>
                <p><strong>Region:</strong> <span className="capital">{item?.region}</span></p>
                <p><strong>Sub Region:</strong> <span className="capital">{item?.subregion}</span></p>
                <p><strong>Capital:</strong> <span className="capital">{item?.capital}</span></p>
            </div>
            <div className="modalTexttwo">
                <p><strong>Top Level Domain:</strong> <span className="popullation">{item?.topLevelDomain}</span></p>
                <p><strong>Currency:</strong> <span className="reg">{item?.currencies?.map?.(element => element?.name)}</span></p>
                <p><strong>CallingCodes:</strong> <span className="reg">+{item?.callingCodes}</span></p>
                <p><strong>Language:</strong> <span className="capital">{item?.languages?.map?.(element => element?.name)}</span></p>
                <p><strong>NumericCode:</strong> <span className="capital">{item?.numericCode}</span></p>
            </div>
            </div>
        </div>
            ))
        }
        {
       error ? <div className="loader">OOPS something went wrong, Could not fecth data, Please try refreshing your browser or try reopening ur browser</div> : null
   }
    </div>
        </div>
    )
}

export default Modal
