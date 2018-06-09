import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[subtopic]',
  exportAs: 'subtopic'
})
export class SubtopicDirective {
@Input() subtopic: any;

  constructor() { }

}
