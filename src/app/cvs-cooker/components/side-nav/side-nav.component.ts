import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import { ReceipeCatalog } from '../../models/receipeCatalog.model';
import { SubtopicDirective } from '../../Directives/subtopic.directive';
@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
@ViewChild('subtopics') subtopics: TemplateRef<any>;

  @Input() receipes: ReceipeCatalog;

  constructor() { }

  ngOnInit() {
    console.log('Subtopic', this.subtopics);
  }

}
