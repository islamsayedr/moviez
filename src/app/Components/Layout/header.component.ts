import { ThemeService } from './../../../Services/theme.service';
import { NgFor } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'Header',
  standalone: true,
  imports: [NgFor, RouterLink, RouterLinkActive],
  template: `
    <header id="header" class=" p-6 py-3 bg-[var(--bg24)]  backdrop-blur-lg">
      <div class="container flex justify-between m-auto">
        <span class="text-[var(--primary)] font-bold text-base">🎦 Moviez</span>
        <nav class="flex gap-6">
          <a
            class="text-[var(--textNormal)] "
            *ngFor="let link of navLinks"
            [routerLink]="link.url"
            routerLinkActive="!text-[var(--primary)]"
            >{{ link.name }}
          </a>
        </nav>
        <input
          type="checkbox"
          class="l cursor-pointer"
          [checked]="true"
          (click)="swichMode()"
        />
      </div>
    </header>
    <!-- burger menu -->
    <!-- https://uiverse.io/vinodjangid07/soft-octopus-29 -->
  `,
  styles: [
    `
      .l {
        background-color: rgba(0, 0, 0, 0.7);
        border-radius: 0.75em;
        box-shadow: 0.125em 0.125em 0 0.125em rgba(0, 0, 0, 0.3) inset;
        color: #fdea7b;
        display: inline-flex;
        align-items: center;
        padding: 0.15em;
        width: 3em;
        height: 1.5em;
        transition: background-color 0.1s 0.3s ease-out,
          box-shadow 0.1s 0.3s ease-out;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
      }

      .l:before,
      .l:after {
        content: '';
        display: block;
      }

      .l:before {
        background-color: #d7d7d7;
        border-radius: 50%;
        width: 1.2em;
        height: 1.2em;
        transition: background-color 0.1s 0.3s ease-out, transform 0.3s ease-out;
        z-index: 1;
      }

      .l:after {
        background: linear-gradient(transparent 50%, rgba(0, 0, 0, 0.15) 0) 0
            50% / 50% 100%,
          repeating-linear-gradient(
              90deg,
              #bbb 0,
              #bbb,
              #bbb 20%,
              #999 20%,
              #999 40%
            )
            0 50% / 50% 100%,
          radial-gradient(circle at 50% 50%, #888 25%, transparent 26%);
        background-repeat: no-repeat;
        border: 0.25em solid transparent;
        border-left: 0.4em solid #d8d8d8;
        border-right: 0 solid transparent;
        transition: border-left-color 0.1s 0.3s ease-out,
          transform 0.3s ease-out;
        transform: translateX(-22.5%);
        transform-origin: 25% 50%;
        width: 1.2em;
        height: 1em;
        box-sizing: border-box;
      }
      /* Checked */
      .l:checked {
        background-color: rgba(0, 0, 0, 0.45);
        box-shadow: 0.125em 0.125em 0 0.125em rgba(0, 0, 0, 0.1) inset;
      }

      .l:checked:before {
        background-color: currentColor;
        transform: translateX(125%);
      }

      .l:checked:after {
        border-left-color: currentColor;
        transform: translateX(-2.5%) rotateY(180deg);
      }
      .l:focus {
        outline: 0;
      }
    `,
  ],
})
export class HeaderComponent implements OnInit {
  lightMode?: boolean;
  navLinks = [
    { name: 'Home', url: 'home' },
    { name: 'Movies', url: 'movies' },
    { name: 'TV Shows', url: 'tv' },
  ];
  constructor(private ThemeService: ThemeService) {}

  ngOnInit() {
    this.ThemeService.theme.subscribe((theme) => {
      this.lightMode = theme === 'light' ? true : false;
    });
  }
  swichMode() {
    this.ThemeService.switchTheme();
  }
}
