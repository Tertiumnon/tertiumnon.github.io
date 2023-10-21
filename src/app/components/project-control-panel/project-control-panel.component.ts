import { Component, Input, OnInit } from "@angular/core";

import { ProjectStatus } from "../../entities/project/project.interface";
import { ProjectsService } from "../../pages/projects/projects.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { DropdownComponent } from "../dropdown/dropdown.component";

@Component({
  selector: "app-project-control-panel",
  templateUrl: "./project-control-panel.component.html",
  styleUrls: ["./project-control-panel.component.less"],
  standalone: true,
  imports: [CommonModule, FormsModule, DropdownComponent],
})
export class ProjectControlPanelComponent implements OnInit {
  @Input() isStatusFilterVisible = true;
  // status
  status = ProjectStatus.Active.toString();
  statusOptions = Object.values(ProjectStatus);
  // 
  release = "Year (newer)";
  releaseOptions = ["Year (newer)", "Year (older)"];
  releaseMap = {[this.releaseOptions[0]]: "year", [this.releaseOptions[1]]: "-year"};

  constructor(
    private projectService: ProjectsService,
  ) {}

  static getTextWidth(txt: string): number {
    const span = document.createElement("span");
    span.setAttribute("style", "display: hidden;");
    span.innerHTML = txt;
    document.body.appendChild(span);
    const res = span.offsetWidth + 1;
    span.remove();
    return res;
  }

  onStatusChange(status: string): void {
    this.projectService.setState({ filterByStatus: status as ProjectStatus });
  }

  onReleaseChange(release: string): void {
    this.projectService.setState({ sortByAttrVal: this.releaseMap[release] });
  }

  ngOnInit() {
    this.onStatusChange(this.status);
    this.onReleaseChange(this.release);
  }
}
