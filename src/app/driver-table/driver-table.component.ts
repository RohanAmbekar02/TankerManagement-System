import { Component, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DriverFormComponent } from '../driver-form/driver-form.component';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from '../admin.service';
import { ExcelService } from '../excel.service';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';



@Component({
  selector: 'app-driver-table',
  templateUrl: './driver-table.component.html',
  styleUrls: ['./driver-table.component.css']
})
export class DriverTableComponent implements OnInit {
  
  driverData :any[]=[];

  constructor(private dialoug:MatDialog,private admin:AdminService,private excelService:ExcelService) { }

 ngOnInit() {
    this.getData();
  }

    openDialog(){
     const dialogref = this.dialoug.open(DriverFormComponent,{
     width:'460px'
     });
     dialogref.afterClosed().subscribe({
      next : (val:any)=>{
        this.getData();
  
      }
     })
  }
  

  getData(){
    this.admin.getDriver().subscribe({
      next:(val:any)=>{
        this.driverData=val;
      },
    });
    
  }

   exportToPDF(): void {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [['Id', 'Name', 'Contact No.', 'License No.','Aadhar No.']],
      body: this.driverData.map(item => [item.id, item.name, item.mobile, item.adhar,item.license]),
    });
    doc.save('Driver_list.pdf');
  }
  
  updateRecord(data:any){
    const matRef = this.dialoug.open(DriverFormComponent,{
      data,
       width:'460px'
    });
    matRef.afterClosed().subscribe({
      next:(val:any)=>{
        this.getData();
      }
    })
  }


  deleteRecord(id :any){
    this.admin.deleteDriver(id).subscribe({
      next : (val:any)=>{
        alert('Record Deleted Successfully')
        // this.snackbar.openSnackbar('delete','done');
        this.getData();
      }
    })
  }

  exportToExcel(): void {
    this.excelService.exportAsExcelFile(this.driverData, 'Driver_Data');
  }

}

    