import { useEffect, useState } from "react"
import { API_KEY, AUTH, AUTHPOST } from "../../App"
import './styles/perfil.css'
export default function DetailsAccount() {
    const getIdUser = localStorage.getItem('user')
    const idUser = JSON.parse(getIdUser)

    const [successAccount, setSuccessAccount] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')


    useEffect(() => {
        setLoading(true);

        fetch(`https://api.themoviedb.org/3/account/${idUser}`, AUTH)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Fetching ERROR Deatils Account');
                }
                return res.json();
            })
            .then((data) => {
                setSuccessAccount(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err);
                setLoading(false);
            });

    }, []);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <h1>{error.message}</h1>;
    }


    return (
        <div className="div-global-perfilDetails">
            <div key={successAccount.id} className="div-semiglobal-perfilDetails">
                {successAccount.avatar && successAccount.avatar.tmdb && successAccount.avatar.tmdb.avatar_path && (
                    <img src={`https://image.tmdb.org/t/p/w500${successAccount.avatar.tmdb.avatar_path}`} className="image-perfil" />
                )}
                <div>
                    <h1 className="title-name-perfil">{successAccount.name}</h1>
                    <p className="title-userName-perfil">{successAccount.username}</p>
                </div>                
            </div>
        </div>
    );
}
