import { NgModule, enableProdMode } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule }  from '@angular/platform-browser';
import { HashLocationStrategy, Location, LocationStrategy } from '@angular/common';
import { CookieService } from 'angular2-cookie/services/cookies.service';

import { AppRoute } from '../apps/app.route';
import { AppAuthGuard } from '../apps/app.authguard';

import { AppComponent } from '../components/app/app.component';
import { ComponentLoading } from '../components/loading/component.loading';
import { ComponentHome } from '../components/home/component.home';
import { ComponentSignup } from '../components/signup/component.signup';
import { ComponentWelcome } from '../components/welcome/component.welcome';

import { ServiceLoading } from '../services/service.loading';
import { ServiceNetwork } from '../services/service.network';
import { ServiceDom } from '../services/service.dom';

import { ModelUser } from '../models/model.user';

// enable production
enableProdMode()

//
@NgModule({
	// Define the services imported by our app
	imports: [
		BrowserModule,
		HttpModule,
		AppRoute,
		FormsModule,
	],

	// Define other components in our module
	declarations: [
		AppComponent,
		ComponentLoading,
		ComponentHome,
		ComponentSignup,
		ComponentWelcome
	],

	// Define providers
	providers: [
		{provide: LocationStrategy, useClass: HashLocationStrategy},
		CookieService,

		AppAuthGuard,
		AppComponent,
	
		ServiceLoading,
		ServiceNetwork,
		ServiceDom,
	
		ModelUser,
	],

	//
	entryComponents: [],

	// Define the root component
	bootstrap: [
		AppComponent,

		ComponentLoading,
	],
})

export class AppModule { }
