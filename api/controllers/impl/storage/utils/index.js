var Promise = require("bluebird");

class ReloadORMError extends Error {
  constructor(message) {
    super(message);
    this.name = "ORM reload error";
  }
}

class PermissionException extends Error {
  constructor(message) {
    super(message);
    this.name = "Permission exception: ";
  }
}

module.exports = {
	reloadORM: (sails) => new Promise(( resolve, reject ) => {
		try {
            sails.once("hook:orm:reloaded", () => {
                       // _.forIn(sails.models, (value,key) => {
                       //      // if(util.isObject(value)) value.datastore = undefined;
                       //      console.log(key+" = "+ value.datastore)
                       //  }) 
                      resolve();
            })
            sails.hooks.orm.teardown(()=>{
                sails.hooks.orm.configure()
                // console.log("TEARDOWN drop")
                _.forIn(sails.models, (value,key) => {
                    if(util.isObject(value)) value.datastore = undefined;
                    // console.log(key+" = "+ value.datastore)
                })
                sails.hooks.orm.reload();
            })
        } catch (e) {
            reject(new ReloadORMError(e.toString())) 
        }       
	}),

  access: (client, identity, operation) => new Promise((resolve, reject) => {
      Entities
        .findOne({identity:identity})
        .then( (res) => {
          if(!res) {
            reject(new PermissionException(`Entity '${identity}' is undefined`))
            return
          }
          let owner = res.owner;
          let permissions = res.permissions[operation];
          let roles = [];
          if(client.user.isAdmin) roles.push('administarator')
          if(client.user.isCollaborator) roles.push('collaborator')
          if(client.user.isAuthor) roles.push('author')
          if(client.user.id == owner.user.id) roles.push('owner')
          let app = client.app;
          if(!permissions || (!permissions.role && !permissions.app) ){
            resolve();
            return
          } else if (permissions && permissions.role && !permissions.app){
            if(_.intersection(permissions.role, roles).length > 0){
              resolve()  
            } else { 
              reject(new PermissionException(`${operation} is not available for entity '${identity}' 
(client: ${JSON.stringify(client)})`))
            }
            return
          } else if (permissions && !permissions.role && permissions.app){
            if( permissions.app.indexOf(app) >= 0 ){
              resolve()  
            } else { 
              reject(new PermissionException(`${operation} is not available for entity '${identity}'
(client: ${JSON.stringify(client)})`))
            }
            return
          } else if (permissions && permissions.role && permissions.app){
            if((_.intersection(permissions.role, roles).length > 0) && (permissions.app.indexOf(app) >= 0 )){
              resolve();
            } else {
              reject(new PermissionException(`${operation} is not available for entity '${identity}'
(client: ${JSON.stringify(client)})`))
            }
            return
          }
          reject(new PermissionException(`${operation} is not available for entity '${identity}'
(client: ${JSON.stringify(client)})`))             
        })
        .catch((e) => { reject(new PermissionException(e.toString()))})
  })
}