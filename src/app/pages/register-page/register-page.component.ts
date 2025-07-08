import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserRegister } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
   registerForm: FormGroup;
   user: UserRegister
  
    constructor(
      private fb: FormBuilder, 
      private authService: AuthService,
      private router: Router
      //private router: Router
    ) {
      this.registerForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        senha: ['', [Validators.required, Validators.minLength(6),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/)]],
        cpf: ['', [Validators.required]],
        nomeCompleto:['',[Validators.required]],
        tipoUsuario: ['', Validators.required],
        especialidade: [''],
      });

      this.user = {
        email: '',
        password: '',
        role: '',
        cpf: '',
        nomeCompleto: '',
        especialidade: ''
      }
    }
  
    onSubmit(): void {
      if (this.registerForm.valid) {
        this.user.email = this.registerForm.value.email;
        this.user.password = this.registerForm.value.senha;
        this.user.cpf = this.registerForm.value.cpf;
        this.user.nomeCompleto = this.registerForm.value.nomeCompleto;
        this.user.role = this.registerForm.value.tipoUsuario;
        
       if(this.registerForm.value.tipoUsuario == 'Profissional'){
        console.log('Entrou no IF!');
        this.user.especialidade = this.registerForm.value.especialidade;
       }else{
        this.user.especialidade = 'Cliente';
       }

        this.authService.register(this.user).subscribe({
          next: (res) =>  {
            console.log('Usuário criado com sucesso!', res);
            this.router.navigate(['/login']);
          },
          error: (err) => {
            console.error('Erro ao criar usuário: ', err);
          }
        })
      }
    }
}
