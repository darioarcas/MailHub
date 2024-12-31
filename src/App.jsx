import React, { useEffect, useRef, useState } from 'react';

  import { PageLayout } from './components/PageLayout';
  import { loginRequest } from './authConfig';
  import { callMsGraph } from './graph';
//   import { ProfileData } from './components/ProfileData';

  import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';

  import './App.css';

//   import Button from 'react-bootstrap/Button';






  /**
* Renders information about the signed-in user or a button to retrieve data about the user
*/


const ProfileContent = () => {
    const { instance, accounts } = useMsal();
    const [graphData, setGraphData] = useState(null);
    const [respuestaMensajes, setRespuestaMensajes] = useState("");
    const [profilePhoto, setProfilePhoto] = useState("");


    useEffect(()=>{
        mensajes();
        RequestProfileData()
    }, []);

    function RequestProfileData() {
        // Silently acquires an access token which is then attached to a request for MS Graph data
        instance
            .acquireTokenSilent({
                ...loginRequest,
                account: accounts[0],
            })
            .then((response) => {
                callMsGraph(response.accessToken).then((response) => setGraphData(response));
            });
    }

    const mensajes = ()=>{
        const request = {
        scopes: ["https://graph.microsoft.com/Mail.Read"],
        account: accounts[0],
        };

        if (!accounts || accounts.length === 0) {
            console.error("No hay cuentas activas. Por favor, inicia sesión.");
            return;
          }
        
        instance
        .acquireTokenSilent(request)
        .then((response) => {
            const accessToken = response.accessToken;
            // Utiliza el token de acceso para realizar solicitudes a Microsoft Graph
            fetchEmails(accessToken);
        })
        .catch((error) => {
            // Maneja errores y considera métodos interactivos si es necesario
        });
    }


    



    // Función para obtener la foto de perfil
    const fetchProfilePhoto = async (accessToken) => {
        try {
            const response = await fetch(
                "https://graph.microsoft.com/v1.0/me/photo/$value",
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            if (response.ok) {
                const blob = await response.blob();
                setProfilePhoto(URL.createObjectURL(blob));
            } else {
                console.warn("No se pudo cargar la foto de perfil.");
            }
        } catch (error) {
            console.error("Error al obtener la foto de perfil:", error);
        }
    };









    const fetchEmails = async (accessToken) => {
        const response = await fetch(
            "https://graph.microsoft.com/v1.0/me/messages?$select=from,bodyPreview,receivedDateTime",
            {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            }
        );
        
        if (response.ok) {
            const data = await response.json();
            // Procesa los correos electrónicos obtenidos
            console.log("Mensajes recibidos:", data.value);
            data.value.forEach((email) => {
                console.log("De:", email.from.emailAddress.address);
                console.log("Cuerpo:", email.bodyPreview);
                console.log("Fecha y Hora:", email.receivedDateTime);
            });

            
            // Obtener correos electrónicos
            setRespuestaMensajes(data.value); // mailsFiltered
            
            // Obtener la foto de perfil
            fetchProfilePhoto(accessToken);

            // Precargar fotos de remitentes
            for (const email of data.value) {
                if (email.from && email.from.emailAddress && email.from.emailAddress.address) {
                    fetchSenderPhoto(email.from.emailAddress.address, accessToken);
                }
            }
            // return data.value; // Devuelve los correos para usarlos en la interfaz
        } else {
            // Manejo de errores en la solicitud
            const error = await responseEmails.json();
            console.error("Error al obtener correos:", error);
        }
        if (!response.ok) {
        const error = await response.json();
        console.error("Error en la solicitud de correos:", error);
        return;
        }
    };




    return (
        <>
            {(profilePhoto === null) && <h5 className="card-title">Hola! {accounts[0].name}</h5>}
            <br/>




            {/* Foto y Nombre de Perfil */}
            <section className='d-flex justify-content-center'>

                <div style={{ display: "flex", alignItems: "center", marginBottom: "20px"}}>
                    {profilePhoto ? (
                        <img
                            src={profilePhoto}
                            alt="Perfil"
                            style={{
                                borderRadius: "50%",
                                width: "60px",
                                height: "60px",
                                marginRight: "15px",
                            }}
                        />
                    ) : (
                        <div
                            style={{
                                borderRadius: "50%",
                                width: "60px",
                                height: "60px",
                                backgroundColor: "#ccc",
                                marginRight: "15px",
                            }}
                        ></div>
                    )}
                    <h4>{accounts[0]?.name || "Usuario"}</h4>
                </div>
            </section>















            {/* {graphData ? (
                <ProfileData graphData={graphData} />
            ) : (
                <Button variant="secondary" onClick={RequestProfileData}>
                    Consultar Información de Perfil
                </Button>
            )} */}

                {/* <Button variant="info" onClick={mensajes}>
                    Consultar Mensajes
                </Button> */}

                {respuestaMensajes && respuestaMensajes.map(item=>{
                    return <div className='mb-5'>
                        <div className="card text-bg-dark tarjeta">
                            <img src={`${import.meta.env.BASE_URL}img/fondo-1.jpg`} className="mensaje-tarjeta card-img opacity-50" alt="fondo de mensaje"/>
                            {/* <div className=' mensaje-tarjeta card-img'/> */}
                            <div className="card-img-overlay">
                                <h5 className="card-title">{item.from.emailAddress.name}</h5>
                                <textarea className="card-text">{item.bodyPreview}</textarea>
                                <p className="card-text"><small>{item.from.emailAddress.address}</small></p>
                                <p className="card-text"><small>{item.receivedDateTime}</small></p>
                            </div>
                        </div>
                    </div>
                })}
        </>
    );
};




/**
* If a user is authenticated the ProfileContent component above is rendered. Otherwise a message indicating a user is not authenticated is rendered.
*/
const MainContent = () => {
    return (
        <div className="App">
            <AuthenticatedTemplate>
                <ProfileContent />
            </AuthenticatedTemplate>

            <UnauthenticatedTemplate>
                <h5>
                    <center>
                        Por favor inicie sesión para acceder a su información.
                    </center>
                </h5>
            </UnauthenticatedTemplate>
        </div>
    );
};





export default function App() {
    return (
        <PageLayout >
            <center>
                <MainContent/>
            </center>
        </PageLayout>
    );
}