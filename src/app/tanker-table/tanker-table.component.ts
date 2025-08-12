import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TankerFormComponent } from '../tanker-form/tanker-form.component';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../admin.service';
import { ExcelService } from '../excel.service';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';


@Component({
  selector: 'app-tanker-table',
  templateUrl: './tanker-table.component.html',
  styleUrls: ['./tanker-table.component.css']
})
export class TankerTableComponent implements OnInit {
  // displayedColumns: string[] = ['id', 'tnum', 'dname', 'stat','action'];
  // dataSource =new MatTableDataSource;

  tankerData :any[]=[];
 constructor(private dialoug:MatDialog,private admin:AdminService,private excelService:ExcelService) { }

  ngOnInit() {
    this.getData();
  }

    openDialog(){
     const dialogref = this.dialoug.open(TankerFormComponent,{
       width:'450px'
     });
     dialogref.afterClosed().subscribe({
      next : (val:any)=>{
      this.getData();
      }
     })
  }

  getData(){
    this.admin.getTanker().subscribe({
      next:(val:any)=>{
        this.tankerData=val;
      },
    });
  }

  exportToPDF(): void {
  const doc = new jsPDF();
  autoTable(doc, {
    head: [['ID', 'Tanker Number', 'Driver Name', 'Status']],
    body: this.tankerData.map(item => [item.id, item.tnum, item.dname, item.stat]),
  });
  doc.save('Tanker_list.pdf');
}


  editForm(data:any){
    const matRef = this.dialoug.open(TankerFormComponent,{
      data,
      width:'450px'
    });
    matRef.afterClosed().subscribe({
      next:(val:any)=>{
        this.getData();
      }
    })
  }


  deleteRecord(id :any){
    this.admin.deleteTanker(id).subscribe({
      next : (val:any)=>{
        alert('Record Deleted Successfully');
        this.getData();
      }
    })
  }

  exportToExcel(): void {
    this.excelService.exportAsExcelFile(this.tankerData, 'Driver_Data');
  }
}

    