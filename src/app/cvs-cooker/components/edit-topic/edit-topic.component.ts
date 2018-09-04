import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import {ReceipeCatalog} from '../../models/receipeCatalog.model';
@Component({
  selector: 'app-edit-topic',
  templateUrl: './edit-topic.component.html',
  styleUrls: ['./edit-topic.component.css']
})
export class EditTopicComponent implements OnInit {
  @Input() items: ReceipeCatalog;
  @Input() subtopics: ReceipeCatalog;
  @Input() editing: boolean;
  @Output() remove: EventEmitter<any> = new EventEmitter();
  @Output() edit: EventEmitter<any> = new EventEmitter();
  @Output() cancel: EventEmitter<any> = new EventEmitter();
  cancelling: boolean = false;
  // editing = false;
  showList = null;
  expandTopic: any = null;
  tabTitle: string = 'Edit Tab';
  editableCategory: boolean = false;

  constructor() { }

  ngOnInit() {
  }
  onEdit(event, item) {
    this.cancel.emit();
    if (this.edit) {
      this.edit.emit(this.items);
    }
    this.editing = !this.editing;
  }
  onNameChange(value: string) {
    this.items.title = value;
  }
  onRemove(event) {
    // console.log('child item remove', this.items);
    this.remove.emit(this.items);
    // this.remove.emit(this.subtopics);
  }
  onCancel() {
    this.editing = !this.editing;
    this.formReset();
    this.cancel.emit(this.editing);
  }
  formReset() {
    this.items = {
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
}
