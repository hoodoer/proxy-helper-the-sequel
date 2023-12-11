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


    ports = [
        { value: '80', checked: false },
        { value: '443', checked: true },
        ];

    newPort: string = '';

    backups: string[] = [];


    getSelectedPorts(): string[] {
        return this.ports.filter(port => port.checked).map(port => port.value);
    }



    saveFirewallRules(): void {
        this.API.request({
            module: 'ProxyHelper2',
            action: 'backupFirewall',
        }, (response) => {
            this.apiResponse = response;
            console.log("Save firewall got response: " + response);
            console.log("Save firewall error response: " + JSON.stringify(response))
            this.backups.push(response);
        })
    }

    deleteBackup(backup: string): void {
        console.log("Should delete backup: " + backup)
        this.backups = this.backups.filter(i => i !== backup);
    }


    restoreBackup(backup: string): void {
        console.log("Would restore firewall backup: " + backup);
    }



    addNewPort(): void {
        if (this.newPort && !this.ports.some(port => port.value === this.newPort)) {
          this.ports.push({ value: this.newPort, checked: false });
          this.newPort = ''; // Clear the input field after adding a new port
  }
}

routingToggle(): void {
    console.log("Routing toggle changed: " + this.isChecked);

    console.log("About to proxy route: " + this.proxyIpAddress + ': ' + this.proxyPort);

    var activePorts = this.getSelectedPorts()

    console.log("Ports to forward: " + activePorts);

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
