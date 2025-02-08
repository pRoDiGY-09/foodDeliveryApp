import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from '../../../core/services/restaurants.service';
import { Restaurant } from '../../models/restaurant';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  private restaurants: Restaurant[] = [];

  constructor(private restaurantSerice : RestaurantsService){}

  ngOnInit(): void {
    this.getRestaurants();
  }

  getRestaurants(){
    this.restaurantSerice.getRestaurants().subscribe({
      next: (res) => {
        console.log(res);
        this.restaurants = res;
      },
      error: (err) => {
        console.error('Error:', err);
      }
    });
  }
}
