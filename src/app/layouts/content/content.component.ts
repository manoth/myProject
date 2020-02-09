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
  public edit: boolean = false;
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
    this.edit = false;
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
          text: 'คุณเพิ่มข้อมูลสำเร็จแล้ว.',
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

  onEdit(equipm: any) {
    this.edit = true;
    this.equ = equipm;
    $('#modal-add-equipment').modal({ backdrop: 'static', keyboard: false });
  }

  onDel(equipm: any) {
    Swal.fire({
      text: `คุณต้องการที่จะลบพัสดุหมายเลข ${equipm.code} ใช่หรือไม่?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'ใช่',
      cancelButtonText: 'ไม่ใช่',
      reverseButtons: true,
      allowOutsideClick: false
    }).then((result) => {
      if (result.value) {
        this.main.get('equipment/' + equipm.id).then((res: any) => {
          this.getEquipment();
          this.onCancel();
        });
      }
    });
  }

}
export class Equipment {
  code: string;
  name: string = 'Computer';
  date_add: any;
  username: string;
}
