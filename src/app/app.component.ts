import { Component } from "@angular/core";
import * as io from "socket.io-client";
import * as $ from "jquery";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "app";
  public socket;

  constructor() {
    this.socket = io("http://localhost:3000", {
      'reconnection': true,
      'reconnectionDelay': 500,
      'reconnectionAttempts': 5
  });



    this.socket.on('reconnect', function (number) {
      console.info('After attempting ' + number + ' times, we finally reconnected!');
  });

  this.socket.on('reconnect_attempt', function (number) {
      console.info('Reconnect attempt number ' + number);
  });

  this.socket.on('connect_error', function () {
      console.warn('Error connecting to Socket.IO');
  });

  this.socket.on('reconnect_failed', function () {
      console.error('We failed to reconnect to Socket.IO. We give up.');
  });


    this.socket.on("greeting-from-server", function(message) {
      document.body.appendChild(document.createTextNode(message.greeting));

      this.emit("greeting-from-client", { greeting: "hello Server" });
    });
    this.socket.on("comments.count", function(data) {
      $('#comments-count').text(data.count);
    });
    this.socket.on('comment.add', function (data) {
      var $row = $('<tr>' +
          '<td>' + data.user + '</td>' +
          '<td>' + data.comment + '</td>' +
      '</tr>');
      $('#recent-comments').append($row);
  });

  this.socket.on('seconds.update', function (data) {
    var time = new Date(data.time);
    $('h1').text(
        time.getMonth() + '\/' + time.getDate() + '\/' + time.getFullYear() + ' ' +
        time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds());
});


this.socket.on('users.count', function (number) {
  document.getElementById('users-count').innerHTML = number;
});
  
  }
}
