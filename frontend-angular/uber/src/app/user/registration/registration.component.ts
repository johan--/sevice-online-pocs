import {Component, OnInit} from '@angular/core';
import {Constants} from "../../../../constants";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {getErrors} from '../../shared/form-helper';
import {SignUp} from '../../uber-core/model/SignUp';
import {User} from '../../uber-core/model/user';
import {UserAuthService} from "../../auth/user-auth.service";
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})

export class RegistrationComponent implements OnInit {

  user: User;
  failedToChange: string = null;
  failedChecks: Array<string> = [];

  loading = false;

  routing = Constants.routing;

  errors: { [name: string]: Array<string> } = {};

  errorMessages: { [name: string]: any } = {};

  globalError: string = null;

  signUpForm: FormGroup;

  email: string;




  constructor(private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private userAuthService: UserAuthService,
              private localStorageService: LocalStorageService) {
    this.email = localStorageService.get('variable').toString();
    console.log('saved settings: ', this.email);
  }

  ngOnInit() {
    this.user = {
      email: this.email,
      password: '',
      confirmPassword: ''
    };

  }

  createForm() {
    this.signUpForm = this.fb.group({

      email: ['',
        [
          Validators.required,
          Validators.email
        ]
      ],
      password: ['',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
        ]
      ],
      confirmPassword: ['',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/)
        ]
      ]
    });


    this.errorMessages = {
      email: {
        required: 'The E-Mail address is required',
        email: 'The current E-Mail is not valid'
      },
      password: {
        required: 'A Password is required',
        pattern: 'Password should be at least 8 characters long\n' +
        '                    and should contain one number,one character and one special\n' +
        '                    character'
      },
      confirmPassword: {
        required: 'A Password is required',
        pattern: 'Password should be at least 8 characters long\n' +
        '                    and should contain one number,one character and one special\n' +
        '                    character'
      },

    };

    this.signUpForm.patchValue(new SignUp());

    this.signUpForm.valueChanges.subscribe(() => {
      this.errors = getErrors(this.signUpForm, this.errorMessages);
    });

  }

  save(model: User, isValid: boolean) {
    // call API to save customer
    console.log(model, isValid);

    if(isValid){
      this.loading = true;
      this.userAuthService.signUp(model.email, model.password)
        .subscribe(

          data => {
            this.loading = false;
            console.log('Registration successful data', data)
            this.router.navigate([Constants.routing.userLogin]);
          },
          error => {
            console.log('Registration failed', error);
            this.loading = false;
          }
        )

    }
  }

  valuechange(newValue) {
    console.log(newValue)
    this.localStorageService.set('variable', newValue);
    const settings = this.localStorageService.get('variable');
    console.log('saved settings: ', settings);
  }

}
