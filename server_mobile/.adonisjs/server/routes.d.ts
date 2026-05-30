import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_tokens.store': { paramsTuple?: []; params?: {} }
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'profile.access_tokens.destroy': { paramsTuple?: []; params?: {} }
    'themes.index': { paramsTuple?: []; params?: {} }
    'themes.create': { paramsTuple?: []; params?: {} }
    'themes.store': { paramsTuple?: []; params?: {} }
    'themes.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'themes.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'themes.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'themes.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  GET: {
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'themes.index': { paramsTuple?: []; params?: {} }
    'themes.create': { paramsTuple?: []; params?: {} }
    'themes.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'themes.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  HEAD: {
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'themes.index': { paramsTuple?: []; params?: {} }
    'themes.create': { paramsTuple?: []; params?: {} }
    'themes.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'themes.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  POST: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_tokens.store': { paramsTuple?: []; params?: {} }
    'profile.access_tokens.destroy': { paramsTuple?: []; params?: {} }
    'themes.store': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'themes.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  PATCH: {
    'themes.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'themes.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}