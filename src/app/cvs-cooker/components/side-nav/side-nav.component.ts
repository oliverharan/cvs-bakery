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
