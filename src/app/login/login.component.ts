import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService) {}
  invalidLogin = false;
  ngOnInit() {}

  login(form) {
    let credentials = form.value;
    this.authService
      .login(credentials)
      .then(() => {
        this.invalidLogin = false;
      })
      .catch(() => {
        this.invalidLogin = true;
      });
  }
}
