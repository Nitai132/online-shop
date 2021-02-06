import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
declare let alertify: any;

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  constructor(private router: Router, public mediaObserver: MediaObserver) { }
  mediaSub: Subscription;
  deviceXs: boolean;
  Email = '';
  Password = '';
  userDetails = {
    firstName: '',
    _id: '',
    isAdmin: null
  };
  items = [];
  cart = '';
  addedProducts = [];
  itemToEdit = {};
  imageObject = [{
    image: '/img/mainImg1.jpg',
    thumbImage: '/img/mainImg1.jpg',
    alt: 'Image alt'
  },{
    image: '/img/mainImg2.jpg',
    thumbImage: '/img/mainImg2.jpg',
    alt: 'Image alt'
  },{
    image: '/img/mainImg3.jpg',
    thumbImage: '/img/mainImg3.jpg',
    alt: 'Image alt'
  },{
    image: '/img/mainImg4.jpg',
    thumbImage: '/img/mainImg4.jpg',
    alt: 'Image alt'
  },{
    image: '/img/mainImg5.jpg',
    thumbImage: '/img/mainImg5.jpg',
    alt: 'alt of image',
  },{
    image: '/img/mainImg6.jpg',
    thumbImage: '/img/mainImg6.jpg',
    alt: 'alt of image',
  }]


  addProductToCart(productId) {
    const objToSend = {productId: productId, cartId: this.cart}
    fetch('/api/cart/addProduct', {
      method: 'POST',
      mode: 'cors', 
      cache: 'no-cache',
      credentials:'include',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow', 
      referrerPolicy: 'no-referrer', 
      body: JSON.stringify(objToSend)
    })
    .then(res => res.json())
    .then(data => {
      if (data.itemExists) {
        alertify.error(data.itemExists)
      } else {
        this.addedProducts = data.productId
      }
    })
  }

  unsignedCartUpdated(items) {
    this.items = items
  }

  logout() {
    fetch('/api/auth/logout')
    .then(() => {
      window.location.reload();
    });
  };

  openIG() {
    window.open("//" + 'www.instagram.com/super_fruit_israel/', '_blank');
  }

  openFB() {
    window.open("//" + 'www.facebook.com/Fruits-Co-109454277622361', '_blank');
  }

  editProduct(editDetailsObj) {
    this.itemToEdit = editDetailsObj;
  }

  onPasswordChange({target: {value}}) {
    this.Password = value;
  };

  onEmailChange({target: {value}}) {
    this.Email = value;
  };

  login() {
    const objToSend = {username: this.Email, password: this.Password}
    fetch('/api/auth/login', {
      method: 'POST',
      mode: 'cors', 
      cache: 'no-cache',
      credentials:'include',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow', 
      referrerPolicy: 'no-referrer', 
      body: JSON.stringify(objToSend)
    })
    .then((res) => res.json())
    .then((data) => {
        this.userDetails = data;
        window.location.reload();
      }).catch(() => {
      alertify.error('שם המשתמש או הסיסמא אינם נכונים')
    })
  };
  
  
  ngOnInit(): void {
    this.mediaSub = this.mediaObserver.media$.subscribe((result:MediaChange)=>{
      this.deviceXs = result.mqAlias === 'xs' ? true : false;  
    });
    fetch('/api/auth/userDetails')
    .then(response => response.json())
    .then((data) => {
      this.userDetails = data;
    }).catch((err) => {
      // this.router.navigate(['/login']);
    })
    .then(() => {
      fetch(`/api/cart/findCart/${this.userDetails._id}`)
      .then(res => res.json())
      .then(cart => {
        this.cart = cart._id;
      })
    })
  }

  ngOnDestroy() {
    this.mediaSub.unsubscribe();
  }

}
