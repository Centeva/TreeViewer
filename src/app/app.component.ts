import { Component } from '@angular/core';
import * as domtoimage from 'dom-to-image';
import * as fs from 'file-saver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor() {
    setTimeout(() => {
    const node = document.getElementsByClassName('viewer')[0];

    domtoimage.toBlob(node).then(function (blob) {
        fs.saveAs(blob, 'my-node.png');
    });
  }, 10000);
  }
}
