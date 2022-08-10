import { Component, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Profil } from '../service/Profil';
import { ProfilService } from '../service/profil.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    public registerForm = new FormGroup({
        email: new FormControl('', [Validators.required]),
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
    });

    constructor(
        private router: Router,
        private ngZone: NgZone,
        private profilService: ProfilService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void { }

    onSubmit(): any {
        this.profilService.AddProfil(this.registerForm.value as Profil)
            .subscribe(() => {
                console.log('Data added successfully!');
                console.log(this.registerForm);
                this.registerForm.reset();
            }, (err) => {
                console.log(err);
            });
        this.router.navigate(['login']);
    }
}
