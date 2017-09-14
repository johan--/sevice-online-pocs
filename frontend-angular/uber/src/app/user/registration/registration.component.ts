import {Component, OnInit} from '@angular/core';
import {Constants} from "../../../../constants";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {getErrors} from '../../shared/form-helper';
import {SignUp} from '../../uber-core/model/SignUp';
import {UserRecorder} from '../../uber-core/model/UserRecorder';
import {UserAuthService} from "../../auth/user-auth.service";
import {LocalStorageService} from 'angular-2-local-storage';
import {SignUpRequest} from "../../uber-core/model/SignUpRequest";

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})

export class RegistrationComponent implements OnInit {

  user: UserRecorder;
  failedToChange: string = null;
  failedChecks: Array<string> = [];

  loading = false;

  routing = Constants.routing;

  errors: { [name: string]: Array<string> } = {};

  errorMessages: { [name: string]: any } = {};

  globalError: string = null;

  signUpForm: FormGroup;

  email: string;

  signUpRequest: SignUpRequest;

  failedToSignUp: string = null;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private userAuthService: UserAuthService,
              private localStorageService: LocalStorageService) {
    this.email = localStorageService.get('variable') ? localStorageService.get('variable').toString() : '';
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

  save(model: UserRecorder, isValid: boolean) {
    // call API to save customer
    console.log(model, isValid);
    this.failedToSignUp = null;


    if (isValid) {
      this.loading = true;
      this.signUpRequest = {
        username: model.email,
        email: model.email,
        password: model.password
      };
      this.userAuthService.signUp(this.signUpRequest)
        .subscribe(
          data => {
            this.loading = false;
            this.router.navigate([Constants.routing.userLogin, {data: data, signUp:true}]);
          },
          e => {
            console.log(e);
            if (!e.status) {
              this.failedToSignUp = 'UNKNOWN';
            } else if (e['_body']){
              const body = JSON.parse(e['_body']);
              if( (body['email'])){
                this.failedToSignUp = body['email'][0];
              }else if (body['username']){
                this.failedToSignUp = body['username'][0];
              }else{
                this.failedToSignUp = 'UNKNOWN'
              }

            } else {
              this.failedToSignUp = 'UNKNOWN';
            }
            this.loading = false;
          }
        )

    }
  }

  valueChange(newValue) {
    console.log(newValue);
    this.localStorageService.set('variable', newValue);
    const settings = this.localStorageService.get('variable');
    console.log('saved settings: ', settings);
  }

}
