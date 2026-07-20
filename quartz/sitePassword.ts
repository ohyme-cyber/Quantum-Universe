const defaultSitePasswordHash = "7e1153554d516a65f8b795505a5f102f5b6c21a9063ceaabc7e48b3042e63c67"

export const configuredSitePasswordHash =
  process.env.QUARTZ_SITE_PASSWORD_HASH?.trim() || defaultSitePasswordHash

export const sitePasswordGateEnabled = Boolean(configuredSitePasswordHash)
