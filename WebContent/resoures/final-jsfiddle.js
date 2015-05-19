//<link rel="stylesheet" type="text/css" href="http://cdn.sencha.com/ext/gpl/4.2.0/resources/css/ext-all-neptune.css"/>

//******* SIMULATION ********//

var simJSON, simXML;

simJSON = '{"person":[{"id":10,"firstName":"John","lastName":"Doe"},{"id":5,"firstName":"Jack","lastName":"Doe"},{"id":7,"firstName":"James","lastName":"Doe"}]}';

simXML = '<persons><person><id>3</id><firstName>Jen</firstName><lastName>Doe</lastName></person> <person><id>6</id><firstName>Stephanie</firstName><lastName>Joe</lastName></person> <person><id>1</id><firstName>Victoria</firstName><lastName>Doe</lastName></person></persons>';

var simulation = function (proxy, dataType, data, delay) {
    proxy.url = '/echo/'+ dataType +'/';
    proxy.actionMethods.read = "POST";
    proxy.extraParams[dataType] = data;
    proxy.extraParams.delay = typeof delay == 'undefined' ? 0 : delay;
};

//********* MODEL **********//

Ext.define('MyApp.model.User', {
	extend : 'Ext.data.Model',
	fields : [ 'id', 'firstName', 'lastName' ]
});

//********* STORE *********//

Ext.define('MyApp.store.Users', {
	extend : 'Ext.data.Store',
	model : 'MyApp.model.User',
	sorters : [ {
		property : 'id',
		direction : 'ASC'
	} ]
});

Ext.define('MyApp.store.JUsers', {
	extend : 'Ext.data.Store',
	model : 'MyApp.model.User',
    autoLoad : true,
    
	proxy : {
		type : 'ajax',
		url : '',
		reader : {
			type : 'json',
			root : 'person'
		}
	},   
    listeners: {
        beforeload: function( store, operation, eOpts ) { 
            simulation(store.proxy, 'json', simJSON, 5);
        }
    }
});

Ext.define('MyApp.store.XUsers', {
	extend : 'Ext.data.Store',
	model : 'MyApp.model.User',
    autoLoad : true,
    
	proxy : {
		type : 'ajax',
		url : '',
		reader : {
			type : 'xml',
			root : 'persons',
			record : 'person'
		}
	},   
    listeners: {
        beforeload: function( store, operation, eOpts ) {
            simulation(store.proxy, 'xml', simXML, 10);            
        }
    }
});

//********* VIEW **********//

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
        
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            items: ['->',{
                xtype: 'displayfield',
                value: 'Ready',
                listeners : {
                    render :function(me) {  
                        Ext.TaskManager.start({
                            run : function() {
                            me.setValue(Ext.Date.format(new Date(),'H:i:s'));
                            },
                            interval : 1000,
                            scope : me
                        });
                    }
                }            
            }]
        }];
        
		this.callParent(arguments);
	}
});

Ext.define('MyApp.view.Main', {
	extend : 'Ext.container.Viewport',
	layout : 'fit',

	requires : [ 'MyApp.view.user.List' ],

	initComponent : function() {
		this.items = {
			items : [ {
				xtype : 'displayfield',
                margin: '5 0 5 5',
                listeners : {
                    render :function(me) {  
                        var i = 10;
                        Ext.TaskManager.start({
                            run : function() {
                                me.setValue("Wait for... "+ i-- +" seconds.");
                                if(i === 0 ) me.setValue("&#9786;")
                            },
                            interval : 1000,
                            repeat: 10,
                            scope : me
                        });
                    }
                } 
			}, {
				xtype : 'userlist'
			} ]
		};

		this.callParent();
	}
});

//****** CONTROLLER *******//

Ext.define("MyApp.controller.Users", {
	extend : 'Ext.app.Controller',

	stores : [ 'Users', 'JUsers', 'XUsers' ],
	models : [ 'User' ],
	views : [ 'user.List' ],

    init: function() {
        var me = this;
        
        me.getXUsersStore().on({
            scope: me,
            load : me.onXJStoreLoad
        });
        
        me.getJUsersStore().on({
            scope: me,
            load : me.onXJStoreLoad
        });
    },
    
    onXJStoreLoad : function(store, records, successful, eOpts) { 
        this.getUsersStore().loadData(records, true); 
    }
});

//****** APPLICATION ******//

Ext.application({
    name:'MyApp',
    autoCreateViewport:false,

    models:['User'],
    stores:['Users', 'JUsers', 'XUsers'],
    controllers:['Users'],

    launch:function () {
        this.viewport = Ext.create('MyApp.view.Main', {
            application:this
        });
    }
});
