import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { UserModel } from '../_models';
import { UserService } from '../_services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    templateUrl: 'profile.component.html',
})

export class ProfileComponent implements OnInit {
    public profileForm: FormGroup;
    public users: UserModel[] = [];
    public loading = false;
    public submitted = false;
    public returnUrl: string;
    public error = '';

    constructor(
        private userService: UserService,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit() {
        this.profileForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        this.userService.getAll().pipe(first()).subscribe(users => {
            this.users = users;
        });
    }
}
