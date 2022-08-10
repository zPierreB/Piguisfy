import { Injectable } from '@angular/core';
import { Profil } from './Profil';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

    // Node/Express API
    REST_API: string = 'http://localhost:8080/APIPiguisfy';

    //Http Header
    httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

    constructor(private httpClient: HttpClient) { }

    //Add a new profil
    AddProfil(data: Profil): Observable<any> {
        let API_URL = `${this.REST_API}`;
        return this.httpClient.post(API_URL, data)
            .pipe(
                catchError(this.handleError)
            )
    }

    //Error
    handleError(error: HttpErrorResponse) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            //Handle Client error
            errorMessage = error.error.message;
        } else {
            //Handle server error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }
}
