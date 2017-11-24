import { Component } from "@angular/core";
import * as io from "socket.io-client";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "app";
  public socket;

  constructor() {
    this.socket = io("http://localhost:3000");
    this.socket.on("greeting-from-server", function(message) {
      document.body.appendChild(document.createTextNode(message.greeting));

      this.emit("greeting-from-client", { greeting: "hello Server" });
    });
  }
}
