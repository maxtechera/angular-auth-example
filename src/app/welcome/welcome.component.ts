import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.css"]
})
export class WelcomeComponent implements OnInit {
  constructor(private auth: AuthService) {}
  isUserAuthenticated() {
    return this.auth.isAuthorized();
  }

  ngOnInit() {}
}
