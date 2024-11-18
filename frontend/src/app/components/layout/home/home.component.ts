import { Component } from '@angular/core';
import { FormArray, FormsModule } from '@angular/forms';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  //get equipes(): FormArray {
  // return this.formCreate.get('equipes') as FormArray;
  //  }

}
