Ext.define('MyApp.store.XUsers', {
	extend : 'Ext.data.Store',
	model : 'MyApp.model.User',
	autoLoad : true,

	proxy : {
		type : 'ajax',
		api : {
			read : './resoures/data.xml'
		},
		reader : {
			type : 'xml',
			root : 'persons',
			record : 'person'
		}
	}
});