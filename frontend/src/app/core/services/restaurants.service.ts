import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, tap, catchError } from 'rxjs';
import { Restaurant } from '../../shared/models/restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {
  private restaurantsUrl = 'http://localhost:3000/api/restaurants';

  constructor(private http : HttpClient) { }

  getRestaurants() : Observable<Restaurant[]>{
    return this.http.get<Restaurant[]>(this.restaurantsUrl).pipe(
      tap(response => {
        console.log('Restaurants:', response);
       }),
      catchError(this.errorHandler)
    );
  }

  errorHandler(error : HttpErrorResponse) {
    console.error('Error:', error);
    return throwError(() => new Error('An error occurred. Please try again later.'));
  }
}
