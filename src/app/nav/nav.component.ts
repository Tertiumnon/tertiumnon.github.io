import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Project } from '../project';

const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Kvartal 2000',
    type: 'web-site',
    description: 'Realty Agency',
    image: '/assets/images/projects/kvartal2000-web/2008_kvartal2000.png',
    link: '',
    year: 2008,
    categories: ['design', 'layout-coding'],
    active: true,
  },
  {
    id: '2',
    title: 'Kvartal 2000',
    type: 'web-site',
    description: 'Realty Agency',
    image: '/assets/images/projects/kvartal2000-web/2009_kvartal2000.png',
    link: '',
    year: 2009,
    categories: ['design', 'layout-coding'],
    active: true,
  },
  {
    id: '1',
    title: 'Locman Kvartir',
    type: 'web-site',
    description: 'Realty Search Engine',
    image: '/assets/images/projects/locman-kvartir-web/2008_locman-kvartir.png',
    link: '',
    year: 2010,
    categories: ['design', 'layout-coding'],
    active: true,
  },
  {
    id: '1',
    title: 'Arsenal SB',
    type: 'web-site',
    description: 'CCTV complany',
    image: '/assets/images/projects/arsenal-sb-web/2011_arsenal-sb.png',
    link: '',
    year: 2011,
    categories: ['design', 'layout-coding'],
    active: true,
  },
  {
    id: '2',
    title: 'Bookmarks Manager',
    type: 'web-extension',
    description: 'Web-extension for Firefox for organizing bookmarks',
    image: '/assets/images/bookmarks-manager-web-ext/bookmarks-manager-web-ext.png',
    link: 'https://addons.mozilla.org/en-US/firefox/addon/bookmarks-manager/',
    year: 2019,
    categories: ['design', 'coding'],
    active: true,
  },
  {
    id: '3',
    title: 'JKH Service',
    type: 'web-site',
    description: 'Web-site for company',
    image: '/assets/images/jkh-service-web/jkh-service-web.png',
    link: '',
    year: 2018,
    categories: ['design'],
    active: false,
  },
  {
    id: '4',
    title: 'OCS Cheatsheets',
    type: 'web-site',
    description: 'Web-extension for Firefox for organizing bookmarks',
    image: '/assets/images/bookmarks-manager-web-ext/bookmarks-manager-web-ext.png',
    link: 'https://addons.mozilla.org/en-US/firefox/addon/bookmarks-manager/',
    year: 2017,
    categories: ['design', 'coding'],
    active: false,
  },
];

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent {

  projects = PROJECTS;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {}
}
