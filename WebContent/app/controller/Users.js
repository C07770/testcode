Ext.define("MyApp.controller.Users", {
	extend : 'Ext.app.Controller',

	stores : [ 'Users', 'JUsers', 'XUsers' ],
	models : [ 'User' ],
	views : [ 'user.List' ],

	init : function() {
		this.control({
			'userlist button[action=loadGridData]' : {
				click : this.loadGridData
			}
		});
	},

	loadGridData : function(button) {
		var data = [], jd = this.getJUsersStore().getRange(), xd = this
				.getXUsersStore().getRange();

		for ( var j in jd)
			data.push(jd[j].getData());

		for ( var x in xd)
			data.push(xd[x].getData());

		this.getUsersStore().loadData(data);
	}
});