import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-other',
  templateUrl: './other.component.html',
  styleUrls: ['./other.component.scss'],
})
export class OtherComponent implements OnInit {
  color = 'red';
  text = 'ROMA';

  constructor() {}

  ngOnInit(): void {}
}
