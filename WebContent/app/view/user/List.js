Ext.define('MyApp.view.user.List', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.userlist',
	title : 'All Users',
	store : 'Users',

	initComponent : function() {
		this.columns = [ {
			header : 'ID',
			dataIndex : 'id',
			flex : 1
		}, {
			header : 'First Name',
			dataIndex : 'firstName',
			flex : 1
		}, {
			header : 'Last Name',
			dataIndex : 'lastName',
			flex : 1
		} ];

		this.buttons = [ {
			text : 'LOAD USERS',
			action : 'loadGridData'
		} ];

		this.callParent(arguments);
	}
});