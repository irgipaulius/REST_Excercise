export interface User {
  data: {
    id: number
    email: string
    first_name: string
    last_name: string
    avatar: string
    [x: string]: any
  }
}
export interface Page {
  page: number
  per_page: number
  total: number
  total_pages: number
  data: Array<User['data']>
}
