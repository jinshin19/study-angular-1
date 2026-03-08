import { Component } from '@angular/core';
import { RoutesC } from '../../../constants';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  public routes = RoutesC;
}
