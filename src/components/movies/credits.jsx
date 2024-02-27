import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router"
import { AUTH, UserContext } from "../../App"
import '../movies/styles/credits.css'
import { Link } from "react-router-dom"

export default function Credits(){
    const { id } = useParams()
    const {userState} = useContext(UserContext)

    const [dataSuccess, setDataSuccess] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(()=>{
        setLoading(true)

        fetch(`https://api.themoviedb.org/3/movie/${id}/credits`, AUTH)
            .then((res)=>{
                if(!res.ok){
                    throw new Error('Fetching ERROR Alternative Titles')
                }
                return res.json()
            })
            .then((data)=>{
                if (data && typeof data === 'object') {
                    const uniqueActor = [];
                   
                    Object.values(data).forEach((act, cre) => {
          
                      // Filtramos y agregamos los proveedores únicos
                      if (act, cre) {
                        act.forEach((cast) => {
                          // Verifica si el proveedor ya existe en el array de proveedores unicos
                          const isDuplicateActor = uniqueActor.some((existingActor) =>
                                existingActor.id === cast.id &&
                                existingActor.name === cast.name
                          );

          
                          // Solo agregamos el proveedor si no es un duplicado
                          if (!isDuplicateActor) {
                            uniqueActor.push({
                              id: cast.id,
                              name: cast.name,
                              profile_path: cast.profile_path,
                              character: cast.character,
                              department: cast.known_for_department
                            });
                          }

                        });
                      }
                    });
          
                setDataSuccess([...uniqueActor]);
                setLoading(false)
            }})
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
    
    return(
        <div>
            {
                dataSuccess ? (
                    <div>
                        <h1 style={{textAlign:'center'}}>CAST</h1>
                        <div className="div-semiglobal-credits">
                            {dataSuccess.map((cast)=>(
                                cast.profile_path && cast.character?(
                                    <div key={cast.id} className="card-credits">
                                        <img src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`} className="image-credits"/>
                                        <h1 className="info-credits">{cast.name}</h1>
                                        <h5 className="info-credits">Character: {cast.character}</h5>
                                        <h5 className="info-credits">Department: {cast.department}</h5>
                                    </div>
                                ):(
                                    null
                                )
                            ))}
                        </div>
                    </div>
                ):(
                    <h1 style={{textAlign:'center'}}>THRE IS NOT CAST</h1>
                )}
            
        </div>
    )
}