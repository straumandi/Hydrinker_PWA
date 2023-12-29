import { Component } from '@angular/core';
import {ScoreService} from "../../../services/score/score.service";

@Component({
  selector: 'app-score',
  standalone: true,
  imports: [],
  templateUrl: './score.component.html',
  styleUrl: './score.component.css'
})
export class ScoreComponent {

  constructor(
    private scoreservice: ScoreService,
  ) {}


}

