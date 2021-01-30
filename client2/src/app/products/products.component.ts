import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
declare let alertify: any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  categories = [
    {
      name: '',
      _id: ''
    }
  ]
  selectedCategory = '';
  products = [];
  filteredArray = [];
  categoryName = 'פירות קפואים'
  constructor() { }
  @Output() productAdded = new EventEmitter<string>();
  @Output() productEdit = new EventEmitter<object>();
  @Input() isAdmin: Number;
  @Input() deviceXs: boolean;


  filterProducts({target: {value}}) {
    const filteredArray = this.products.filter(filtered => filtered.name.toLowerCase().includes(value))
    this.filteredArray = filteredArray
  }

  selectedChanged(val) {
    this.selectedCategory = val;
    fetch(`/api/categories/getName/${this.selectedCategory}`)
    .then( res => res.json())
    .then(name => {
      this.categoryName = name;
      fetch(`/api/products/getByCategory/${this.selectedCategory}`)
        .then(res => res.json())
        .then(data => {
        this.products = data;
        this.filteredArray = data;
      });
    })
  };

  selectedChangedMobilie({target}) {
    this.selectedCategory = target.value;
    fetch(`/api/categories/getName/${this.selectedCategory}`)
    .then( res => res.json())
    .then(name => {
      this.categoryName = name;
      fetch(`/api/products/getByCategory/${this.selectedCategory}`)
      .then(res => res.json())
      .then(data => {
        this.products = data;
        this.filteredArray = data;
      });
    })

  };

  addProductToCart(productId) {
    this.productAdded.emit(productId);
  }

  editProduct(id, name, price, img) {
    const editObj = {id, name, price, img};
    this.productEdit.emit(editObj)
  };

  unsignedAlert() {
    alertify.error('עלייך להתחבר כדי לרכוש מוצרים')
  }

  ngOnInit(): void {
    fetch('/api/categories/all')
    .then(res => res.json())
    .then(data => {
      this.categories = data;
      this.selectedCategory = this.categories[1]._id;
    }).then(() => {
      fetch(`/api/products/getByCategory/${this.selectedCategory}`)
      .then(res => res.json())
      .then(data => {
        this.products = data;
        this.filteredArray = data;
      }) 
    })   

  }

}
