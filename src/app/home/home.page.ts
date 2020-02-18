import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import * as moment from 'moment';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  myDate = new Date().toISOString();

  years: any;
  months: any;
  days: any;
  // from other function
  startDate = new Date().toISOString()
  startdateMoment: moment.Moment;
  enddateMoment: moment.Moment;

  constructor(public toastController: ToastController) {}

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'you Can not Select future Date',
      duration: 1500,
      //  cssClass :'yourClass',
      position: 'top'
    });
    toast.present();
  }
  birthdayData() {
  this.daysUntil(this.myDate)
    if (new Date() < new Date(this.myDate)) {
      this.presentToast();
      return;
    }
    this.startdateMoment = moment(this.myDate);
    this.enddateMoment = moment(this.startDate);
    if (this.startdateMoment.isValid() === true && this.enddateMoment.isValid() === true) {
      this.years = this.enddateMoment.diff(this.startdateMoment, 'years');
      this.months = this.enddateMoment.diff(this.startdateMoment, 'months') - (this.years * 12);
      this.startdateMoment.add(this.years, 'years').add(this.months, 'months');
      this.days = this.enddateMoment.diff(this.startdateMoment, 'days')
      return {
        years: this.years,
        months: this.months,
        days: this.days
      };
    }
    else {
      return undefined;
    }
  }
daysUntil(date) {
  console.log(date)
  var birthday = moment(date);
  
  var today = moment().format("YYYY-MM-DD");
  var age = moment(today).diff(birthday, 'years');
  moment(age).format("YYYY-MM-DD");
  var nextBirthday = moment(birthday).add(age, 'years');
  moment(nextBirthday).format("YYYY-MM-DD");
  
  /* added one more year in case the birthday has already passed
  to calculate date till next one. */
  if (nextBirthday.isSame(today)) {
    return 'Cake!!';
  } else {
    nextBirthday = moment(birthday).add(age + 1, 'years');
   var data= 'Days until next birthday' + ' ' + nextBirthday.diff(today, 'days');
  }
  console.log(data);
}
}



