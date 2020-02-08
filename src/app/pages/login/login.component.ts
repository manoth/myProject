import { Component, OnInit, Inject } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public jwtHelper = new JwtHelperService();
  public login = new Login();

  constructor(
    @Inject('TOKENNAME') private tokenName: string,
    private main: MainService,
    private router: Router
  ) { }

  ngOnInit(): void {
    document.body.className = 'hold-transition login-page';
    const token = localStorage.getItem(this.tokenName);
    try {
      if (!this.jwtHelper.isTokenExpired(token)) {
        this.router.navigate(['/index']);
      }
    } catch (err) {
      this.main.logout();
    }
  }

  onSubmit() {
    this.main.post('login', this.login).then((res: any) => {
      if (res.ok) {
        // console.log(res);
        localStorage.setItem(this.tokenName, res.token);
        this.router.navigate(['/index']);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด !',
          text: res.err
        });
      }
    });
  }

}
export class Login {
  username: string;
  password: string;
}
