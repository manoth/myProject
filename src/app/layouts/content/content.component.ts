import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  public equipment: any;

  constructor(
    private main: MainService
  ) { }

  ngOnInit(): void {
    this.getEquipment();
  }

  getEquipment() {
    this.main.get('equipment').then((res: any) => {
      console.log(res);
      this.equipment = res.data;
    });
  }

}
