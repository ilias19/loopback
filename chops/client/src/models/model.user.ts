import { Injectable } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';

import { environment } from '../environments/environment';

import { ServiceNetwork } from '../services/service.network';

@Injectable()
export class ModelUser
{
	constructor(
		private serviceNetwork: ServiceNetwork,
		private cookie: CookieService
	) { }

	getToken()
	{
		var cookies: any = this.cookie.getObject('user');
		var token = (typeof(cookies) == 'object' && typeof(cookies.token) == 'string' ? cookies.token : '');
		return token;	
	}

	isConnected()
	{
		var cookies: any = this.cookie.getObject('user');
		if (typeof(cookies) == 'object' && typeof(cookies.token) == 'string') {
			return true;
		}
		return false;
	}

	signup(data)
	{
		return this.serviceNetwork
			.post(environment.urlApi+'Accounts', data)
			.success((data) => {
				console.log(data);
				// this.cookie.putObject('user', data.data);
			})
		;
	}

	signin(data)
	{
		return this.serviceNetwork
			.post(environment.urlApi+'Accounts/login', data)
			.success((data) => {
				console.log(data);
				this.cookie.putObject('user', {
					id: data.userId,
					token: data.id,
					expire: data.ttl,
					created: data.created,
				});
			})
		;
	}

	signout()
	{
		return this.serviceNetwork
			.post(environment.urlApi+'Accounts/logout')
			.success((data) => {
				console.log(data)
				this.cookie.remove('user');
			}).error((data) => {
				console.log(data);
				this.cookie.remove('user');
			});
		;
	}
}