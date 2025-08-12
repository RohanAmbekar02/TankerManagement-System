import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AdminService } from '../admin.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-driver-form',
  templateUrl: './driver-form.component.html',
  styleUrls: ['./driver-form.component.css']
})
export class DriverFormComponent implements OnInit {
  driverForm :FormGroup;
  
  constructor(private adminservice :AdminService,private matdialog:MatDialog,
     private matRef:MatDialogRef<DriverFormComponent>,
       @Inject(MAT_DIALOG_DATA) public data:any,) { 

     this.driverForm = new FormGroup({
     name : new FormControl('',[Validators.required]),
    mobile: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
   adhar: new FormControl('', [Validators.required, Validators.pattern(/^\d{12}$/)]),
   license :  new FormControl('', [Validators.required, Validators.pattern(/^\d{16}$/)]),
  });
}
 
  ngOnInit(): void {
     this.driverForm.patchValue(this.data);
  }


   get name(){
      return this.driverForm.get('name');
  }

  get mobile(){
    return this.driverForm.get('mobile');
}

get license(){
  return this.driverForm.get('license');
}

get adhar(){
  return this.driverForm.get('adhar');
}



driverFormSubmit(){
  if(this.data){
    const updatedData = { ...this.driverForm.value, id: this.data.id };
    this.adminservice.updateDriver(this.data.id, updatedData).subscribe({
      next:(val:any)=>{
             alert('Record Updated Successfullly'); 
        this.matRef.close(true);
      }
    })
      
    }
    else{
    this.adminservice.addDriver(this.driverForm.value).subscribe({
      next :(val:any)=>{
        alert('Record Added Successfullly');
          this.matdialog.closeAll();
      }
    });
}
  }

}




