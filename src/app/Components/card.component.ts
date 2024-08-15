import { Component, Input } from '@angular/core';
import { env } from '../../Environment/environment';
import { DecimalPipe, NgIf } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { movie } from '../../Models/iMovies';
@Component({
  selector: 'Card',
  standalone: true,
  imports: [DecimalPipe, NzIconModule, NgIf],
  template: `
    <div class="rounded-2xl overflow-hidden">
      <span
        class="absolute top-2 right-2 px-2 pb-[2px] bg-orange-500 text-white rounded-full font-medium"
      >
        {{ movie.vote_average | number : '1.0-1' }}
        <span nz-icon nzType="star" nzTheme="fill" class="!text-white"></span>
      </span>
      <!-- Placeholder -->
      <div
        *ngIf="isLoading"
        class="w-full h-64 bg-gray-300 animate-pulse"
      ></div>

      <!-- Actual Image -->
      <img
        class="w-full object-cover"
        [src]="getImageUrl(movie.poster_path)"
        alt="{{ movie.original_title }}"
        (load)="onLoad()"
        (error)="onError()"
        [class.hidden]="isLoading"
      />
      <h4
        class=" absolute bottom-2 left-2 mr-2 text-white bg-[#00000070]  px-1"
      >
        {{ movie.original_title }}
      </h4>
    </div>
  `,
  styles: [``],
})
export class CardComponent {
  @Input() movie: movie = {} as movie;
  isLoading: boolean = true;
  getImageUrl(url: string) {
    return env.API_IMAGE_URL + url;
  }
  onLoad() {
    this.isLoading = false;
  }

  onError() {
    this.isLoading = false;
  }
}
