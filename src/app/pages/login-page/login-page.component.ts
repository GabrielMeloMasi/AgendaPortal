import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserLogin } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

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
          next: (res) =>  {
            console.log('Login realizado com sucesso!', res);
            localStorage.setItem('token', JSON.stringify(res));
            this.router.navigate(['/home']);
          },
          error: (err) => {
            console.error('Erro ao fazer login: ', err);
          }
        })
    }
  }
}
