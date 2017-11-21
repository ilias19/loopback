export class ServiceDom
{
	constructor() { }

	getSerializeObject(event: any)
	{
		var objectSerialized = {};
		for (var i = 0; event.target[i] != undefined; i++) {
			if (event.target[i].name == '') {
				continue ;
			}
			objectSerialized[event.target[i].name] = event.target[i].value;
		}
		return objectSerialized;
	}
}
