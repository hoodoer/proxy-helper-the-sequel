import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MatListModule } from '@angular/material/list';
import { MatSelectionList } from '@angular/material/list';
// import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';

@Component({
    selector: 'lib-ProxyHelper2',
    templateUrl: './ProxyHelper2.component.html',
    styleUrls: ['./ProxyHelper2.component.css'],
    encapsulation: ViewEncapsulation.None
})


export class ProxyHelper2Component implements OnInit {
    constructor(private API: ApiService) { }
    @ViewChild('portForwardList') portForwardList: MatSelectionList;

    isChecked      = false;
    apiResponse    = 'Press the button to get response.';
    proxyIpAddress = '';
    proxyPort      = '';

    selectedPorts: string[] = ['80', '443'];

    ports = [
        { value: '80', checked: false },
        { value: '443', checked: true },
        ];


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

        console.log("About to proxy route: " + this.proxyIpAddress + ': ' + this.proxyPort);

        this.API.request({
            module: 'ProxyHelper2',
            action: 'routingToggle',
            toggleValue: this.isChecked
        }, (response) => {
            this.apiResponse = response;
            console.log("Toggle: " + response);
        })
    }


    getSelectedPorts(): string[] {
        return this.ports.filter(port => port.checked).map(port => port.value);
    }


    ngOnInit() {
    }


}
