import { ThemeService } from './../../../Services/theme.service';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, NzLayoutModule, CommonModule],
  template: `
    <div [ngClass]="['bg-[var(--background)] min-h-[100vh]', colorMode]">
      <Header class="w-full fixed top-0 z-10"></Header>
      <router-outlet />
      <nz-footer class="text-center text-[var(--textNormal)] bg-[var(--bg24)]"
        >Moviez ©2024 All Right Recived</nz-footer
      >
    </div>
  `,
  styles: [``],
})
export class LayoutComponent {
  colorMode?: string;
  constructor(private ThemeService: ThemeService) {
    this.ThemeService.theme.subscribe((colorMode) => {
      this.colorMode = colorMode;
    });
  }
}
