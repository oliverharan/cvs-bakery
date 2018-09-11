import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { RelayService } from '../../services/relay.service';
import { ReceipeCatalog } from '../../models/receipeCatalog.model';
import { FormGroup, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
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
  item: ReceipeCatalog = {
    title: '',
    active: true,
    static: false,
    subtopic: [{
      title: '',
      active: null,
      static: null,
      children: [{
        title: '',
        description: ''
      }]
    }]
  };
  @Input() items: ReceipeCatalog;
  @Input() editing: boolean;
  @Input() parent: FormGroup;
  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @Output() edit: EventEmitter<any> = new EventEmitter();
  @Output() adder: EventEmitter<any> = new EventEmitter();
  @Output() remove: EventEmitter<any> = new EventEmitter();
  @ViewChild('topicName') topicTitle: any;
  @ViewChild('topicNameEditable') topicNameEditable: any;
  @ViewChild('subTopicName') subTopicName: any;
  @ViewChild('subTopicNameEditable') subTopicNameEditable: any;

  tabTitle: string = 'Add Tab';
  initTitle: string;
  editableCategory: boolean = false;
  editableSubCategory: boolean = false;


  constructor( private relayService: RelayService) { }

  ngOnInit() {

    console.log('items', this.item.title);
    // this.initTitle = this.items.title;

  }
  onEdit() {
    this.cancel.emit();
    if (this.edit) {
      this.edit.emit(this.items);
    }
  }
  onNameChange(value: string) {
    this.items.title = value;
  }
  onRemove() {
    this.remove.emit(this.items);
    // this.remove.emit(this.subtopics);
  }
  onCancel() {
    console.log('ngmodel', this.item.title);
    // this.formReset();
    this.editing = false;
    // this.item.title = '';
    // this.item.subtopic[0].title = '';
    // this.item.static = false;
    // this.item.subtopic[0].static = false;
    console.log('eveve2', this.item);
    // console.log('trigger cancel', this.initTitle, this.items.title);
    // this.items.title = this.initTitle;
    this.cancel.emit(this.editing);

  }
  formReset() {
    this.topicTitle.nativeElement.value = '';
    this.topicNameEditable.nativeElement.checked = false;
    this.subTopicName.nativeElement.value = '';
    this.subTopicNameEditable.nativeElement.checked = false;
    this.item = {
      title: '',
      active: true,
      static: false,
      subtopic: [{
        title: '',
        active: null,
        static: null,
        children: [{
          title: '',
          description: ''
        }]
      }]
    };
  }
  onSubmit(event: any) {
    event.preventDefault();

    console.log('Step 1: Topic/Subtopic Injection', event);
    console.log('Step 1: Form Submit Values', this.form.value);
    // console.log(JSON.parse(JSON.stringify(test.currentTarget, null, 2)));
    // this.adder.emit(event);
    console.log('Event log', event);
    this.adder.emit(this.form.value);

    // console.log('items', event.currentTarget);
    if (this.item.title !== '') {
      // if (this.editableCategory) {
      //   this.item.static = this.editableCategory;
      // }
      // if (this.editableSubCategory) {
      //   this.item.subtopic[0].static = this.editableSubCategory;
      // }
      this.adder.emit(event);
    //   console.log('eveve', this.item);
    }
    // this.editableSubCategory = false;
    // this.editableCategory = false;
    // this.item.title = '';
    // this.item.subtopic[0].title = '';
    // this.formReset();
  }
}
