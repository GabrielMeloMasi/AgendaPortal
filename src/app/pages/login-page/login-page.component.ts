import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserLogin } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
 loginForm: FormGroup;
 loginUser: UserLogin

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]
    });

    this.loginUser = {
      email:'',
      password: ''
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loginUser.email = this.loginForm.value.email;
      this.loginUser.password = this.loginForm.value.senha;
      
        this.authService.login(this.loginUser).subscribe({
          next: (res: any) =>  {
            
            const token = res.token;
            localStorage.setItem('token', token);

            const decoded: any = jwtDecode(token);

            const userData = {
              userId: decoded.userId || decoded["userId"],
              userName: decoded.userName || decoded["userName"],
              userRole: decoded.userRole || decoded["userRole"],
              email: decoded.email || decoded["email"],
              nomeCompleto: decoded.nomeCompleto || decoded["nomeCompleto"],
              tipoUsuario: decoded.tipoUsuario || decoded["tipoUsuario"]
            }

            localStorage.setItem('userData', JSON.stringify(userData));
            console.log('Usuário logado:', userData);
            this.router.navigate(['/home']);
          },



          error: (err) => {
            console.error('Erro ao fazer login: ', err);
          }
        })
    }
  }
}
