import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {API_URL} from '../../environments/environment';
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
@Injectable()
export class ImageCarPredictorService
{
  constructor(private http: HttpClient) {}

  predictCarType(images:{}) : Observable<any>
  {
    const formData = new FormData();
    formData.append('images',  JSON.stringify(images));
    return this.http.post<any>(`${API_URL}/predict_car_type`, formData)
      .pipe(
        catchError(err => {
          console.log(err);
          return of(null);
            })
      );
  }
}
