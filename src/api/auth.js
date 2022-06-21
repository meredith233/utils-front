import { post } from '@/utils/request'

export const loginById = (data = {}) => {
  return post('auth/doLogin', data)
}
