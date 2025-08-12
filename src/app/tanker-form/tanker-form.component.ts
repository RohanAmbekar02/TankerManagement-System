import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';
import { SnackbarService } from '../snackbar.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-tanker-form',
  templateUrl: './tanker-form.component.html',
  styleUrls: ['./tanker-form.component.css']
})
export class TankerFormComponent implements OnInit {
tankerForm: FormGroup;

constructor (private fd:FormBuilder,private admin:AdminService,private matdialog:MatDialog,
   private matRef:MatDialogRef<TankerFormComponent>,
     @Inject(MAT_DIALOG_DATA) public data:any,
){
 this.tankerForm = this.fd.group({
  tnum :new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z0-9-]+$')]),
  dname:new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z ]+$')]),
  stat: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z ]+$')]),
 });
}

 get tnum() {
    return this.tankerForm.get('tnum');
  }

  get dname() {
    return this.tankerForm.get('dname');
  }

  get stat() {
    return this.tankerForm.get('stat');
  }

  ngOnInit(): void {
    this.tankerForm.patchValue(this.data);
  }
 

tankerFormSubmit(){
  if(this.data){
    const updatedData = { ...this.tankerForm.value, id: this.data.id };
    this.admin.updateTanker(this.data.id, updatedData).subscribe({
      next:(val:any)=>{
       alert('Record Updated Successfullly');
        this.matRef.close(true);
      }
    })
    }
    else{
    this.admin.addTanker(this.tankerForm.value).subscribe({
      next :(val:any)=>{
        // this.snack.openSnackbar('Successfully Added','Done');
        alert('Record Added Successfully ');
        this.matdialog.closeAll();
      }
    });
}
  }
}

