import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router"
declare let alertify: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  constructor(private _formBuilder: FormBuilder, private router: Router) {}
  email = '';
  password = '';
  confirmPassword = '';
  city='';
  street='';
  firstName='';
  lastName='';
  Email = '';
  Password = '';
  userDetails = {
    firstName: '',
    _id: '',
    isAdmin: null
  };

  openIG() {
    window.open("//" + 'www.instagram.com/super_fruit_israel/', '_blank');
  }

  openFB() {
    window.open("//" + 'www.facebook.com/Fruits-Co-109454277622361', '_blank');
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
  

  register() {
    const objToSend = {
        firstName: this.firstName,
        lastName: this.lastName, 
        email: this.email, 
        password: this.password, 
        city: this.city, 
        street: this.street
      }
    fetch('/api/auth/signup', {
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
    .then(()=> {
      this.router.navigate(['/login']);
    })
    .catch((err) => {
      alertify.error('something went wrong')
      console.log(err)
    })
  }
  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
}
