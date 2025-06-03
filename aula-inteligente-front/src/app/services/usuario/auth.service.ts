import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenPayload } from '../../interfaces/token.interface';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'token';
  private router = inject(Router);
  private toastr = inject(ToastrService);
  private tokenCheckInterval = 60000; // 1 minuto
  private intervalId: any;

  constructor() {
    this.startTokenWatcher();
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  saveToken(token: string): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.tokenKey, token);
    }
  }

  getToken(): string | null {
    if (!this.isBrowser()) return null;
    return localStorage.getItem(this.tokenKey);
  }

  removeToken(): void {
    if (this.isBrowser()) {
      localStorage.removeItem(this.tokenKey);
    }
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const decoded = jwtDecode<TokenPayload>(token);
      return decoded.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }

  getDecodedToken(): TokenPayload | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      return jwtDecode<TokenPayload>(token);
    } catch {
      return null;
    }
  }

  isTokenExpired(token: string): boolean {
    try {
      const decoded = jwtDecode<TokenPayload>(token);
      return decoded.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  }

  getUsername(): string | null {
    return this.getDecodedToken()?.username ?? null;
  }

  getRole(): string | null {
    return this.getDecodedToken()?.role ?? null;
  }

  logout(): void {
    this.removeToken();
    this.toastr.info('Sesión cerrada', '', {
      positionClass: 'toast-bottom-right',
      timeOut: 2000
    });
    this.router.navigate(['/login']);
  }

  private startTokenWatcher(): void {
    if (!this.isBrowser()) return;

    if (this.intervalId) clearInterval(this.intervalId);
    this.intervalId = setInterval(() => this.checkTokenExpiration(), this.tokenCheckInterval);
  }

  private checkTokenExpiration(): void {
    const token = this.getToken();
    if (!token) {
      this.handleSessionExpired(); // Redirige si el token fue eliminado
      return;
    }

    try {
      const decoded = jwtDecode<TokenPayload>(token);
      if (decoded.exp * 1000 < Date.now()) {
        this.handleSessionExpired();
      }
    } catch {
      this.handleSessionExpired();
    }
  }

  handleSessionExpired(): void {
    this.removeToken();
    this.toastr.error('Tu sesión ha expirado', '', {
      positionClass: 'toast-bottom-right',
      timeOut: 3000
    });
    this.router.navigate(['/login']);
  }
}
