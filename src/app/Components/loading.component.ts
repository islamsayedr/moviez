import { Component } from '@angular/core';

@Component({
  selector: 'Loading',
  standalone: true,
  imports: [],
  template: `
    <div
      class="fixed top-[45px] left-0 z-20 w-[100vw] h-[100vh] flex items-center justify-center bg-[var(--bg24)] backdrop-blur-xl"
    >
      <div class="loader">
        <label class="font-semibold">Loading...</label>
        <div class="loading "></div>
      </div>
    </div>
  `,
  styles: [
    `
      .loader {
        width: 350px;
        height: 180px;
        border-radius: 10px;
        background: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        padding: 30px;
        box-shadow: 2px 2px 10px -5px lightgrey;
      }
      .loading {
        width: 100%;
        height: 10px;
        background: lightgrey;
        border-radius: 10px;
        position: relative;
      }
      .loading::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 50%;
        height: 10px;
        background: var(--secondary);
        border-radius: 10px;
        z-index: 1;
        animation: loading 0.6s alternate infinite;
      }
      label {
        color: #002;
        font-size: 18px;
        animation: bit 0.6s alternate infinite;
      }

      @keyframes bit {
        from {
          opacity: 0.3;
        }
        to {
          opacity: 1;
        }
      }

      @keyframes loading {
        0% {
          left: 25%;
        }
        100% {
          left: 50%;
        }
        0% {
          left: 0%;
        }
      }
    `,
  ],
})
export class LoadingComponent {}
