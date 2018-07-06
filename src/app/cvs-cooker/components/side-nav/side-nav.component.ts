import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ReceipeCatalog } from '../../models/receipeCatalog.model';

@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
// @ViewChild('subtopics') subtopics: TemplateRef<any>;
  @Input() topic: ReceipeCatalog;
  @Input() topicId: ReceipeCatalog;
  @Input() receipes: ReceipeCatalog;
  @Input() subtopics: ReceipeCatalog;
  @Output() remove: EventEmitter<any> = new EventEmitter();
  @Output() edit: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();
  cancelling: boolean = false;
  editing = false;
  showList = null;
  expandTopic: any = null;
  constructor() { }

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
  onEdit() {
    this.cancel.emit();
    if (this.edit) {
      this.edit.emit(this.subtopics);
    }
    this.editing = !this.editing;
  }
  onNameChange(value: string) {
    this.subtopics.title = value;
  }
  onRemove() {
    this.remove.emit(this.subtopics);
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
