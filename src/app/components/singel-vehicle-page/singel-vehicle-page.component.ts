import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarService } from '../../service/car.service';
import { MaintanceService } from '../../service/maintance.service';
import { RentService } from '../../service/rent.service';
import * as XLSX from 'xlsx';
import { CarRentResponse, CarrentService } from '../../service/carrent.service';

@Component({
  selector: 'app-singel-vehicle-page',
  templateUrl: './singel-vehicle-page.component.html',
  styleUrls: ['./singel-vehicle-page.component.css'] // Plural corrected
})
export class SingelVehiclePageComponent implements OnInit {



  constructor(private route: ActivatedRoute, private carService: CarService, private maintainService: MaintanceService, private rentService: RentService, private carRentService: CarrentService) { }

  car_id: number | null = null;
  ownership: string | undefined;
  car: any = null;
  car_no: string | undefined;
  maintances: any[] = [];
  rents: any[] = [];
  rentcars: any[] = [];
  totalIncome: number = 0;
  totalMaintance: number = 0;
  totalRentPayment: number = 0;
  filteredRents: any[] = [];
  filteredMaintenances: any[] = [];
  filteredRentCars: any[] = [];


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.car_id = +id;
      console.log(this.car_id);
      this.loadCarData();
    }
  }

  // after find vehicle id load car details
  loadCarData() {
    if (this.car_id !== null) {
      console.log('Vehicle Registration Number:', this.car_id);
      this.carService.getCarById(this.car_id).subscribe(
        (response) => {
          this.car = response;
          console.log(this.car);
          if (this.car && this.car.car_reg_no) {
            this.car_no = this.car.car_reg_no;
            this.ownership = this.car.ownership;
            console.log(this.ownership);
            this.loadMaintainData(this.car_no);
            this.loadRentData(this.car_no);
            this.loadRentCarData(this.car_no);

          }
        },
        error => {
          console.error('Error loading car Data', error);
        }
      );
    } else {
      console.error('Car ID is null');
    }
  }

  // load Rent car details
  loadRentCarData(car_number: any) {
    this.carRentService.getRentCarByCarNumber(car_number).subscribe(
      (rentcars) => {
        this.rentcars = rentcars;
        this.filteredRentCars = [...this.rentcars]; // Initialize filtered array
        this.calculateTotalRentPayment();
      },
      (error) => {
        console.log('Error fetching Rent Cars', error);
      }
    );
  }



  // load car maintenance details
  loadMaintainData(car_reg_number: any) {
    this.maintainService.getMaintanceByCarNumber(car_reg_number).subscribe(
      (maintances) => {
        this.maintances = maintances;
        this.filteredMaintenances = [...this.maintances];
        this.calculateTotalMaintance();
      },
      (error) => {
        console.error('Error fetching Maintenance', error);
      }
    );
  }

  // load Rent Data 
  loadRentData(car_reg_no: any) {
    this.rentService.getRentByCarNumber(car_reg_no).subscribe(
      (rents) => {
        this.rents = rents;
        this.filteredRents = [...this.rents];
        this.calculateTotalIncome();
      },
      (error) => {
        console.error('Error fetching rents', error);
      }
    )
  }

  // filtering maintenance Data
  filterMaintenanceData(event: Event) {
    const filterType = (event.target as HTMLSelectElement).value;
    const now = new Date();

    this.filteredMaintenances = this.maintances.filter(maintenance => {
      const maintenanceDate = new Date(maintenance.m_date);
      switch (filterType) {
        case 'week':
          return this.isWithinLastWeek(maintenanceDate, now);
        case 'month':
          return this.isWithinLastMonth(maintenanceDate, now);
        case 'year':
          return this.isWithinLastYear(maintenanceDate, now);
        default:
          return true;
      }
    });

    console.log(this.filteredMaintenances);  // Check the filtered data in the console

    this.totalMaintance = this.filteredMaintenances.reduce(
      (sum, maintenance) => sum + parseFloat(maintenance.m_price), 0
    );
  }


  // Filter Rent Data 
  filterRentData(event: Event) {
    const filterType = (event.target as HTMLSelectElement).value;
    const now = new Date();

    this.filteredRents = this.rents.filter(rent => {
      const rentDate = new Date(rent.r_start_date);
      switch (filterType) {
        case 'week':
          return this.isWithinLastWeek(rentDate, now);
        case 'month':
          return this.isWithinLastMonth(rentDate, now);
        case 'year':
          return this.isWithinLastYear(rentDate, now);
        default:
          return true;
      }
    });

    // Correcting the total income calculation
    this.totalIncome = this.filteredRents.reduce((sum, rent) => sum + parseFloat(rent.r_price), 0);
  }

  filterRentCarData(event: Event) {
    const filterType = (event.target as HTMLSelectElement).value;
    console.log('Filter type selected:', filterType); // Log the selected filter type
    const now = new Date();

    this.filteredRentCars = this.rentcars.filter(rentcar => {
      const rentCarDate = new Date(rentcar.pay_date); // Correct variable name
      switch (filterType) {
        case 'week':
          return this.isWithinLastWeek(rentCarDate, now);
        case 'month':
          return this.isWithinLastMonth(rentCarDate, now);
        case 'year':
          return this.isWithinLastYear(rentCarDate, now);
        default:
          return true;
      }
    });

    // Correcting the total rent payment calculation
    this.totalRentPayment = this.filteredRentCars.reduce((sum, rentcar) => sum + parseFloat(rentcar.rent_payment), 0);
  }



  isWithinLastWeek(date: Date, now: Date): boolean {
    const oneWeekAgo = new Date(now);
    oneWeekAgo.setDate(now.getDate() - 7);
    return date >= oneWeekAgo && date <= now;
  }

  isWithinLastMonth(date: Date, now: Date): boolean {
    const oneMonthAgo = new Date(now);
    oneMonthAgo.setMonth(now.getMonth() - 1);
    return date >= oneMonthAgo && date <= now;
  }

  isWithinLastYear(date: Date, now: Date): boolean {
    const oneYearAgo = new Date(now);
    oneYearAgo.setFullYear(now.getFullYear() - 1);
    return date >= oneYearAgo && date <= now;
  }

  calculateTotalMaintance() {
    this.totalMaintance = this.maintances.reduce((sum, maintance) => sum + (parseFloat(maintance.m_price) || 0), 0);
  }

  calculateTotalIncome() {
    this.totalIncome = this.rents.reduce((sum, rent) => sum + (parseFloat(rent.r_price) || 0), 0);
  }
  calculateTotalRentPayment() {
    this.totalRentPayment = this.rentcars.reduce((sum, rentcar) => sum + (parseFloat(rentcar.rent_payment) || 0), 0);
  }

  openImage(imageUrl: string) {
    const popup = window.open('', '_blank', 'width=800,height=600');
    if (popup) {
      popup.document.write(`<html><head><title>Image</title></head><body><img src="${imageUrl}" style="width:100%; height:auto;" /></body></html>`);
      popup.document.close();
    }
  }

  downloadRentData() {
    const truncatedRents = this.filteredRents.map(rent => ({
      r_start_date: rent.r_start_date,
      r_end_date: rent.r_end_date,
      r_distance: rent.r_distance,
      r_price: rent.r_price,
    }));

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(truncatedRents, { header: ["r_start_date", "r_end_date", "r_distance", "r_price"] });
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Rents");

    XLSX.writeFile(wb, 'IncomeData.xlsx');
  }

  downloadMaintainData() {
    const truncatedMaintances = this.filteredMaintenances.map(maintance => ({
      m_description: maintance.m_description,
      m_date: maintance.m_date,
      m_price: maintance.m_price,
    }));

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(truncatedMaintances, { header: ["m_description", "m_date", "m_price"] });
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Maintance");

    XLSX.writeFile(wb, 'MaintanceData.xlsx');
  }

  downloadRentPaymentData() {
    const truncatedRentPayments = this.filteredRentCars.map(rentcars => ({
      pay_date: rentcars.pay_date,
      rent_payment: rentcars.rent_payment,
      month: rentcars.month,
    }));

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(truncatedRentPayments, { header: ["pay_date","rent_payment", "month"] });
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Rent Payment");

    XLSX.writeFile(wb, 'Rent_payment.xlsx');
  }

}
