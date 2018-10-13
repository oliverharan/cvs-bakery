import { Component, Input, ElementRef, Renderer2, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { Credits } from '../../models/credits.model';
import { RelayService } from '../../services/relay.service';

@Component({
  selector: 'main-nav',
  styleUrls: ['main-nav.component.css'],
  templateUrl: 'main-nav.component.html'
})

export class MainNavComponent implements OnInit, AfterViewInit {

  @ViewChild('credit', { read: ElementRef }) credit: ElementRef;

  @Input() details: Credits[];
  creditsList: Credits[];
  show = false;

  ngOnInit() {
    // this.setCredits();
    // console.log(this.creditsList);
  }
  ngAfterViewInit() {  }

  constructor(private el: ElementRef, private render: Renderer2, private relayService: RelayService) { }

  toggleCredits() {
    if (!this.show) {
      this.show = true;
      this.render.addClass(this.credit.nativeElement, 'active');
      this.render.addClass(document.querySelector('.popover-connector'), 'active');
    } else {
      this.show = false;
      this.render.removeClass(this.credit.nativeElement, 'active');
      this.render.removeClass(document.querySelector('.popover-connector'), 'active');
    }

  }

  // setCredits(){
  //   this.relayService
  //   .getCredits()
  //   .subscribe((data: any) => this.creditsList = data);
  // }
}
