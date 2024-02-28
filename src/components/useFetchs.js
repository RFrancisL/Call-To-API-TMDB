import { useEffect, useState } from "react"
import { AUTH } from "../App"

export default function useFetch (url){
    const [success, setSuccess] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(()=>{
        setLoading(true)
        fetch(url, AUTH)
            .then((res)=>{
                if(!res.ok){
                    throw new Error('Fetching ERROR')
                }
                return res.json()
            })
            .then((data) => { setSuccess(data) })
            .catch((err) => { setError(err) })
            .finally(() => setLoading(false))
    },[])

    return { success, loading, error }
}