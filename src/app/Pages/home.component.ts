import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { CardComponent } from '../Components/card.component';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'home',
  standalone: true,
  imports: [CardComponent, NzButtonModule, NgFor],
  template: `
    <main>
      <section>
        <div class="container aspect-video bg-gray-200 m-auto">cover</div>
      </section>
    </main>
  `,
  styles: [``],
})
export class HomeComponent {}
