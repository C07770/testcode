Ext.define('MyApp.view.Main', {
	extend : 'Ext.container.Viewport',
	layout : 'fit',

	requires : [ 'MyApp.view.user.List' ],

	initComponent : function() {
		this.items = {
			items : [ {
				xtype : 'container',
				html : '<div>Coding Exercises!</div>',
				style : {
					padding : '10px',
					font : '1.2em',
					weight : 'bold'
				}
			}, {
				xtype : 'userlist'
			} ]
		};

		this.callParent();
	}
});