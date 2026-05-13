/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'auth.new_account.store': {
    methods: ["POST"],
    pattern: '/api/v1/auth/signup',
    tokens: [{"old":"/api/v1/auth/signup","type":0,"val":"api","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['auth.new_account.store']['types'],
  },
  'auth.access_tokens.store': {
    methods: ["POST"],
    pattern: '/api/v1/auth/login',
    tokens: [{"old":"/api/v1/auth/login","type":0,"val":"api","end":""},{"old":"/api/v1/auth/login","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/login","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.access_tokens.store']['types'],
  },
  'profile.profile.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/account/profile',
    tokens: [{"old":"/api/v1/account/profile","type":0,"val":"api","end":""},{"old":"/api/v1/account/profile","type":0,"val":"v1","end":""},{"old":"/api/v1/account/profile","type":0,"val":"account","end":""},{"old":"/api/v1/account/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['profile.profile.show']['types'],
  },
  'profile.access_tokens.destroy': {
    methods: ["POST"],
    pattern: '/api/v1/account/logout',
    tokens: [{"old":"/api/v1/account/logout","type":0,"val":"api","end":""},{"old":"/api/v1/account/logout","type":0,"val":"v1","end":""},{"old":"/api/v1/account/logout","type":0,"val":"account","end":""},{"old":"/api/v1/account/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['profile.access_tokens.destroy']['types'],
  },
  'themes.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/themes',
    tokens: [{"old":"/api/v1/themes","type":0,"val":"api","end":""},{"old":"/api/v1/themes","type":0,"val":"v1","end":""},{"old":"/api/v1/themes","type":0,"val":"themes","end":""}],
    types: placeholder as Registry['themes.index']['types'],
  },
  'themes.create': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/themes/create',
    tokens: [{"old":"/api/v1/themes/create","type":0,"val":"api","end":""},{"old":"/api/v1/themes/create","type":0,"val":"v1","end":""},{"old":"/api/v1/themes/create","type":0,"val":"themes","end":""},{"old":"/api/v1/themes/create","type":0,"val":"create","end":""}],
    types: placeholder as Registry['themes.create']['types'],
  },
  'themes.store': {
    methods: ["POST"],
    pattern: '/api/v1/themes',
    tokens: [{"old":"/api/v1/themes","type":0,"val":"api","end":""},{"old":"/api/v1/themes","type":0,"val":"v1","end":""},{"old":"/api/v1/themes","type":0,"val":"themes","end":""}],
    types: placeholder as Registry['themes.store']['types'],
  },
  'themes.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/themes/:id',
    tokens: [{"old":"/api/v1/themes/:id","type":0,"val":"api","end":""},{"old":"/api/v1/themes/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/themes/:id","type":0,"val":"themes","end":""},{"old":"/api/v1/themes/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['themes.show']['types'],
  },
  'themes.edit': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/themes/:id/edit',
    tokens: [{"old":"/api/v1/themes/:id/edit","type":0,"val":"api","end":""},{"old":"/api/v1/themes/:id/edit","type":0,"val":"v1","end":""},{"old":"/api/v1/themes/:id/edit","type":0,"val":"themes","end":""},{"old":"/api/v1/themes/:id/edit","type":1,"val":"id","end":""},{"old":"/api/v1/themes/:id/edit","type":0,"val":"edit","end":""}],
    types: placeholder as Registry['themes.edit']['types'],
  },
  'themes.update': {
    methods: ["PUT","PATCH"],
    pattern: '/api/v1/themes/:id',
    tokens: [{"old":"/api/v1/themes/:id","type":0,"val":"api","end":""},{"old":"/api/v1/themes/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/themes/:id","type":0,"val":"themes","end":""},{"old":"/api/v1/themes/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['themes.update']['types'],
  },
  'themes.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/themes/:id',
    tokens: [{"old":"/api/v1/themes/:id","type":0,"val":"api","end":""},{"old":"/api/v1/themes/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/themes/:id","type":0,"val":"themes","end":""},{"old":"/api/v1/themes/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['themes.destroy']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
