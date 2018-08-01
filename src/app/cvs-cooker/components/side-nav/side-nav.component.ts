import { Component, OnInit, Input, Output, EventEmitter, ViewChild, AfterViewInit, ContentChild, AfterContentInit } from '@angular/core';
import { EditTopicComponent } from '../edit-topic/edit-topic.component';
import { AddTopicComponent } from '../add-topic/add-topic.component';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { ReceipeCatalog } from '../../models/receipeCatalog.model';

@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit, AfterViewInit, AfterContentInit {
// @ViewChild('subtopics') subtopics: TemplateRef<any>;
  @Input() topic: ReceipeCatalog;
  @Input() topicId: ReceipeCatalog;
  @Input() receipes: ReceipeCatalog;
  @Input() subtopics: ReceipeCatalog;
  @Input() addNewTopic: ReceipeCatalog;
  @Output() active: EventEmitter<any> = new EventEmitter();
  @Output() remove: EventEmitter<any> = new EventEmitter();
  @Output() adder: EventEmitter<any> = new EventEmitter();
  @Output() editMain: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @ViewChild(EditTopicComponent) editPanel: EditTopicComponent;
  @ViewChild(AddTopicComponent) addPanel: AddTopicComponent;
  @ContentChild(AddCategoryComponent) addTopicForm: AddCategoryComponent;
  cancelling: boolean = false;
  editing = false;
  addingTopic = false;
  showList = null;
  expandTopic: any = null;
  activeTopic: boolean = null;
  activeSubtopic: boolean = null;
  item: any;
  selectedItems: ReceipeCatalog;
  itemToEdit: ReceipeCatalog;
  constructor() { }

  ngAfterContentInit(){
    console.log('after cnotent', this.addTopicForm);
    if (this.addTopicForm.cancel) {
      this.addTopicForm.cancel.subscribe(cancelDialog => this.addingTopic = cancelDialog);
    }
  }
  ngAfterViewInit() {
    // console.log('edittopic', this.editPanel);
    // this.editPanel.tabTitle = 'mytitle';
  }

  ngOnInit() {
    // console.log('Subtopic', this.subtopics);
  }
  expandList(i: number) {
    if (this.showList = null) {
      this.expandTopic = i;
      this.showList = true;
    } else if (this.expandTopic !== i) {
      this.showList = false;
      this.expandTopic = i;
    } else if (this.expandTopic = i) {
      this.expandTopic = null;
      this.showList = false;
    } else if (this.expandTopic = null && this.showList) {
      this.showList = false;
    }
  }
  addTopic(event: ReceipeCatalog) {
    console.log('ev', event);
    this.addingTopic = !this.addingTopic;
    this.adder.emit(this.addingTopic);

  }
  onCancel(val) {
    console.log('vak', val);
    this.editing = false;
    if (this.addingTopic !== val) {
      this.addingTopic = false;
    } else {
      this.addingTopic = true;
    }
  }
  editItem(event, item) {
    // this.editing = true;
    this.editing = !this.editing;
    this.itemToEdit = item;
    console.log('itemtoedit', item);
  }
  onAdd(event: ReceipeCatalog, item) {
    console.log('addddd', event, item);
    if (this.adder && event) {
      this.adder.emit(event);
    }
  }
  onEdit(event: ReceipeCatalog, item) {
    console.log('evet', event, item);
    // this.editing = !this.editing;
    // if (this.activeTopic) {
    //   this.editPanel.tabTitle = 'Edit/Remove Topic';
    //   this.activeTopic = null;
    // } else if (this.activeSubtopic) {
    //   this.editPanel.tabTitle = 'Edit/Remove Subtopic';
    //   this.activeSubtopic = null;
    // }
    // this.cancel.emit();
    if (this.editMain && event) {
      this.editMain.emit(event);
    }
//     this.editMain.emit(event);
// console.log('sub',event);
  }
  onNameChange(value: string) {
    this.subtopics.title = value;
  }
  onRemove(event) {
    // console.log('myremove', event);
    this.editing = false;
    this.remove.emit(event);
  }
}
@Component({
  selector: 'side-nav-topic',
  template: `
                        <div class="dFlex">
                        <button
                        *ngIf="topic['subtopic'].length"
                        (click)=" expandTopic = topicId; outputId();"
                        class="chevron-down-button fas fa-caret-right" ></button>
                        <div
                        [ngClass]="{topic_tab : topic['subtopic'].length == 0}"
                        class="subtopic-content align-center">{{topic.title}}</div>
                        </div>
  `,
  styleUrls: ['./side-nav.component.css']
})
export class SideNavTopicComponent implements OnInit {
  @Input() topic: ReceipeCatalog;
  @Input() topicId: ReceipeCatalog;
  @Output() selectTopic: EventEmitter<any> = new EventEmitter();
  expandTopic: number;
  hasSubItems: any;

  constructor(){}
  ngOnInit(){
  }

  outputId(){
    // console.log('emit', this.expandTopic);
    this.selectTopic.emit(this.expandTopic);
  }

}

@Component({
  selector: 'topic-input',
  styleUrls: ['./side-nav.component.css'],
  template: `
  <div class="topic-input-container">
  <div class="topic-input-tab">Edit/Remove Topic</div>
  <div (click)="onCancel()" class=" fas fa-times-circle fa-2x topic-input-close "></div>
  <div class="topic-input-contents align-self-center">
  <h2>Edit the Catalog Topic Name</h2>
  <input type="text" [value]="itemTitle.title" (input)="onNameChange(subTopicName.value)" #subTopicName />
  <div class="dFlex topic-input-button">
  <button type="button" (click)="onEdit(subTopicName.value)" class="topic-btn fas fa-save"><span>Save</span></button>
  <button type="button" (click)="onRemove()" class="topic-btn  fas fa-trash-alt"><span>Remove</span></button>
  <button type="button" (click)="onCancel()" class="topic-btn  fas fa-times-circle"><span>Cancel</span></button>
  </div>
  </div>
  </div>
  <!-- <button type="button" (click)="onRemove()">{{editing ? 'Done': 'Remove'}}</button> -->
  `
})

export class TopicInputComponent implements OnInit {
  @Input() itemTitle: any;
  @Output() edit: EventEmitter<any> = new EventEmitter();
  @Output() remove: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();
  initialTitle: any;
  cancelling: boolean = false;
  constructor(){

  }
  ngOnInit() {
    console.log(this.itemTitle);
    this.initialTitle = this.itemTitle.title;
  }
  onNameChange(val) {
    this.itemTitle.title = val;

  }
  onEdit(val) {
    console.log(val);
    this.edit.emit(val);
  }
  onRemove(){
    this.remove.emit(this.itemTitle);
    console.log(this.itemTitle);
  }
  onCancel(){
    this.cancelling = true;
    this.itemTitle.title = this.initialTitle;
    this.cancel.emit(this.cancelling);
  }
}
