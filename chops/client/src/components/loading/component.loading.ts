import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ServiceLoading } from '../../services/service.loading';

import { AppComponent } from '../../components/app/app.component';

@Component({
	selector: 'loading',
	templateUrl: './component.loading.html',
})

export class ComponentLoading implements OnInit
{
	private loading: boolean = false;
	private message: string = '';

	constructor(private serviceLoading: ServiceLoading) { }

	ngOnInit()
	{
		this.loading = this.serviceLoading.getLoad();
		this.message = this.serviceLoading.getMessage();
		this.serviceLoading.callbackLoad((status) => {
			this.loading = status;
		});
		this.serviceLoading.callbackMessage((message) => {
			this.message = message;
		});
	}
}
