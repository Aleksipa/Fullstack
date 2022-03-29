import axios from 'axios'
import { useState, useEffect } from 'react'

export const useField = (type) => {
    const [value, setValue] = useState('')
  
    const onChange = (event) => {
      setValue(event.target.value)
    }
  
    return {
      type,
      value,
      onChange
    }
  }

export const useCountry = (name) => {
    const [country, setCountry] = useState(null)
    const url = `https://restcountries.com/v3.1/name/${name}?fullText=true`

    useEffect(() => {
        const apiRes = async () => {

            try {
                const response = await axios.get(url)
                if (response) {
                    setCountry(response.data[0])
                }
            } catch {
                setCountry(null)
            } 
            
        }
        apiRes()
    }, [url, name]);

    return country
}