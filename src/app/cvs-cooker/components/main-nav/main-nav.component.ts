import { Component, ElementRef, Renderer2, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { Credits } from '../../models/credits.model';
import { RelayService } from '../../services/relay.service';
@Component({
  selector: 'main-nav',
  styleUrls: ['main-nav.component.css'],
  template: `
  <div class="cvsb-mainNav">
    <div class="cvsb-headerBar">
      <div class="cvsb-sideMenu">
        <div class="cvsb-logoWrap">
        <a class="cvsb-sprite"></a>
        <div class="cvsb-name">
          <a href="#">cvs-bakery</a>
          <div class="author">
            <span>By</span>
            <a href="#">The CVS UX Team</a>
          </div>
        </div>
      </div>
    </div>
  </div>
      <div class="cvsb-rightTabs">
      <button typ="button" class="menuButton primary" (click)="toggleCredits()">Credits</button>
      <div class="creditPopOver" #credit>

          Content goes here
          <credits [details]="creditsList"></credits>
      </div>
      <div class="popover-connector"></div>

    </div>
    </div>
  `
})

export class MainNavComponent implements OnInit, AfterViewInit {
  show = false;
  creditsList: Credits[];

  @ViewChild("credit", { read: ElementRef }) credit: ElementRef;

  ngOnInit() {
    // this.setCredits();
    console.log(this.creditsList);
  }
  ngAfterViewInit() {  }

  constructor(private el: ElementRef, private render: Renderer2, private relayService: RelayService) { }

  // setCredits(){
  //   this.relayService
  //   .getCredits()
  //   .subscribe((data: any) => this.creditsList = data);
  // }
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
}
