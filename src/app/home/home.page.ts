import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class HomePage implements OnInit {

  items = [
    { id: 1, name: 'Oatmeal with bananas', photo: 'assets/imgs/oatmeal.jpg', price: 18, quantity: 1 },
    { id: 2, name: 'Hamburgers', photo: 'assets/imgs/burger.jpg', price: 20, quantity: 2 },
    { id: 3, name: 'Sea Food', photo: 'assets/imgs/seafood.jpg', price: 12, quantity: 1 },
  ];
  total = 0;
  changeColor!: any[];

  constructor() {}

  ngOnInit(): void {
    this.changeColor = new Array(this.items.length).fill(false);
    for(let i = 0; i < this.items.length; i++) {
      this.total += this.items[i].price * this.items[i].quantity;
    }
  }

  dragItem(event: any, index: number) {
    console.log(event);
    if(event.detail.amount > 30 && !this.changeColor[index]) {
      this.onDragChangeColor(index, true);
    }
    if(event.detail.amount <= 30 && this.changeColor[index]) {
      this.onDragChangeColor(index, false);
    }
  }

  onDragChangeColor(index: number, value: boolean) {
    this.changeColor = new Array(this.items.length).fill(false);
    this.changeColor[index] = value;
  }

  addQuantity(index: number) {
    this.items[index].quantity++;
    this.total += this.items[index].price;
  }

  minusQuantity(index: number) {
    this.total -= this.items[index].price;
    if(this.items[index].quantity > 1) this.items[index].quantity--;
    else {
      this.removeItem(index, false);
    }
  }

  removeItem(index: number, remove = true) {
    if(remove) this.total -= this.items[index].price * this.items[index].quantity;
    this.items = this.items.filter((item) => item.id != this.items[index].id);
    this.changeColor = this.changeColor.filter((item, i) => i != index); 
  }

}
