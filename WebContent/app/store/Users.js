Ext.define('MyApp.store.Users', {
	extend : 'Ext.data.Store',
	model : 'MyApp.model.User',
	sorters : [ {
		property : 'id',
		direction : 'ASC'
	} ],
});