import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public decoded: any;

  constructor(
    private main: MainService
  ) { }

  ngOnInit(): void {
    this.decoded = this.main.decodeToken();
  }

  logout() {
    this.main.logout();
  }


}
