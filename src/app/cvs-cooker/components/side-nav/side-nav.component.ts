import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ReceipeCatalog } from '../../models/receipeCatalog.model';

@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
// @ViewChild('subtopics') subtopics: TemplateRef<any>;

  @Input() receipes: ReceipeCatalog;
  @Input() subtopics: ReceipeCatalog;
  @Output() remove: EventEmitter<any> = new EventEmitter();
  @Output() edit: EventEmitter<any> = new EventEmitter();
  editing = false;
  constructor() { }

  ngOnInit() {
    // console.log('Subtopic', this.subtopics);
  }
  onEdit() {
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
                        <div class="subtopic-content align-center">{{topic.title}}</div>
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
  template: `
  <input type="text" [value]="itemTitle.title" (input)="onNameChange(subTopicName.value)" #subTopicName />
  <button type="button" (click)="onEdit(subTopicName.value)">Submit</button>
  <button type="button" (click)="onRemove()">Remove</button>
  <button type="button" (click)="onCancel()">Cancel</button>
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
