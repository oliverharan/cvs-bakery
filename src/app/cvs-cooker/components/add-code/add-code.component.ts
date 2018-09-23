import { Component, OnInit, Input, ViewChild, AfterContentInit, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import {AddCategoryComponent} from '../add-category/add-category.component';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
@Component({
  selector: 'app-add-code',
  styleUrls: ['./add-code.component.css'],
  templateUrl: './add-code.component.html'
})

export class AddCodeComponent implements OnInit, AfterContentInit, AfterViewInit {
  @Input() editCode: any;
  @Input() parent: FormGroup;
  @ViewChild(AddCategoryComponent) addCode: AddCategoryComponent;
  @ViewChild('editCategoryTitle') editCategoryTitle: ElementRef;
  @ViewChild('editSubCategoryTitle') editSubCategoryTitle: ElementRef;
  // form = new FormGroup({
  //   item: new FormGroup({
  //     title: new FormControl(null),
  //     active: new FormControl(true),
  //     static: new FormControl(null),
  //     subtopic: new FormGroup({
  //         title: new FormControl(null),
  //         active: new FormControl(true),
  //         static: new FormControl(false),
  //           children: new FormGroup({
  //             title: new FormControl(null),
  //             description: new FormControl(null),
  //           })
  //       })
  //   }),
  //   catalog: new FormArray([])
  // });
  item:any;
  it:any;
  blockEdit: boolean = true;
  editing: boolean = false;
  editingSub: boolean = false;
  editingBC: boolean = false;
  scriptLanguage: any[] =  ['html', 'css', 'js', 'json', 'angular 2+', 'angularJS 1.x', 'other'];
  constructor(private renderer: Renderer2) {}
  ngAfterViewInit() {
    // console.log('MY ITEM FOR CODE', this.editCode);
    // this.addCode.adder.subscribe((data: any) => {
    //   this.item = data;
    // });
    // console.log('Adder', this.item);

  }
  print(p) {
    console.log('MY ITEM FOR CODE2', p[0].controls.title.value);

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
    console.log('Parent form', this.parent.get('catalog') as FormArray);
    // console.log('Parent form control', this.it);
    this.it = this.parent.get('catalog') as FormArray;
    console.log('Parent form control', this.it);

  }
  get catalogs() {
    return (this.parent.get('catalog') as FormArray).controls;
  }
  get subtopic() {
    return (this.catalogs[0].get('subtopic') as FormGroup);
  }
  get children() {
    return (this.catalogs[0].get('subtopic.children') as FormGroup);
  }
  get solution() {
    return (this.catalogs[0].get('subtopic.children.solution') as FormGroup);
  }
  get code() {
    return (this.catalogs[0].get('subtopic.children.solution.code') as FormGroup);
  }
  editCategory() {
    this.renderer.removeAttribute(this.editCategoryTitle.nativeElement, 'disabled');
    if (!this.editing) {
      this.renderer.setAttribute(this.editCategoryTitle.nativeElement, 'disabled', 'true');
    }
    // console.log('NE', this.editCategoryTitle.nativeElement);
  }
  editSubCategory() {
    this.renderer.removeAttribute(this.editSubCategoryTitle.nativeElement, 'disabled');
    if (!this.editingSub) {
      this.renderer.setAttribute(this.editSubCategoryTitle.nativeElement, 'disabled', 'true');
    }
    // console.log('NE', this.editCategoryTitle.nativeElement);
  }
  editBC() {
    this.renderer.removeAttribute(this.editSubCategoryTitle.nativeElement, 'disabled');
    if (!this.editingSub) {
      this.renderer.setAttribute(this.editSubCategoryTitle.nativeElement, 'disabled', 'true');
    }
    // console.log('NE', this.editCategoryTitle.nativeElement);
  }
  // get subtopic_title() {
  //   return (this.catalogs[0].get('subtopic.title'));
  // }
}
