import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PrimeNGConfig } from 'primeng/api';
// import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(
    private primengConfig: PrimeNGConfig,
    // private translateService: TranslateService,
  ) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
    // this.translateService.setDefaultLang('en');
  }

  // translate(lang: string) {
  //   this.translateService.use(lang);
  //   this.translateService.get('primeng').subscribe((res) => this.primengConfig.setTranslation(res));
  // }
}
