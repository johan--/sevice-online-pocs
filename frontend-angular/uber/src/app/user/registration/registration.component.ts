import {Component, OnInit} from '@angular/core';
import {Constants} from "../../../../constants";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors} from "@angular/forms";
import {getErrors} from '../../shared/form-helper';
import {SignUp} from '../../uber-core/model/SignUp';
import {EqualValidator} from "../../shared/directives/equal-validator.directive";
import {User} from '../../uber-core/model/user';
import {UserAuthService} from "../../auth/user-auth.service";

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})

/*export class PasswordValidation {

  static MatchPassword(AC: AbstractControl) {
    let password = AC.get('password').value; // to get value in input tag
    let confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
    if(password != confirmPassword) {
      console.log('false');
      AC.get('confirmPassword').setErrors( {MatchPassword: true} )
    } else {
      console.log('true');
      return null
    }
  }
}*/

export class RegistrationComponent implements OnInit {
  model = {
    email: '',
    password: '',
    confirmPassword: ''
  };

  failedToChange: string = null;
  failedChecks: Array<string> = [];

  loading = false;

  routing = Constants.routing;

  errors: { [name: string]: Array<string> } = {};

  errorMessages: { [name: string]: any } = {};

  globalError: string = null;

  signUpForm: FormGroup;



  public user: User;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private userAuthService: UserAuthService) {
  }

  ngOnInit() {
    this.user = {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
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

}
