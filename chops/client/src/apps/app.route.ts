import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppAuthGuard } from '../apps/app.authguard';

import { ComponentHome } from '../components/home/component.home';
import { ComponentSignup } from '../components/signup/component.signup';
import { ComponentWelcome } from '../components/welcome/component.welcome';

const routes: Routes = [
	{
		path: '',
		redirectTo: '/home',
		pathMatch: 'full',
	},
	{
		path: 'home',
		component: ComponentHome,
		canActivate: [AppAuthGuard],
		data: { isConnected: false },
	},
	{
		path: 'signup',
		component: ComponentSignup,
		canActivate: [AppAuthGuard],
		data: { isConnected: false },
	},
	{
		path: 'welcome',
		component: ComponentWelcome,
		canActivate: [AppAuthGuard],
		data: { isConnected: true },
	},
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})

export class AppRoute {}
