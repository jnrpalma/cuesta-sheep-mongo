import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PoFieldModule, PoButtonModule, PoLoadingModule, PoLinkModule } from '@po-ui/ng-components';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, PoFieldModule, PoButtonModule, PoLoadingModule, PoLinkModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  isForgotPassword: boolean = false;
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.logout(); 
  }

  onSubmit() {
    if (this.email && this.password) {
      this.isLoading = true;
      this.authService.login(this.email, this.password).subscribe(() => {
        this.isLoading = false;
      });
    } else {
      console.log('Erro de email e senha');
    }
  }

  onForgotPasswordSubmit() {
    if (this.email) {
      this.isLoading = true;
      this.authService.forgotPassword(this.email).subscribe(() => {
        this.isLoading = false;
        console.log('Se o email estiver registrado, um link de redefinição de senha será enviado.');
      });
    } else {
      console.log('Por favor, insira um email');
    }
  }

  toggleForgotPassword() {
    this.isForgotPassword = !this.isForgotPassword;
  }

  navigateToRegister() {
    this.showLoading();
    setTimeout(() => {
      this.router.navigate(['/register']);
      this.hideLoading();
    }, 1000); 
  }

  showLoading() {
    setTimeout(() => {
      this.isLoading = true;
    }, 300); 
  }

  hideLoading() {
    setTimeout(() => {
      this.isLoading = false;
    }, 300); 
  }
}
