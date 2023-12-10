import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
// import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';

@Component({
    selector: 'lib-ProxyHelper2',
    templateUrl: './ProxyHelper2.component.html',
    styleUrls: ['./ProxyHelper2.component.css']
})


export class ProxyHelper2Component implements OnInit {
    constructor(private API: ApiService) { }

    isChecked = false;
    apiResponse = 'Press the button to get response.';
    // ipForm: FormGroup;

    doButtonPress(): void {
        this.API.request({
            module: 'ProxyHelper2',
            action: 'hello_world',
        }, (response) => {
            this.apiResponse = response;
            console.log("PH2 got response from python: " + response);
        })
    }

    routingToggle(): void {
        console.log("Routing toggle changed: " + this.isChecked);

        this.API.request({
            module: 'ProxyHelper2',
            action: 'routingToggle',
            toggleValue: this.isChecked
        }, (response) => {
            this.apiResponse = response;
            console.log("Toggle: " + response);
        })
    }





    ngOnInit() {
    }


}
