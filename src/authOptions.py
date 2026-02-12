import base64
import binascii
#from starlette.middleware.authentication import AuthenticationMiddleware
from starlette.authentication import (
    AuthenticationBackend, AuthenticationError, SimpleUser, #UnauthenticatedUser,
    AuthCredentials#, requires
)

class BasicAuthBackend(AuthenticationBackend):
    async def authenticate(self, request):
        print("Siamo in BasicAuthBackend: ", type(request))
        if request.url.path == "/anim":
            form = await request.json()
            print("FORM: ",form)
            try:
                print(request.query_params, " -- ",request.path_params," -- ",request.client," -- ", request.form())
                user= request.query_params["username"]
                passw = request.query_params["password"]
                if user == "anim" and passw == "1324354321":
                    return AuthCredentials(["authenticated",user]), SimpleUser(user)
                else:
                    raise AuthenticationError('Invalid basic auth credentials')
            except Exception as e:
                print("Errore nella login su anim: ",e)
                raise AuthenticationError('Invalid basic auth credentials')
        if "Authorization" not in request.headers:
            return
        auth = request.headers["Authorization"]
        try:
            scheme, credentials = auth.split()
            if scheme.lower() != 'basic':
                return
            decoded = base64.b64decode(credentials).decode("ascii")
        except (ValueError, UnicodeDecodeError, binascii.Error) as exc:
            print("Errore nella decodifica delle credenziali: ",exc)
            raise AuthenticationError('Invalid basic auth credentials')

        username, _, password = decoded.partition(":")
        # TODO: You'd want to verify the username and password here.
        print(f"user={username},password={password}. Decoded: {decoded}")
        return AuthCredentials(["authenticated",username]), SimpleUser(username)

#middleware = [
#    Middleware(AuthenticationMiddleware, backend=BasicAuthBackend())
#]