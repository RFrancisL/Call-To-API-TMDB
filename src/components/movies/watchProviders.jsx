import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { AUTH } from "../../App";
import '../movies/styles/watchProviders.css'

export default function Providers() {
  const { id } = useParams();

  const [dataSuccess, setDataSuccess] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);

    fetch(`https://api.themoviedb.org/3/movie/${id}/watch/providers`, AUTH)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Fetching ERROR Alternative Titles');
        }
        return res.json();
      })
      .then((data) => {
        if (data.results && typeof data.results === 'object') {
          const uniqueProviders = [];

          // Convierto data.results en un array con Object.values
          Object.values(data.results).forEach((provider) => {

            // Filtramos y agregamos los proveedores únicos
            if (provider.flatrate) {
              provider.flatrate.forEach((flatrate) => {
                // Verifica si el proveedor ya existe en el array de proveedores unicos
                const isDuplicate = uniqueProviders.some((existingProvider) =>
                    existingProvider.provider_id === flatrate.provider_id &&
                    existingProvider.provider_name === flatrate.provider_name
                );

                // Solo agregamos el proveedor si no es un duplicado
                if (!isDuplicate) {
                  uniqueProviders.push({
                    provider_id: flatrate.provider_id,
                    provider_name: flatrate.provider_name,
                    logo_path: flatrate.logo_path
                  });
                }
              });
            }
          });

          setDataSuccess(uniqueProviders);
        } else {
          console.error('No se encontraron resultados o no es un objeto');
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <h1>LOADING...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div className="div-global-provders">
      {dataSuccess.length === 0 ? (
        <div>
          <h5>Providers do NOT Exist!</h5>
        </div>
        
      ) : 
        dataSuccess.map((prov, index)=>(
          <div key={`${prov.provider_id}_${index}`} className="provider">
            <img src={`https://image.tmdb.org/t/p/w500${prov.logo_path}`} className="image-providers" alt={prov.provider_name} />
            <p className="names-provider">{prov.provider_name}</p>
          </div>
        ))
      }
    </div>
  );
}
