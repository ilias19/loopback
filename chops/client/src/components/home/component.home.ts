import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ServiceLoading } from '../../services/service.loading';
import { ServiceDom } from '../../services/service.dom';

import { ModelUser } from '../../models/model.user';

@Component({
  templateUrl: './component.home.html',
})

export class ComponentHome
{
	private event: any = {
		load: {
			loading: false,
			message: null,
		},
		error: {
			message: null,
		},
	};

	constructor(
		private serviceLoading: ServiceLoading,
		private modelUser: ModelUser,
		private serviceDom: ServiceDom,
		private router: Router
	) { }

	signin(event)
	{
		this.event.error.message = null;
		this.event.load.message = 'Connexion en cours...';
		this.event.load.loading = true;
		
		//
		var objectSerialized: any = this.serviceDom.getSerializeObject(event);
			
		if (objectSerialized.email == '' || objectSerialized.password == '') {
			this.event.error.message = 'Veuillez remplir tous les champs';
			this.resetLoad();
			return ;
		}

		//
		this.modelUser.signin({
			email: objectSerialized.email,
			password: objectSerialized.password,
		}).success((data) => {
			this.router.navigate(['/welcome']);
			this.resetLoad();
		}).error((data) => {
			this.event.error.message = data.error.message;
			this.resetLoad();
		});
	}

	resetLoad()
	{
		this.event.load.message = null;
		this.event.load.loading = false;
	}
}
