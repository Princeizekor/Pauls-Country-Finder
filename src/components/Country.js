import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Country({dark, setDark}) {
    const [country, setCountry] = useState([])
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [select, setSelect] = useState('')
    const [drop, setDrop] = useState(false)

    useEffect(() => {
        axios.get('https://restcountries.com/v2/all')
        .then(res => {
            setCountry(res.data)
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

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    const handleSelect = (e) => {
        setSelect(e.target.innerText)
    }

    const handleDroper = () => {
        setDrop(!drop)
    }

    const data = country?.filter(data => (
        data?.name.toLowerCase().includes(search.toLowerCase()) &&
        data?.region.toLowerCase().includes(select.toLowerCase())
    ))
    
    return (
        <div className={dark ? 'dark' : null}>
            <div className="color">
<div className="search">
            <div className="search-bar">
            <i className="fas fa-search searcher"></i>
            <input type="text" placeholder="Search for a country" className="search-input"
            onChange={handleChange}
            value={search}
            />
            </div>
            <div className="select-bar">
                    <div className="selectRegion" onClick={handleDroper}>
                        <p>Filter by Region</p><i className="fas fa-chevron-down"></i>
                    </div>
                    <div className={drop ? 'open' : 'showDropDown'} >
                        <div className="color2">
                        <div className="droper">
                    <p className="region" onClick={handleSelect} value={select}>Africa</p>
                    <p className="region" onClick={handleSelect} value={select}>America</p>
                    <p className="region" onClick={handleSelect} value={select}>Asia</p>
                    <p className="region" onClick={handleSelect} value={select}>Europe</p>
                    <p className="region" onClick={handleSelect} value={select}>Oceania</p>
                    </div>
                    </div>
                    </div>
            </div>
        </div>
    </div>
<div className="contain">

    {
        loading ? <div className="loader">
        <img src="./img/Spinner-1s-24px (2).svg" alt="Loader image" className="spin"/>
        <p>Loading</p>
        </div> : null
    }
   
   {
       data?.length ? data?.map?.(countries => (
        <Link to={`/country/${countries?.name}`}>
            <div className="placeObjects" key={countries?.name}>
        <div className="imageWrapper">
       <img src={countries?.flag} alt="country flag"/>
       </div>
       <div className="countryinfo">
       <h5 className="countryName">{countries?.name}</h5>
   <p>Popullation: <span className="popullation">{countries?.population}</span></p>
   <p className="regions">Region: <span className="reg">{countries?.region}</span></p>
   <p>Capital: <span className="capital">{countries?.capital}</span></p>
   </div>
   </div>
        </Link>
       )) : null
   }
   {
       error ? <div className="loader">OOPS something went wrong, Could not fecth data, Please try refreshing your browser or try reopening ur browser</div> : null
   }
</div>

        </div>
    )
}

export default Country
