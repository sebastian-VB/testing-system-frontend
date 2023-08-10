import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";

//se utiliza para interceptar las solicitudes realizadas antes de que se envien al servidor
@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private loginSvc: LoginService){}

    //en esta peticion se esta estableciendo el token
    //la solicitud original se clona para que pueda modificarse sin afectar la original
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authreq = req;
        const token = this.loginSvc.getToken();
        if(token !== null){
            authreq = authreq.clone({
                //se agrega el encabezado de autorizacion
                setHeaders: {Authorization: `Bearer ${token}`}
            });
        }

        //se devuelve la solicitud (la original o la clonada)
        // al siguiente interceptor o directo al servidor
        return next.handle(authreq);
    }

}

//se utiliza para proporcionar el interceptor como un proveedor en el módulo raíz de la aplicación
//Al agregarlo como un proveedor para el token HTTP_INTERCEPTORS, Angular lo reconoce y lo utiliza automáticamente para interceptar todas las solicitudes HTTP.
export const authInterceptorProviders = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
    }
];


