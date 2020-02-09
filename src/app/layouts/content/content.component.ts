import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import Swal from 'sweetalert2';
declare const $: any;

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  public equ = new Equipment();
  public equipment: any;
  public equName = [
    'Computer', 'Printer', 'Scaner'
  ];

  errCode: boolean = false;
  errDateAdd: boolean = false;

  constructor(
    private main: MainService
  ) { }

  ngOnInit(): void {
    this.getEquipment();
  }

  getEquipment() {
    this.main.get('equipment').then((res: any) => {
      this.equipment = res.data;
    });
  }

  onCode(str: string) {
    return this.errCode = (!str) ? true : false;
  }

  onDateAdd(str: string) {
    return this.errDateAdd = (!str) ? true : false;
  }

  onError() {
    const arrError = [];
    arrError.push(this.onCode(this.equ.code));
    arrError.push(this.onDateAdd(this.equ.date_add));
    return this.main.in_array(true, arrError);
  }

  onCancel() {
    $('#modal-add-equipment').modal('hide');
    this.equ = new Equipment();
    this.errCode = false;
    this.errDateAdd = false;
  }

  onSubmit() {
    // console.log(this.equ);
    if (!this.onError()) {
      this.main.post('equipment', this.equ).then((res: any) => {
        Swal.fire({
          position: 'top-end',
          title: 'ยินดีด้วย !',
          text: 'คุณลบข้อมูลครุภัณฑ์สำเร็จแล้ว.',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
          allowOutsideClick: false
        }).then(() => {
          this.getEquipment();
          this.onCancel();
        });
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด !',
        text: 'คุณกรอกข้อมูลไม่ถูกต้อง หรือยังไม่สมบูรณ์ กรุณาตรวจสอบ.',
        allowOutsideClick: false
      });
    }
  }

}
export class Equipment {
  code: string;
  name: string = 'Computer';
  date_add: any;
  username: string;
}
