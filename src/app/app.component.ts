import { ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  MatCardContent,
  MatCardModule,
  MatCardTitle,
} from '@angular/material/card';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import {
  MatStepper,
  MatStepperModule,
  StepperOrientation,
} from '@angular/material/stepper';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { map, Observable } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AsyncPipe, CommonModule } from '@angular/common';
import {
  MatRadioButton,
  MatRadioGroup,
  MatRadioModule,
} from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

interface Question {
  label: string;
  options: { value: string; label: string; correct: boolean }[];
  controlName: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    AsyncPipe,
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatCardTitle,
    MatDividerModule,
    MatCardContent,
    MatStepperModule,
    FormsModule,
    MatFormFieldModule,
    MatLabel,
    MatInputModule,
    MatButtonModule,
    MatRadioButton,
    MatRadioGroup,
    MatRadioModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild(MatStepper) stepper!: MatStepper;
  stepperOrientation: Observable<StepperOrientation>;
  formGroups: { [key: string]: FormGroup } = {};
  questions: Question[] = [
    {
      label: 'Who was the king of the Greek gods?',
      options: [
        { value: 'option1', label: 'Apollo', correct: false },
        { value: 'option2', label: 'Zeus', correct: true },
        { value: 'option3', label: 'Hades', correct: false },
      ],
      controlName: 'firstCtrl',
    },
    {
      label: 'What was the primary gathering place in ancient Greek cities?',
      options: [
        { value: 'option1', label: 'Agora', correct: true },
        { value: 'option2', label: 'Colosseum', correct: false },
        { value: 'option3', label: 'Forum', correct: false },
      ],
      controlName: 'secondCtrl',
    },
    {
      label: 'Who was the author of the Iliad and the Odyssey?',
      options: [
        { value: 'option1', label: 'Sophocles', correct: false },
        { value: 'option2', label: 'Homer', correct: true },
        { value: 'option3', label: 'Euripides', correct: false },
      ],
      controlName: 'thirdCtrl',
    },
    {
      label:
        'What was the name of the battle where 300 Spartans fought against the Persian army?',
      options: [
        { value: 'option1', label: 'Battle of Marathon', correct: false },
        { value: 'option2', label: 'Battle of Thermopylae', correct: true },
        { value: 'option3', label: 'Battle of Salamis', correct: false },
      ],
      controlName: 'fourthCtrl',
    },
    {
      label: 'Who was the philosopher that taught Alexander the Great?',
      options: [
        { value: 'option1', label: 'Plato', correct: false },
        { value: 'option2', label: 'Socrates', correct: false },
        { value: 'option3', label: 'Aristotle', correct: true },
      ],
      controlName: 'fifthCtrl',
    },
  ];
  submitted: boolean = false;
  correctAnswers: number = 0;

  constructor(
    private fb: FormBuilder,
    private breakpointObserver: BreakpointObserver
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 950px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit(): void {
    this.questions.forEach((question) => {
      this.formGroups[question.controlName] = this.fb.group({
        answer: ['', Validators.required],
      });
    });
  }

  submitAnswers() {
    this.submitted = true;

    this.questions.forEach((question) => {
      const correctOption = question.options.find((option) => option.correct);
      const userAnswer = this.formGroups[question.controlName].value.answer;

      if (correctOption?.value === userAnswer) {
        this.correctAnswers++;
      }
    });
  }

  restart() {
    this.submitted = false;
    this.correctAnswers = 0;
    this.stepper.reset();

    Object.keys(this.formGroups).forEach((key) => {
      this.formGroups[key].reset();
    });
  }
}
