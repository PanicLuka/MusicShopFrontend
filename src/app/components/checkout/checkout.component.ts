import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { CreditCard } from 'src/app/models/credit-card';
import { DestinationAddress } from 'src/app/models/destination-address';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { DestinationAddressService } from 'src/app/services/destination-address.service';
import { loadStripe } from '@stripe/stripe-js';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/order';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { Toast, ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { Basket } from 'src/app/models/Basket';
import { BehaviorSubject } from 'rxjs';

declare var Stripe: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements AfterViewInit, OnDestroy {
  @ViewChild('cardNumber', { static: true }) cardNumberElement!: ElementRef;
  @ViewChild('expiryDate', { static: true }) expiryDateElement!: ElementRef;
  @ViewChild('cvv', { static: true }) cvvElement!: ElementRef;

  // cardHandler = this.onChange.bind(this);




  constructor(private router: Router, private destinationService: DestinationAddressService
    , private creditCardService: CreditCardService, private orderService: OrderService
    , private userService: UserService, private toastrService: ToastrService,
    private cartService: CartService
  ) { }

  basket!: Basket;
  destination!: DestinationAddress;
  creditCard!: CreditCard;
  order!: Order;
  user!: User;
  currUserEmail!: string;

  address!: string;
  phoneNumber!: string;
  city!: string;
  state!: string;
  zipCode!: string;

  stripe!: any;

  creditCardName!: any;
  cardNumber!: any;
  expiryDate!: any;
  cvv!: any;
  cardErrors!: any;
  basketId = new BehaviorSubject<number>(0);
  currBasketId!: number;
  loading = false;



  async ngAfterViewInit() {
    this.cartService.getCurrentBasket()
      .subscribe(res => {
        this.currBasketId = res;
        this.basketId.next(this.currBasketId);


      });




    this.stripe = await loadStripe('pk_test_51LFHAbHemepqI4Zpi8EEzlJXP8GVx4WnCiAxkvpR6CKTOaiL9XjwAd6h0KI9gH16s5ARh8nQJl02KrGAsx9lY5gK001b5iuMGz')



    var elements = this.stripe!.elements();


    this.cardNumber = elements.create('cardNumber');
    this.cardNumber.mount('#cardNumber');
    this.cardNumber.addEventListener('change', function (event: any) {
      var displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError!.textContent = event.error.message;

      } else {
        displayError!.textContent = '';
      }
    });

    this.expiryDate = elements.create('cardExpiry');
    this.expiryDate.mount('#expiryDate');
    this.expiryDate.addEventListener('change', function (event: any) {
      var displayError = document.getElementById('card-error');
      if (event.error) {
        displayError!.textContent = event.error.message;

      } else {
        displayError!.textContent = '';
      }
    });


    this.cvv = elements.create('cardCvc');
    this.cvv.mount('#cvv');
    // this.cvv.addEventListener('change', function (event: any) {
    //   var displayError = document.getElementById('card-errors');
    //   if (event.error) {
    //     displayError!.textContent = event.error.message;

    //   } else {
    //     displayError!.textContent = '';
    //   }
    // });


    // this.expireDate.elements.create('expireDate');
    // this.expireDate.mount(this.expireDate);

    // this.cvv.elements.create('cvv');
    // this.cvv.mount(this.cvv);


  }

  ngOnDestroy(): void {
    this.cardNumber.destroy();
    this.expiryDate.destroy();
    this.cvv.destroy();
  }



  onChange(error: any) {
    if (error) {
      this.cardErrors = error.message;
    } else {
      this.cardErrors = null;
    }
  }



  purchase() {



    this.cartService.getBasketById(this.basketId.getValue())
      .subscribe(res => {
        this.basket = res;

        this.destination = {
          destinationAddressId: 0,
          address: this.address,
          phoneNumber: this.phoneNumber,
          city: this.city,
          country: this.state,
          zipCode: this.zipCode
        }


        localStorage.setItem('address', JSON.stringify(this.destination));

        this.destinationService.createDestinationAddress(this.destination)
          .subscribe(res => {
            console.log();

          }), (err: Error) => {
            console.log(err.name + ' ' + err.message);
          }

        this.currUserEmail = this.userService.getCurrentUserEmail();



        this.userService.getUserByEmail(this.currUserEmail)
          .subscribe(res => {
            this.user = res;

            this.order = {
              orderId: 0,
              orderDate: new Date(),
              orderArrival: false,
              PaymentType: 'creditCard',
              orderStatus: 'Pending',
              userId: this.user.userId,
              destinationAddressId: 1,
              creditCardId: 1
            }



            this.orderService.createOrder(this.order)
              .subscribe(async res => {
                console.log();
                this.toastrService.success('Order created successfully');

                this.stripe!.confirmCardPayment(this.basket.clientSecret!, {
                  payment_method: {
                    card: this.cardNumber,
                    billing_details: {
                      name: this.creditCardName
                    }
                  }
                }).then((result: any) => {
                  console.log();

                  if (result.paymentIntent) {
                    this.cartService.removeAllCartItems();
                    this.cartService.resetCustomerBasket(this.basketId.getValue())
                      .subscribe(res => {
                        console.log(res);
                      }), (err: Error) => {
                        console.log(err.message + ' ' + err.name);
                      };

                    // const navigationExtras: NavigationExtras = {state: order};
                    this.router.navigate(['/home']);

                  } else {
                    this.toastrService.error(result.error.message);
                  }
                });

              }, (err) => {
                this.toastrService.error(err.message);
                console.log(err);
              })

          })
      })












    // this.creditCard = {
    //   creditCardId: 0,
    //   creditCardNumber: this.cardNumber,
    //   expireDate: this.expireDate,
    //   cvv: this.cvv
    // }


    // localStorage.setItem('creditCard', JSON.stringify(this.creditCard));
    // this.creditCardService.createCreditCard(this.creditCard)
    //   .subscribe(res => {
    //     console.log(res);
    //   }), (err: Error) => {
    //     console.log(err.name + ' ' + err.message);
    //   }


    // this.router.navigate(['/payment'])
  }

  toCart() {
    this.router.navigate(['/payment'])
  }

}


