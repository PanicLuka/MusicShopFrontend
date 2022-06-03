import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, ParamMap, Params, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isShown: boolean = true;
  currentRoute!: string;
  currentRouteId!: string;
  user!: User;
  cartListCount: number = 0;
  searchTerm!: string;

  constructor(private cartService: CartService, private activatedRoute: ActivatedRoute, private router: Router,
    private userService: UserService) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    )
      .subscribe(event => {
        this.currentRoute = event.toString();
        this.currentRouteId = this.currentRoute.charAt(28);
        // console.log(this.currentRouteId);
        if (this.currentRouteId === 'l' || this.currentRouteId === 'r') {
          this.isShown = false;
        }


      });



  }



  ngOnInit(): void {
    this.cartService.getCartProducts()
      .subscribe(res => {
        this.cartListCount = res.length;
      })


  }

  toShoppingCart() {
    this.router.navigate(['/cart'])
  }

  toProfilePage() {
    this.router.navigate(['/profile'])
  }
  search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    // console.log(this.searchTerm);

    this.cartService.search.next(this.searchTerm);
  }

  profileIcon(): boolean {
    let token = localStorage.getItem('JWT_NAME');
    // console.log('this is token' + token)
    if (token === null) {
      return false;
    } else {
      return true;
    }

  }

}
