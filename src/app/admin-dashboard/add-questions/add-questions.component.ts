import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuizService } from '../../service/quiz.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.scss']
})
export class AddQuestionsComponent implements OnInit {

  addQuestionForm: FormGroup;

  constructor(private fb: FormBuilder, private quizService: QuizService, private activatedRouter: ActivatedRoute, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.addQuestionForm = this.fb.group({
      questions: this.fb.array([])
    });

    this.fetchExistingQuestions();
  }

  fetchExistingQuestions() {
    const id = this.activatedRouter.snapshot.paramMap.get('id');
    this.quizService.fetchQuestionsByQuizId(id).subscribe((res: any) => {
      if (res.statusCode === 200) {
        res.data = res.data.map((que, index) => {
          const question: FormGroup = this.createQuestionWithoutOption();
          const questionControl = this.addQuestionForm.get('questions') as FormArray;
          questionControl.push(question);

          que.options = que.options.map((o) => {
            const option: FormGroup = this.createOption();
            // if (!que.multiselect) {
            //   option.patchValue({ isCorrect: o.isCorrect });
            //   delete o.isCorrect;
            // }
            (question.get('options') as FormArray).push(option);
            return o;
          });
          return que;
        });
        this.addQuestionForm.patchValue({ questions: res.data });

        // MANUALLY SET VALUES FOR RADIO BUTTONS
        // res.data.forEach((que: any, qIndex) => {
        //   que.options.forEach((op: any, oIndex) => {
        //     if (!que.multiselect) {
        //       console.log('how many', op.isCorrect);
        //       const questions = this.addQuestionForm.get('questions')['controls'];
        //       const options = questions[qIndex]['controls']['options']['controls'];
        //       const option = options[oIndex];
        //       option.patchValue({ isCorrect: true });
        //     }
        //   });
        // });

      } else {
        const questionControl = this.addQuestionForm.get('questions') as FormArray;
        questionControl.push(this.createQuestion());
      }
    });
  }

  createQuestion() {
    return this.fb.group({
      title: ['', Validators.required],
      multiselect: false,
      options: this.fb.array([this.createOption()])
    });
  }

  createQuestionWithoutOption() {
    return this.fb.group({
      title: ['', Validators.required],
      multiselect: false,
      options: this.fb.array([])
    });
  }

  createOption() {
    return this.fb.group({
      name: ['', Validators.required],
      isCorrect: false
    });
  }

  get questions() {
    return this.addQuestionForm.get('questions')['controls'] as FormArray;
  }

  get canDeleteQue() {
    const questions = this.addQuestionForm.get('questions')['controls'] as FormArray;
    return questions.length == 1
  }

  getOptions(i) {
    const questions = this.addQuestionForm.get('questions')['controls'][i];
    const options = questions['controls']['options']['controls']
    return options;
  }

  getMultiselect(i) {
    const questions = this.addQuestionForm.get('questions') as FormArray;
    return questions.controls[i]['controls']['multiselect'].value;
  }

  onAddQuestion() {
    const control = this.addQuestionForm.get('questions') as FormArray;
    control.push(this.createQuestion());
  }

  onRemoveQuestion(i) {
    const control = this.addQuestionForm.get('questions') as FormArray;
    control.removeAt(i);
  }

  onAddOptions(i) {
    const optionControl = this.addQuestionForm.get('questions')['controls'][i]['controls']['options'] as FormArray;
    optionControl.push(this.createOption());
  }

  onDeleteOptions(i, j) {
    const optionControl = this.addQuestionForm.get('questions')['controls'][i]['controls']['options'] as FormArray;
    optionControl.removeAt(j);
  }

  onRadioClick(questionIndex, optionIndex) {
    const questions = this.addQuestionForm.get('questions')['controls'];
    const options = questions[questionIndex]['controls']['options']['controls'];
    const option = options[optionIndex];
    options.forEach((option) => {
      option.patchValue({ isCorrect: false });
    });
    option.patchValue({ isCorrect: true });
  }

  onSubmit() {
    console.log(this.addQuestionForm.getRawValue());
    const id = this.activatedRouter.snapshot.paramMap.get('id');
    const data = this.addQuestionForm.getRawValue();

    this.quizService.addQuestions(id, data).subscribe((res: any) => {
      if (res.statusCode === 400) {
        this.snackBar.open(res.message, 'Ok', { duration: 5000 });
      } else {
        this.router.navigate(['/admin-dashboard/quizzes']);
        this.snackBar.open(res.message, 'Ok', { duration: 5000 });
      }
    });
  }

}
