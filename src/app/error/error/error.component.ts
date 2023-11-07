import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog"; // Importing the Angular Material Dialog Data Injection token

@Component({
  selector: 'app-error', // The component's CSS element selector
  templateUrl: './error.component.html', // The location of the template file for this component
  styleUrls: ['./error.component.css'] // The location of the CSS file for this component
})
export class ErrorComponent {
  // Constructor for the component
  // The @Inject decorator is used to inject the dialog data from wherever this dialog is called
  constructor(@Inject(MAT_DIALOG_DATA) public data: {message:string}) {
    // data is now a property of this class, it contains 'message' passed from the parent component
    // which can be accessed in the error.component.html template
  }
}
