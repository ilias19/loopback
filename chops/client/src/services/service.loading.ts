export class ServiceLoading
{
	private list_message: any = [];
	private list_load: any = [];

	private loadCout: number = 0;
	private loading: boolean = false;
	private defaultMessage: string = 'Chargement...';
	private message: string = this.defaultMessage;

	constructor() { }

	callbackMessage(callback)
	{
		this.list_message.push(callback);
	}

	setMessage(message: string)
	{
		for (var index in this.list_load) {
			this.list_message[index](message);
		}
		this.message = message;
	}

	getMessage()
	{
		return this.message;
	}

	callbackLoad(callback)
	{
		this.list_load.push(callback);
	}

	getLoad()
	{
		return this.loading;
	}

	getThreadLoad()
	{
		return this.loadCout;
	}

	load(callback)
	{
		if (this.loading == false) {
			for (var index in this.list_load) {
				this.list_load[index](true);
			}
		}
		this.loadCout = this.loadCout + 1;
		this.loading = true;
		callback();
	}

	loaded()
	{
		this.loadCout = this.loadCout - 1;
		if (this.loadCout == 0) {
			for (var index in this.list_load) {
				this.list_load[index](false);
			}
			this.setMessage(this.defaultMessage);
			this.loading = false;
		}
	}
}