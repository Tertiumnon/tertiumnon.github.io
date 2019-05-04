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
    image: '/assets/images/projects/kvartal2000-web/2008-kvartal2000-web-preview.png',
    link: '',
    year: 2008,
    categories: ['design', 'layout'],
    active: true,
  },
  {
    id: '2',
    title: 'Kvartal 2000',
    type: 'web-site',
    description: 'Realty Agency',
    image: '/assets/images/projects/kvartal2000-web/2009-kvartal2000-web-preview.png',
    link: '',
    year: 2009,
    categories: ['design', 'layout'],
    active: true,
  },
  {
    id: '3',
    title: 'Locman Kvartir',
    type: 'web-site',
    description: 'Realty Search Engine',
    image: '/assets/images/projects/locman-kvartir-web/2008-locman-kvartir-web-preview.png',
    link: '',
    year: 2010,
    categories: ['design', 'layout'],
    active: true,
  },
  {
    id: '4',
    title: 'Arsenal SB',
    type: 'web-site',
    description: 'CCTV sales company',
    image: '/assets/images/projects/arsenal-sb-web/2011-arsenal-sb-web-preview.png',
    link: '',
    year: 2011,
    categories: ['design', 'layout'],
    active: true,
  },
  {
    id: '4',
    title: 'PROvision',
    type: 'web-site',
    description: 'CCTV manufacturing company',
    image: '/assets/images/projects/provision-web/2012-provision-web-preview.png',
    link: '',
    year: 2012,
    categories: ['design', 'layout', 'coding'],
    active: true,
  },
  {
    id: '4',
    title: 'Alert CCTV',
    type: 'web-site',
    description: 'CCTV manufacturing company',
    image: '/assets/images/projects/alert-cctv-web/2012-alert-cctv-web-preview.png',
    link: '',
    year: 2012,
    categories: ['design', 'layout', 'coding'],
    active: true,
  },
  {
    id: '4',
    title: 'Katerinafee',
    type: 'web-site',
    description: 'Fashion designer',
    image: '/assets/images/projects/katerinafee-web/2013-katerinafee-web-preview.png',
    link: '',
    year: 2013,
    categories: ['design', 'layout'],
    active: true,
  },
  {
    id: '4',
    title: 'Enso Photo',
    type: 'web-site',
    description: 'Photographer web-site',
    image: '/assets/images/projects/enso-photo-web/2014-enso-photo-web-preview.png',
    link: '',
    year: 2014,
    categories: ['design', 'layout', 'coding'],
    active: true,
  },
  {
    id: '4',
    title: 'Butterfly Browser',
    type: 'web-browser',
    description: 'Ligthweigth web-browser',
    image: '/assets/images/projects/butterfly-browser-app/2016-butterfly-browser-app-preview.png',
    link: '',
    year: 2016,
    categories: ['design'],
    active: true,
  },
  {
    id: '4',
    title: 'Yandex Browser',
    type: 'web-browser',
    description: 'Web browser',
    image: '/assets/images/projects/yandex-browser-app/2017-yandex-browser-app-preview.png',
    link: '',
    year: 2017,
    categories: ['design'],
    active: true,
  },
  {
    id: '6',
    title: 'JKH Service',
    type: 'web-site',
    description: 'Web-site for company',
    image: '/assets/images/projects/jkh-service-web/jkh-service-web-preview.png',
    link: '',
    year: 2018,
    categories: ['design'],
    active: false,
  },
  {
    id: '7',
    title: 'OCS Cheatsheets',
    type: 'web-site',
    description: 'Web-extension for Firefox for organizing bookmarks',
    image: '/assets/images/projects/bookmarks-manager-web-ext/bookmarks-manager-web-ext-preview.png',
    link: 'https://addons.mozilla.org/en-US/firefox/addon/bookmarks-manager/',
    year: 2017,
    categories: ['design', 'coding'],
    active: false,
  },
  {
    id: '5',
    title: 'Bookmarks Manager',
    type: 'Web-extension',
    description: 'Web-extension for organizing bookmarks',
    image: '/assets/images/projects/bookmarks-manager-web-ext/bookmarks-manager-web-ext-preview.png',
    link: 'https://addons.mozilla.org/en-US/firefox/addon/bookmarks-manager/',
    year: 2019,
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
