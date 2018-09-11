import { Component, OnInit, Input, ViewChild, AfterContentInit, AfterViewInit } from '@angular/core';
import {AddCategoryComponent} from '../add-category/add-category.component';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
@Component({
  selector: 'app-add-code',
  styleUrls: ['./add-code.component.css'],
  templateUrl: './add-code.component.html'
})

export class AddCodeComponent implements OnInit, AfterContentInit, AfterViewInit {
  @Input() editCode: any;
  @ViewChild(AddCategoryComponent) addCode: AddCategoryComponent;
  form = new FormGroup({
    item: new FormGroup({
      title: new FormControl(null),
      active: new FormControl(true),
      static: new FormControl(null),
      subtopic: new FormGroup({
          title: new FormControl(null),
          active: new FormControl(true),
          static: new FormControl(false),
            children: new FormGroup({
              title: new FormControl(null),
              description: new FormControl(null),
            })
        })
    }),
    catalog: new FormArray([])
  });
  item:any;
  constructor() {}
  ngAfterViewInit() {
    // console.log('MY ITEM FOR CODE', this.editCode);
    // this.addCode.adder.subscribe((data: any) => {
    //   this.item = data;
    // });
    // console.log('Adder', this.item);

  }
  ngAfterContentInit() {
    console.log('Step 2: Received form from Step 1', this.editCode);
    if(this.editCode) {
      this.item = this.editCode;
      // console.log('MY ITEM FOR CODE', this.editCode[0].value);
      console.log('MY ITEM FOR CODE2', this.item);
    }
  }
  ngOnInit() {

  }
}
