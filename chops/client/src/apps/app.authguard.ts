import { Injectable, Inject } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { ModelUser } from '../models/model.user';

@Injectable()
export class AppAuthGuard implements CanActivate
{
	constructor(
		private router: Router,
		private modelUser: ModelUser
	) {}

	canActivate(route: ActivatedRouteSnapshot)
	{
		var verify: Boolean = route.data['isConnected'];

		if ((this.modelUser.isConnected() == true && verify == true) ||
			(this.modelUser.isConnected() == false && verify == false)) {
			return true;
		}
		if (this.modelUser.isConnected() == true) {
			this.router.navigate(['/welcome']);
		}
		if (this.modelUser.isConnected() == false) {
			this.router.navigate(['/home']);
		}
		return false;

	}
}
