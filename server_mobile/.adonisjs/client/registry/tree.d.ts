/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    newAccount: {
      store: typeof routes['auth.new_account.store']
    }
    accessTokens: {
      store: typeof routes['auth.access_tokens.store']
    }
  }
  profile: {
    profile: {
      show: typeof routes['profile.profile.show']
    }
    accessTokens: {
      destroy: typeof routes['profile.access_tokens.destroy']
    }
  }
  themes: {
    index: typeof routes['themes.index']
    create: typeof routes['themes.create']
    store: typeof routes['themes.store']
    show: typeof routes['themes.show']
    edit: typeof routes['themes.edit']
    update: typeof routes['themes.update']
    destroy: typeof routes['themes.destroy']
  }
}
