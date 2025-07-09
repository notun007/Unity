import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRolesComponent } from './user-roles/user-roles.component';
import { UserComponent } from './user/user.component';
import { ModuleComponent } from './module/module.component';
import { MenuComponent } from './menu/menu.component';
import { MenuPermissionComponent } from './menu-permission/menu-permission.component';
import { UserwiseMenuComponent } from './userwise-menu/userwise-menu.component';

import { UserRolesMappingComponent } from './user-roles-mapping/user-roles-mapping.component';

const routes: Routes = [

  { path: 'roles', component: UserRolesComponent },
  { path: 'addUser', component: UserComponent },
  { path: 'addUser/:id', component: UserComponent },
  { path: "appmodules", component: ModuleComponent },
  { path: "menu", component: MenuComponent },
  { path: "menupermission", component: MenuPermissionComponent },
  { path: "userbaseMenu", component: UserwiseMenuComponent },
  { path: "userrolesmapping", component: UserRolesMappingComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
