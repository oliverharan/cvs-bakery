import { Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  AfterContentInit,
  AfterViewInit,
  ElementRef,
  Renderer2 } from '@angular/core';
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
  @Input() mainForm: FormGroup;
  @Input() itemsIndex;
  @Input() subtopicIndex;
  @Input() childrenIndex;
  @Output() addCodeSubmit: EventEmitter<any> = new EventEmitter();
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
  item: any;
  catalogSet: FormArray;
  blockEdit = true;
  editing = false;
  editingSub = false;
  editingBC = false;
  codeLockCheckbox = false;
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
  printIt() {
    console.log('Check', this.codeLockCheckbox);

  }
  ngAfterContentInit() {
    console.log('Step 2: Received form from Step 1', this.editCode);
    if (this.editCode) {
      this.item = this.editCode;
      // console.log('MY ITEM FOR CODE', this.editCode[0].value);
      console.log('MY ITEM FOR CODE2', this.item);
    }
  }
  ngOnInit() {
    console.log('Stepone', this.editCode);
    console.log('Parent form', this.parent.get('catalog') as FormArray);

    // console.log('Parent form control', this.it);
    this.catalogSet = this.parent.get('catalog') as FormArray;
    console.log('Catalog Set', (<FormArray>this.parent.get('catalog')).controls[0].value);
    console.log('Parent form control', (<FormArray>(<FormArray>this.parent.get('subtopic')).controls[0].get('children')).controls[0]);
    console.log('Parent form2',
    (<FormArray>this.catalogSet.controls[0].get('subtopic')));
    console.log('Parent form3', (<FormArray>(<FormArray>this.parent.get('catalog')).controls[0].get('subtopic')).controls);

  }
  get catalogs() {
    return (<FormArray>this.parent.get('catalog')).controls;
  }
  // getSubtopic(index = 0) {
  //   return (<FormArray>this.catalogSet.controls[0].get('subtopic')).controls;
  // }
  getSubtopic(index) {
    return (<FormArray>(<FormArray>this.parent.get('catalog')).controls[index].get('subtopic')).controls;
  }
  getChildren(index, childrenIndex) {
    return (<FormArray>
      (<FormArray>
        (<FormArray>
          this.parent.get('catalog')).controls[index].get('subtopic')).controls[childrenIndex].get('children'));
  }
    getSolution() {
    return (<FormArray>(<FormArray>
      (<FormArray>
        (<FormArray>
          this.parent.get('catalog')).controls[0].get('subtopic')).controls[0].get('children')).controls[0].get('solution'));
  }
  // get children() {
  //   return (this.catalogs[0].get('subtopic.children') as FormGroup);
  // }

  // get children() {
  //   return (this.catalogs[0].get('subtopic.children') as FormGroup);
  // }
  // get solution() {
  //   return (this.catalogs[0].get('subtopic.children.solution') as FormGroup);
  // }
  // get code() {
  //   return (this.catalogs[0].get('subtopic.children.solution.code') as FormGroup);
  // }
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
    // Form submit event
    onSubmit(event: any) {
      event.preventDefault();
      console.log('Step 2: Topic/Subtopic Submit Event', event);
      console.log('Step 2: Topic/Subtopic Submit Form data', this.parent.get('catalog').value);
      // this.addCategoryForm = this.parent.get('catalog').value;
      // this.active.emit(this.addCategoryForm);
      // console.log('Step 1: Form Submit Values', this.form.value);
      // console.log(JSON.parse(JSON.stringify(test.currentTarget, null, 2)));
      // this.adder.emit(event);
      console.log('Event log', this.parent.value);
      this.addCodeSubmit.emit(this.parent.value);

      // console.log('items', event.currentTarget);
    }
}
