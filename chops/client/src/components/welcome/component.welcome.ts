import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ServiceLoading } from '../../services/service.loading';

import { ModelUser } from '../../models/model.user';

@Component({
  templateUrl: './component.welcome.html',
})

export class ComponentWelcome
{
	constructor(
		private serviceLoading: ServiceLoading,
		private modelUser: ModelUser,
		private router: Router
	) { }

	signout()
	{
		this.serviceLoading.setMessage('Déconnexion en cours...');
		this.serviceLoading.load(() => {
			this.modelUser.signout().success(() => {
				this.router.navigate(['/home']);
				this.serviceLoading.loaded();
			}).error(() => {
				this.router.navigate(['/home']);
				this.serviceLoading.loaded();
			});
		});
	}
}
