import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterOutlet} from '@angular/router';
import { BottomNavbarComponent } from './components/bottom-navbar/bottom-navbar.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, BottomNavbarComponent, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Hydrinker PWA!';
}
