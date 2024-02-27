import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { AUTH } from "../../App"
import '../movies/styles/credits.css'

export default function CreditsSeries(){
    const { id } = useParams()

    const [dataSuccess, setDataSuccess] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(()=>{
        setLoading(true)

        fetch(`https://api.themoviedb.org/3/tv/${id}/aggregate_credits`, AUTH)
            .then((res)=>{
                if(!res.ok){
                    throw new Error('Fetching ERROR Cresdits Series')
                }
                return res.json()
            })
            .then((data)=>{
                    console.log(data.cast)
                    const uniqueActor = [];
                   
                    data.cast.forEach((act) => {
          
                      // Filtramos y agregamos los proveedores únicos
                     
                        
                          // Verifica si el proveedor ya existe en el array de proveedores unicos
                          const isDuplicateActor = uniqueActor.some((existingActor) =>
                                existingActor.id === act.id &&
                                existingActor.name === act.name
                          );

          
                          // Solo agregamos el proveedor si no es un duplicado
                          if (!isDuplicateActor) {
                            uniqueActor.push({
                              id: act.id,
                              name: act.name,
                              profile_path: act.profile_path,
                              roles: act.roles,
                              department: act.known_for_department,
                              popularity: act.popularity
                            });
                          }
                    });
          
                setDataSuccess([...uniqueActor]);
                setLoading(false)
            })
            .catch((err)=>{
                setError(err)
                setLoading(false)
            })
    },[id])

    if(loading){
        return <h1>LOADING...</h1>
    }

    if(error){
        return <h1>{error}</h1>
    }
    console.log(dataSuccess)
    return(
        <div>
            {dataSuccess ? (
                <h1 style={{textAlign:'center'}}>CAST</h1>
            ):(
                <h1 style={{textAlign:'center'}}>THRE IS NOT CAST</h1>
            )}
            <div className="div-semiglobal-credits">
                {dataSuccess.map((cast)=>( cast && cast.profile_path ?(
                    <div key={cast.id} className="card-credits">
                        <img src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`} className="image-credits"/>
                        <h1 className="info-credits">{cast.name}</h1>
                        {cast.roles.map((characters, index)=>(
                            <div key={index}>
                                <h5 className="info-credits">Character: {characters.character}</h5>
                            </div>
                        ))}
                        <h5 className="info-credits">Department: {cast.department}</h5>
                        <h5 className="info-credits">Popularity: {cast.popularity}</h5>
                    </div>
                ):(
                    null
                )                 
                ))}
            </div>
        </div>
    )
}