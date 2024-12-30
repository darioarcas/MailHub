#`MailHub - Aplicación para visualizar mails de OutLook`


# Tecnologías

· HTML
· CSS
· JavaScript
· React
· Bootstrap
· Vite


# Uso

Para empezar puesdes descargar el contenido en un zip, ó si lo prefieres puedes clonar el repositorio con `git clone https://github.com/darioarcas/MailHub`. Luego instala las dependencias con `npm install` y para servir la pagina localmente `npm run dev` y eso es todo. Si prefieres ver la `demo` esta desplegada en GitHub pages en el `about` de este repositorio, osea en la parte superior derecha.


# Descripción

Esta aplicación está realizada con la API brindada por Microsoft `Microsoft Graph API`, esta permite la autenticacion del usuario con una cuenta previa, para este caso utilizamos el servicio de mensajeria electrónica de OutLook. Esta app (MailHub) realiza la autenticación, por medio de ella se le conceden permisos para la lectura de mensajes del usuario, se mostraran en pantalla los mensajes del buzón de entrada del usuario autenticado.




# Documentación


Aplicación de página única: Adquisición de un token para llamar a una API:
· https://learn.microsoft.com/es-es/entra/identity-platform/scenario-spa-acquire-token?tabs=react


Usar la API de REST de Correo de Outlook:
· https://learn.microsoft.com/es-mx/graph/api/resources/mail-api-overview?view=graph-rest-1.0&utm_source=chatgpt.com


Obtener mensaje:
· https://learn.microsoft.com/es-mx/graph/api/message-get?view=graph-rest-1.0&tabs=javascript#code-try-2


Probar endpoint sin cuenta:
· https://developer.microsoft.com/en-us/graph/graph-explorer