/* Copyright (c) 2026 PRRX Cooperation. All rights reserved. */
import type { PlexoApi } from './index'

declare global {
  interface Window {
    plexo: PlexoApi
    gojos: PlexoApi
  }
}
