import { Component, OnInit } from '@angular/core';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faHackerrank } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less']
})
export class FooterComponent implements OnInit {

  constructor() {
    library.add(faCoffee, faGithub, faHackerrank);
  }

  ngOnInit() {
  }

}
