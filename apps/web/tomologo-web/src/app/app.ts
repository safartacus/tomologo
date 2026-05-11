import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopbarAtom } from './ui/atoms/topbar/topbar.atom';
import { HeaderOrganism } from './ui/organisms/header/header.organism';
import { FooterOrganism } from './ui/organisms/footer/footer.organism';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TopbarAtom, HeaderOrganism, FooterOrganism],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly year = new Date().getFullYear();
}
