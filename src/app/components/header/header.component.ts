import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, ParamMap, Params, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
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

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private userService: UserService) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    )
      .subscribe(event => {
        this.currentRoute = event.toString();
        this.currentRouteId = this.currentRoute.charAt(28);
        console.log(this.currentRouteId);
        if (this.currentRouteId === 'l' || this.currentRouteId === 'r') {
          this.isShown = false;
        }
      });

    console.log();

  }



  ngOnInit(): void {
    // this.router.events.pipe(
    //   filter(event => event instanceof NavigationEnd)
    // )
    //   .subscribe(event => {
    //     console.log(event);
    //   });



    // this.router.events.subscribe((url: any) => console.log(url));
    // console.log(this.router.url);  

    // if (this.currentRouteId === '1' || this.currentRouteId === '3') {
    //   this.isShown = false;
    // }
    // this.route.paramMap.subscribe(
    //   (params: ParamMap) => {

    //     console.log(params.get(this.loginRoute))

    //   }
    // )
    // let r = this.activatedRoute.url;
    // this.activatedRoute.paramMap.subscribe((params) => {
    //   this.registerRoute = params.get('login')!;
    // });
    // console.log(this.router.url);
  }


}
