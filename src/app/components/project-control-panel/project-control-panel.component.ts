import { Component, Input, OnInit } from '@angular/core';

import { Select } from '../select/select';
import { ProjectStatus } from '../../entities/project/project.interface';
import { ProjectsService } from '../../pages/projects/projects.service';

@Component({
  selector: 'app-project-control-panel',
  templateUrl: './project-control-panel.component.html',
  styleUrls: ['./project-control-panel.component.less'],
})
export class ProjectControlPanelComponent implements OnInit {
  @Input() isStatusFilterVisible = true;
  filterStatuses: Select[] = [
    { value: ProjectStatus.Active, viewValue: 'Active' },
    { value: ProjectStatus.Inactive, viewValue: 'Inactive' },
  ];
  filterByStatus: ProjectStatus = ProjectStatus.Active;
  filterByStatusWidth = 0;

  filterTypes: Select[] = [
    { value: 'all', viewValue: 'All' },
    { value: 'design', viewValue: 'Design' },
    { value: 'coding', viewValue: 'Coding' },
    { value: 'layout', viewValue: 'Layout' },
  ];
  filterByWorkType = '';
  filterByWorkTypeWidth = 0;

  sortAttrs: Select[] = [
    { value: 'year', viewValue: 'Year (newer)' },
    { value: '-year', viewValue: 'Year (older)' },
  ];
  sortByAttrVal = '';
  sortByAttrWidth = 0;

  constructor(
    private projectService: ProjectsService,
    private ProjectsService: ProjectsService
  ) {}

  static getTextWidth(txt: string): number {
    const span = document.createElement('span');
    span.setAttribute('style', 'display: hidden;');
    span.innerHTML = txt;
    document.body.appendChild(span);
    const res = span.offsetWidth + 1;
    span.remove();
    return res;
  }

  getFilterByStatusWidth(): number {
    return ProjectControlPanelComponent.getTextWidth(
      this.filterStatuses.filter(
        (item) => item.value === this.filterByStatus
      )[0].viewValue
    );
  }

  getFilterByWorkTypeWidth(): number {
    return ProjectControlPanelComponent.getTextWidth(
      this.filterTypes.filter((item) => item.value === this.filterByWorkType)[0]
        .viewValue
    );
  }

  getSortByAttrWidth(): number {
    return ProjectControlPanelComponent.getTextWidth(
      this.sortAttrs.filter((item) => item.value === this.sortByAttrVal)[0]
        .viewValue
    );
  }

  onStatusChange(): void {
    const { filterByStatus } = this;
    this.filterByStatusWidth = this.getFilterByStatusWidth();
    this.projectService.setState({ filterByStatus });
    this.ProjectsService.setState({ filterByStatus });
  }

  onTypeChange(): void {
    const { filterByWorkType } = this;
    this.filterByWorkTypeWidth = this.getFilterByWorkTypeWidth();
    this.projectService.setState({ filterByWorkType });
    this.ProjectsService.setState({ filterByWorkType });
  }

  onAttrChange(): void {
    const { sortByAttrVal } = this;
    this.sortByAttrWidth = this.getSortByAttrWidth();
    this.projectService.setState({ sortByAttrVal });
    this.ProjectsService.setState({ sortByAttrVal });
  }

  ngOnInit() {
    this.filterByStatus = ProjectStatus.Active;
    this.filterByStatusWidth = this.getFilterByStatusWidth();
    this.filterByWorkType = 'all';
    this.filterByWorkTypeWidth = this.getFilterByWorkTypeWidth();
    this.sortByAttrVal = 'year';
    this.sortByAttrWidth = this.getSortByAttrWidth();
    this.projectService.setState({
      filterByStatus: this.filterByStatus,
      filterByWorkType: this.filterByWorkType,
      sortByAttrVal: this.sortByAttrVal,
    });
    this.ProjectsService.setState({
      filterByStatus: this.filterByStatus,
      filterByWorkType: this.filterByWorkType,
      sortByAttrVal: this.sortByAttrVal,
    });
  }
}
