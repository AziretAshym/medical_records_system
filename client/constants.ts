
const isTestEnvironment = typeof process !== 'undefined' && process.env.NODE_ENV === 'test'

const getImportMetaEnv = (key: string, defaultValue: string) => {
  if (isTestEnvironment) {
    return defaultValue
  }
  try {
    return import.meta.env[key] ?? defaultValue
  } catch {
    return defaultValue
  }
}

export const featureProtection = isTestEnvironment ? true : (getImportMetaEnv('VITE_FEATURE_PROTECTION_DISABLED', '0') !== '1')

export const emailRegex = /^(\w+[-.]?\w+)@(\w+)([.-]?\w+)?(\.[a-zA-Z]{2,3})$/

export const roles = [
  { name: 'admin', title: 'Администратор' },
  { name: 'doctor', title: 'Врач' },
  { name: 'nurse', title: 'Медсестра' },
]