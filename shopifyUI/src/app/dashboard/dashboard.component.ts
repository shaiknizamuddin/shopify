/**
 * @author nizamuddin.shaik@gmail.com
 */

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { OrdersService } from '../orders.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [OrdersService]
})
export class DashboardComponent implements OnInit {

  constructor(private _OrdersService: OrdersService, private _router: Router, ) { }
  public orders: any;
  @ViewChild('closeModel', { static: true }) closeModel: ElementRef;
  public showAlert;
  public message;
  public orderObj = {
    email: '',
    phone: '',
    id: ''
  }
  ngOnInit() {
    this.fetchOrders();
  }

  /**
   * @description This method is used to fetch all orders from DB
   */

  fetchOrders() {
    this._OrdersService.fetchOrders().subscribe((result) => {
      if (result) {
        this.orders = result.data;
      }
    }, (error) => {
      console.log('error', error)
    })
  }

  /**
   * @description This method opens the edit popup and displays selected order details
   */

  editOrder(order) {
    this.orderObj = {
      email: order.order.email,
      phone: order.order.phone,
      id: order._id
    }
  }

  /**
   * @description this method is used to update the given order and save back to db
   */


  updateOrder() {
    this.showAlert = false;
    this._OrdersService.updateOrder(this.orderObj).subscribe((result) => {
      this.fetchOrders();
      this.closeModel.nativeElement.click();
      this.showAlert = true;
      this.message = `Order Updated successfully`;
    }, (error) => {
      console.log('error', error);
    })
  }

}
