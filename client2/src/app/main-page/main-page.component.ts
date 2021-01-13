import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"
declare let alertify: any;

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(private router: Router) { }
  Email = '';
  Password = '';
  userDetails = {
    firstName: '',
    _id: '',
    isAdmin: null
  };
  cart = '';
  addedProducts = [];
  itemToEdit = {};
  imageObject = [{
    image: '/img/fruits.jpg',
    thumbImage: '/img/fruits.jpg',
    title: 'פירות יער',
    alt: 'Image alt'
  },{
    image: '/img/ninja.jpg',
    thumbImage: '/img/ninja.jpg',
    alt: 'alt of image',
    title: 'ירקות בבלנדר',
  },{
    image: '/img/shake.jpg',
    thumbImage: '/img/shake.jpg',
    alt: 'alt of image',
    title: 'שייק פירות',
  },{
    image: '/img/icecream.jpg',
    thumbImage: '/img/icecream.jpg',
    alt: 'alt of image',
    title: "גלידות בייתיות",
  }]


  addProductToCart(productId) {
    const objToSend = {productId: productId, cartId: this.cart}
    console.log(objToSend)
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

  logout() {
    fetch('/api/auth/logout')
    .then(() => {
      this.router.navigate(['/login']);
    });
  };

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
      alertify.error('wrong username or password')
    })
  };
  
  
  ngOnInit(): void {
    fetch('/api/auth/userDetails')
    .then(response => response.json())
    .then((data) => {
      this.userDetails = data;
    }).catch((err) => {
      console.log(err);
      // this.router.navigate(['/login']);
    })
    .then(() => {
      console.log(this.userDetails._id)
      fetch(`/api/cart/findCart/${this.userDetails._id}`)
      .then(res => res.json())
      .then(cart => {
        this.cart = cart._id;
      })
    })

  }

}
