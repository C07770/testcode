Ext.define('MyApp.store.JUsers', {
	extend : 'Ext.data.Store',
	model : 'MyApp.model.User',
	autoLoad : true,

	proxy : {
		type : 'ajax',
		api : {
			read : './resoures/data.json'
		},
		reader : {
			type : 'json',
			root : 'person'
		}
	}
});