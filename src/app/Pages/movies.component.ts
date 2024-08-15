import { Component, OnDestroy, OnInit } from '@angular/core';
import { CardComponent } from '../Components/card.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NgFor, NgIf } from '@angular/common';
import { MoviesService } from '../../Services/moviesAPI.service';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { Subscription } from 'rxjs';
import { LoadingComponent } from '../Components/loading.component';
@Component({
  selector: 'movies',
  standalone: true,
  imports: [
    CardComponent,
    NzButtonModule,
    NzPaginationModule,
    NgFor,
    NgIf,
    LoadingComponent,
  ],
  template: `
    <main>
      <Loading *ngIf="isLoading" />
      <section>
        <div class="container flex flex-col m-auto gap-6">
          <h1>Discover Movies</h1>
          <div
            class="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-4"
          >
            <Card
              *ngFor="let movie of movies"
              [movie]="movie"
              class="col-auto relative"
            />
          </div>
          <button
            nz-button
            nzType="primary"
            (click)="loadMore()"
            nzSize="large"
            nzShape="round"
            [disabled]="currentPage === numOfPages"
          >
            Load More
          </button>
          <!-- <div class="flex items-center justify-center">
            <nz-pagination
              [nzPageIndex]="currentPage"
              [nzTotal]="numOfPages"
              (nzPageIndexChange)="changePage($event)"
            ></nz-pagination>
          </div> -->
        </div>
      </section>
    </main>
  `,
  styles: [``],
})
export class MoviesComponent implements OnInit, OnDestroy {
  movies: any[] = [];
  numOfPages?: number;
  currentPage!: number;
  errMessage: string = '';
  isLoading: boolean = false;
  subList: Subscription[] = [];
  constructor(private moviesService: MoviesService) {}

  private fetchMovies(page: number = 1): void {
    this.isLoading = true;
    const sub1 = this.moviesService.getMovies(page).subscribe({
      next: (data) => {
        this.movies = data.results;
        this.numOfPages = data.total_pages >= 500 ? 5000 : data.total_pages;
        this.currentPage = data.page;
        this.isLoading = false;
      },
      error: (error) => {
        this.errMessage = 'Error fetching movies';
        console.error('Error fetching movies', error);
      },
    });
    this.subList.push(sub1);
  }

  ngOnInit(): void {
    this.fetchMovies();
  }

  // changePage(newPageNum: number): void {
  //   this.fetchMovies(newPageNum);
  // }

  loadMore() {
    this.isLoading = true;
    this.moviesService.getMovies(this.currentPage + 1).subscribe({
      next: (data) => {
        this.movies = [...this.movies, ...data.results];
        this.numOfPages = data.total_pages;
        this.currentPage = data.page;
        this.isLoading = false;
      },
      error: (error) => {
        this.errMessage = 'Error fetching movies';
        console.error('Error fetching movies', error);
      },
    });
  }

  ngOnDestroy(): void {
    this.subList.forEach((sub) => sub.unsubscribe());
  }
}
