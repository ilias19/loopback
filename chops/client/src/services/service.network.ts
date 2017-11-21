import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { CookieService } from 'angular2-cookie/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ServiceNetwork
{
	constructor(
		private http: Http,
		private router: Router,
		private cookie: CookieService
	) { }

	serializeUrl(url: string)
	{
		var cookies: any = this.cookie.getObject('user');
		return (typeof(cookies) == 'object' ? url + (url.indexOf('?') == -1 ? '?' : '&') + 'access_token=' + cookies.token : url);
	}

	header(params: any = {}, data: any = {})
	{
		var paramsHeader: any = {};

		//
		var cookies: any = this.cookie.getObject('user');
		var token = (typeof(cookies) == 'object' && typeof(cookies.token) == 'string' ? 'bearer ' + cookies.token : '');
		token = (typeof(params.token) == 'string' ? 'bearer ' + params.token : token);
		token = (typeof(params.token) != 'undefined' && params.token == null ? null : token);

		//
		if (token != null) {
			paramsHeader['Authorization'] = token;
		}

		//
		var headers: Headers = new Headers(paramsHeader);
		var options: RequestOptions = new RequestOptions({
			headers: headers,
			body: data,
		});

		return options;
	}

	request(http)
	{
		var request: any = {
			list_callback: [],
			status: false,
			data: null,
		};
		http
			.map((res: Response) => res.json())
			.catch((retError: Response | any) => {
				var data: any = {
					status: 500,
					message: 'Internal Server Error',
				};
				
				if (retError instanceof Response) {
					data = retError.json() || {
						status: 500,
						message: 'Internal Server Error',
					};
				}

				if (data.error == undefined) {
					data = {
						error: {
							message: 'Internal Server Error', // server maybe is offline ?
						},
						data: data,	
					};
				}

				request.data = data;
				request.status = 'error';
				for (var index in request.list_callback) {
					if (request.list_callback[index].type == request.status) {
						request.list_callback[index].callback(data);
					}
				}	

				return Observable.throw(data);
			})
			.subscribe(
				data  => {
					request.data = data;
					request.status = 'success';
					for (var index in request.list_callback) {
						if (request.list_callback[index].type == request.status) {
							request.list_callback[index].callback(data);
						}
					}
				}
			)
		;
		var toReturn: any = {
			success: function(func)
			{
				if (typeof(func) == 'function') {
					if (request.status == false) {
						request.list_callback.push({
							type: 'success',
							callback: func,
						});
						return toReturn;
					} else if (request.status == 'success') {
						func(request.data);
					}
				}
				return toReturn;
			},
			error: function(func)
			{
				if (typeof(func) == 'function') {
					if (request.status == false) {
						request.list_callback.push({
							type: 'error',
							callback: func,
						});
						return toReturn;
					} else if (request.status == 'error') {
						func(request.data);
					}
				}
				return toReturn;
			},
		};
		return toReturn;
	}

	delete(url: string, params: any = {})
	{
		return this.request(this.http.delete(this.serializeUrl(url), this.header(params)));	
	}

	post(url: string, data: any = {}, params: any = {})
	{
		return this.request(this.http.post(this.serializeUrl(url), data, this.header(params, data)));	
	}

	put(url: string, data: any = {}, params: any = {})
	{
		return this.request(this.http.put(this.serializeUrl(url), data, this.header(params, data)));
	}

	get(url: string, params: any = {})
	{
		return this.request(this.http.get(this.serializeUrl(url), this.header(params)));
	}
}
